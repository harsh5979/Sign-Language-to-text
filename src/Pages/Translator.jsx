import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import { Camera, Hand, Activity, Smartphone } from 'lucide-react';

const Translator = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const streamRef = useRef(null);
  const [currentGesture, setCurrentGesture] = useState('Waiting for gesture...');
  const [gestureHistory, setGestureHistory] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [cameraError, setCameraError] = useState(null);



  // Load the handpose model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        const handposeModel = await handpose.load();
        setModel(handposeModel);
        setIsModelLoading(false);
        console.log('Handpose model loaded successfully.');
      } catch (error) {
        console.error('Error loading model:', error);
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);

  // Set up the webcam
  useEffect(() => {
    const setupCamera = async () => {
      const video = videoRef.current;
      try {
        setCameraError(null);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          }
        });
        streamRef.current = mediaStream; 
        video.srcObject = mediaStream;

        video.onloadedmetadata = () => {
          video.play();
          setIsDetecting(true);
          startDetection();
        };
      } catch (error) {
        console.error('Error accessing webcam:', error);
        setCameraError('Camera access denied. Please allow camera permissions.');
      }
    };

    if (model && !isModelLoading) {
      setupCamera();
    }

    // return () => {
    //   if (stream) {
    //     stream.getTracks().forEach(track => track.stop());
    //   }
    //   if (animationRef.current) {
    //     cancelAnimationFrame(animationRef.current);
    //   }

    // };

  return () => {

  // Stop camera stream
  if (streamRef.current) {
    streamRef.current.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }

  // Stop camera on video element
  if (videoRef.current && videoRef.current.srcObject) {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    videoRef.current.srcObject = null;
  }

  // Cancel detection loop
  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }

  setIsDetecting(false);
};


  }, [model, isModelLoading]);

  // Add gesture to history
  const addGestureToHistory = useCallback((gesture) => {
    const timestamp = new Date().toLocaleTimeString();
    const newGesture = { text: gesture, time: timestamp, id: Date.now() };

    setGestureHistory(prev => {
      // Add new gesture to the beginning and keep only last 10
      const updated = [newGesture, ...prev].slice(0, 10);
      return updated;
    });
  }, []);

  // Optimized detection loop
  const startDetection = useCallback(() => {
    if (!model) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let lastGesture = '';
    let gestureStableCount = 0;
    const STABILITY_THRESHOLD = 3;
    const DETECTION_DELAY = 3000; // 3 seconds delay
    let lastDetectedTime = 0; // Track last added time

    const detect = async () => {
      try {
        if (video.readyState !== 4) {
          animationRef.current = requestAnimationFrame(detect);
          return;
        }

        const predictions = await model.estimateHands(video);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let detectedGesture = 'No gesture detected';

        if (predictions.length > 0) {
          drawHand(predictions, ctx);
          detectedGesture = translateGesture(predictions[0]);
        }

        // Update UI immediately
        setCurrentGesture(detectedGesture);

        // Check stability
        if (detectedGesture === lastGesture) {
          gestureStableCount++;
        } else {
          gestureStableCount = 0;
          lastGesture = detectedGesture;
        }

        const now = Date.now();
        const enoughTimePassed = now - lastDetectedTime >= DETECTION_DELAY;

        if (
          gestureStableCount === STABILITY_THRESHOLD &&
          detectedGesture !== 'No gesture detected' &&
          enoughTimePassed
        ) {
          addGestureToHistory(detectedGesture);
          lastDetectedTime = now; // update last detection time
        }

        animationRef.current = requestAnimationFrame(detect);
      } catch (error) {
        console.error('Detection error:', error);
        animationRef.current = requestAnimationFrame(detect);
      }
    };

    detect();
  }, [model, addGestureToHistory]);


  // Draw hand landmarks on canvas
  const drawHand = (predictions, ctx) => {
    predictions.forEach(({ landmarks }) => {
      // Draw connections
      const connections = [
        [0, 1, 2, 3, 4], // Thumb
        [0, 5, 6, 7, 8], // Index
        [0, 9, 10, 11, 12], // Middle
        [0, 13, 14, 15, 16], // Ring
        [0, 17, 18, 19, 20], // Pinky
      ];

      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;

      connections.forEach(finger => {
        ctx.beginPath();
        for (let i = 0; i < finger.length - 1; i++) {
          const [x1, y1] = landmarks[finger[i]];
          const [x2, y2] = landmarks[finger[i + 1]];
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
        ctx.stroke();
      });

      // Draw landmarks
      landmarks.forEach(([x, y], index) => {
        ctx.beginPath();
        ctx.arc(x, y, index === 0 ? 8 : 5, 0, 2 * Math.PI);
        ctx.fillStyle = index === 0 ? '#EF4444' : '#10B981';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    });
  };

  // Enhanced gesture recognition
  const translateGesture = (prediction) => {
    const landmarks = prediction.landmarks;

    if (isFist(landmarks)) {
      return 'Fist';
    } else if (isOpenHand(landmarks)) {
      return 'Open Hand';
    } else if (isThumbsUp(landmarks)) {
      return 'Thumbs Up';
    } else if (isPeace(landmarks)) {
      return 'Peace Sign';
    } else if (isPointing(landmarks)) {
      return 'Pointing';
    } else {
      return 'Unknown Gesture';
    }
  };

  // Gesture detection functions
  const isFist = (landmarks) => {
    const fingerTips = [8, 12, 16, 20]; // Index, middle, ring, pinky tips
    const fingerBases = [5, 9, 13, 17]; // Corresponding bases

    let closedFingers = 0;
    for (let i = 0; i < fingerTips.length; i++) {
      const tipY = landmarks[fingerTips[i]][1];
      const baseY = landmarks[fingerBases[i]][1];
      if (tipY > baseY - 20) closedFingers++; // Tip below base = closed
    }

    return closedFingers >= 3;
  };

  const isOpenHand = (landmarks) => {
    const fingerTips = [4, 8, 12, 16, 20]; // All fingertips including thumb
    const wrist = landmarks[0];

    let extendedFingers = 0;
    fingerTips.forEach(tip => {
      const distance = calcDistance(landmarks[tip], wrist);
      if (distance > 120) extendedFingers++;
    });

    return extendedFingers >= 4;
  };

  const isThumbsUp = (landmarks) => {
    const thumbTip = landmarks[4];
    const thumbBase = landmarks[2];
    const indexTip = landmarks[8];
    const wrist = landmarks[0];

    const thumbExtended = thumbTip[1] < thumbBase[1] - 20;
    const indexClosed = indexTip[1] > landmarks[6][1];
    const thumbAboveWrist = thumbTip[1] < wrist[1] - 50;

    return thumbExtended && indexClosed && thumbAboveWrist;
  };

  const isPeace = (landmarks) => {
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    const wrist = landmarks[0];

    const indexExtended = indexTip[1] < landmarks[6][1] - 20;
    const middleExtended = middleTip[1] < landmarks[10][1] - 20;
    const ringClosed = ringTip[1] > landmarks[14][1];
    const pinkyClosed = pinkyTip[1] > landmarks[18][1];

    return indexExtended && middleExtended && ringClosed && pinkyClosed;
  };

  const isPointing = (landmarks) => {
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const indexExtended = indexTip[1] < landmarks[6][1] - 30;
    const middleClosed = middleTip[1] > landmarks[10][1];
    const ringClosed = ringTip[1] > landmarks[14][1];
    const pinkyClosed = pinkyTip[1] > landmarks[18][1];

    return indexExtended && middleClosed && ringClosed && pinkyClosed;
  };

  const calcDistance = (pointA, pointB) => {
    const dx = pointA[0] - pointB[0];
    const dy = pointA[1] - pointB[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Hand className="text-blue-600" size={36} />
            Gesture Translator
          </h1>
          <p className="text-gray-600">Real-time sign language detection</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Camera Feed</h2>
              {isDetecting && (
                <div className="flex items-center gap-1 ml-auto">
                  <Activity className="text-green-500 animate-pulse" size={16} />
                  <span className="text-sm text-green-500">Live</span>
                </div>
              )}
            </div>

            {isModelLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading AI model...</p>
              </div>
            )}

            {cameraError && (
              <div className="text-center py-8">
                <Camera className="text-red-400 mx-auto mb-4" size={48} />
                <p className="text-red-600">{cameraError}</p>
              </div>
            )}

            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-auto max-h-80 object-cover"
                width="640"
                height="480"
                autoPlay
                muted
                playsInline
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                width="640"
                height="480"
              />
            </div>

            {/* Current Gesture */}
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <div className="flex items-center gap-2">
                <Hand className="text-blue-600" size={20} />
                <span className="font-semibold text-blue-800">Current:</span>
              </div>
              <p className="text-lg font-bold text-blue-900 mt-1">{currentGesture}</p>
            </div>
          </div>

          {/* Gesture History Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="text-green-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Gesture History</h2>
              <span className="ml-auto bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {gestureHistory.length}
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {gestureHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Hand size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No gestures detected yet</p>
                  <p className="text-sm">Make a gesture in front of the camera</p>
                </div>
              ) : (
                gestureHistory.map((gesture, index) => (
                  <div
                    key={gesture.id}
                    className={`p-3 rounded-lg border-l-4 transition-all duration-300 ${index === 0
                      ? 'bg-green-50 border-green-500 shadow-md'
                      : 'bg-gray-50 border-gray-300'
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold ${index === 0 ? 'text-green-800' : 'text-gray-700'
                        }`}>
                        {gesture.text}
                      </span>
                      {index === 0 && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{gesture.time}</p>
                  </div>
                ))
              )}
            </div>

            {gestureHistory.length > 0 && (
              <button
                onClick={() => setGestureHistory([])}
                className="w-full mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200"
              >
                Clear History
              </button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Supported Gestures</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Fist', desc: 'Closed hand' },
              { name: 'Open Hand', desc: 'All fingers extended' },
              { name: 'Thumbs Up', desc: 'Thumb pointing up' },
              { name: 'Peace Sign', desc: 'Index and middle up' },
              { name: 'Pointing', desc: 'Index finger extended' }
            ].map((gesture) => (
              <div key={gesture.name} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-800">{gesture.name}</div>
                <div className="text-sm text-gray-600">{gesture.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;