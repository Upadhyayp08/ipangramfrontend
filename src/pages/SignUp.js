import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function SignUp({ setloginsuccess }) {
  const [signIn, setNotSignIn] = useState(false);
  let componenttoshow;
  if (signIn == true) {
    componenttoshow = (
      <Login
        signIn={signIn}
        setNotSignIn={setNotSignIn}
        setloginsuccess={setloginsuccess}
      ></Login>
    );
  } else {
    componenttoshow = (
      <Register
        signIn={signIn}
        setNotSignIn={setNotSignIn}
        setloginsuccess={setloginsuccess}
      ></Register>
    );
  }

  return <>{componenttoshow}</>;
}

export default SignUp;
