
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();
  const verifyUser = async() =>{
    try {
      await axios.get("http://localhost:5000/api/protected", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      navigate("/homepage");
    } catch (err) {
      navigate("/auth");
    }
  };
  
  useEffect(()=>{
    verifyUser();
  },[])

  return (
    <>
    </>
  );
}

export default HomePage;
