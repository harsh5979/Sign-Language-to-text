import React, { useEffect, useRef, useState } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';

const Translator = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [output, setOutput] = useState('Waiting for gesture...');
  const [stream, setStream] = useState(null);
  const [capturedGesture, setCapturedGesture] = useState(''); // For captured gesture

  // Load the handpose model
  useEffect(() => {
    const loadModel = async () => {
      const handposeModel = await handpose.load();
      setModel(handposeModel);
      console.log('Handpose model loaded.');
    };

    loadModel();
  }, []);

  // Set up the webcam and hand detection
  useEffect(() => {
    const setupCamera = async () => {
      const video = videoRef.current;
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
          video.play();
          detectHands();
        };
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    if (model) {
      setupCamera();
    }

    return () => {
      if (stream) {
        // Stop video stream when component is unmounted
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [model, stream]);

  // Detect hands and translate gestures with a slight delay to improve stability
  const detectHands = async () => {
    if (model) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const detect = async () => {
        const predictions = await model.estimateHands(video);

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawing

        if (predictions.length > 0) {
          drawHand(predictions, ctx);
          const gestureText = translateGesture(predictions);
          setCapturedGesture(gestureText); // Capture the gesture text
        } else {
          setCapturedGesture('No gesture detected');
        }

        // Add a delay between detections for more stable output (e.g., 500ms)
        setTimeout(() => requestAnimationFrame(detect()), 1); // Reduced timeout to balance performance
      };

      detect();
    }
  };

  // Draw hand landmarks on canvas
  const drawHand = (predictions, ctx) => {
    predictions.forEach(({ landmarks }) => {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'cyan';
      for (let i = 0; i < landmarks.length - 1; i++) {
        ctx.moveTo(landmarks[i][0], landmarks[i][1]);
        ctx.lineTo(landmarks[i + 1][0], landmarks[i + 1][1]);
      }
      ctx.stroke();

      landmarks.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'cyan';
        ctx.fill();
      });
    });
  };

  // Translate gestures to text based on hand landmarks
  const translateGesture = (predictions) => {
    const landmarks = predictions[0].landmarks;

    if (isFist(landmarks)) {
      return 'Fist detected';
    } else if (isOpenHand(landmarks)) {
      return 'Open hand detected';
    } else if (isThumbsUp(landmarks)) {
      return 'Thumbs up detected';
    } else {
      return 'Unknown gesture';
    }
  };

  // Detect if hand is in a fist (all fingers curled in)
  const isFist = (landmarks) => {
    const thumbToIndexDistance = calcDistance(landmarks[4], landmarks[8]);
    const thumbToMiddleDistance = calcDistance(landmarks[4], landmarks[12]);
    return thumbToIndexDistance < 50 && thumbToMiddleDistance < 50;
  };

  // Detect if hand is open (fingers spread out)
  const isOpenHand = (landmarks) => {
    const distances = calcFingerDistances(landmarks);
    return distances.every(d => d > 100); // Adjust threshold for detecting spread fingers
  };

  // Detect if hand shows a "thumbs up"
  const isThumbsUp = (landmarks) => {
    const thumbToIndexDistance = calcDistance(landmarks[4], landmarks[8]);
    const thumbToWristDistance = calcDistance(landmarks[4], landmarks[0]);
    const indexToMiddleDistance = calcDistance(landmarks[8], landmarks[12]);

    return thumbToWristDistance > 150 && thumbToIndexDistance > 120 && indexToMiddleDistance < 50;
  };

  // Calculate distances between key landmarks (fingers spread or close)
  const calcFingerDistances = (landmarks) => {
    return [
      calcDistance(landmarks[4], landmarks[8]),  // Thumb to index
      calcDistance(landmarks[8], landmarks[12]), // Index to middle
      calcDistance(landmarks[12], landmarks[16]), // Middle to ring
      calcDistance(landmarks[16], landmarks[20]), // Ring to pinky
    ];
  };

  // Calculate Euclidean distance between two points
  const calcDistance = (pointA, pointB) => {
    const dx = pointA[0] - pointB[0];
    const dy = pointA[1] - pointB[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Sign Language to Text Translator</h1>
      <div className="relative">
        <video
          ref={videoRef}
          className="border-4 border-gray-700"
          width="640"
          height="480"
          autoPlay
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          width="640"
          height="480"
        />
      </div>

      <div className="mt-4 p-4 bg-white border-2 border-gray-300 rounded-md shadow-md">
        <p className="text-lg font-semibold">Live Gesture: {capturedGesture}</p>
      </div>

      <div className="mt-4 p-4 bg-blue-100 border-2 border-blue-300 rounded-md shadow-md">
        <p className="text-lg font-semibold">
          <span className="text-blue-700">Captured Gesture:</span> {output}
        </p>
      </div>
    </div>
  );
};

export default Translator;
