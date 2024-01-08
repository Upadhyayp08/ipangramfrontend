import React, { useEffect, useState } from "react";
import HomePage from "../components/HomePage";
import SignUp from "./SignUp";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginsuccess, setloginsuccess] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("LoginData");
    setIsLoggedIn(!!token);
  }, [loginsuccess]);

  return (
    <>
      {isLoggedIn ? <HomePage /> : <SignUp setloginsuccess={setloginsuccess} />}
    </>
  );
}

export default Home;
