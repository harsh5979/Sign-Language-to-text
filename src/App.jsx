import { useState, useMemo, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./context/contextapi";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Error from "./Pages/Error";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import Donations from "./Pages/Donations";

import Logout from "./Pages/Logout";
import MainLoader from "./Components/MainLoader";
import Protected from"./ProtectedFiles/Protected"
import Translator from "./Pages/Translator";
import ContectUs from "./Pages/ContectUs";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <MainLoader />;
  }

  return (
    <>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
}
function Main() {
  const { isLogin } = useAuth();

  const location = useLocation();
  const bg = useMemo(() => location.pathname === "/", [location]);

  return (
    
    <div
      className={`${
        bg ?  "" : ""
      } bg-cover bg-no-repeat min-h-screen`}
    >
      <Navbar />
        <ScrollToTop/>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/contectus" element={<ContectUs/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/donations" element={<Donations />} />


        <Route
          path="/translator"
          // element={<Protected element={<Translator />}  />}
          element={<Translator />}  
        />
        {/* <Route path="/" element={< />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
