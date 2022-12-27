import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import "./MainLayout.scss";

export default function MainLayout() {

  const navigate = useNavigate()
  useEffect(()=> {
    const token = localStorage.getItem('login')
    if(!token)
      navigate('/login')
  }, [])

  
  return (
    <div>
      <div className="main">
        <Sidebar />
        <div className="container">
          <Navbar />
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
