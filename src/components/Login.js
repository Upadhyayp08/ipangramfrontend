import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../utils/Notification";

function Login({ signIn, setNotSignIn, setloginsuccess }) {
  const navigate = useNavigate();
  const [loginValues, setLoginValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const handleRegister = () => {
    setNotSignIn(false);
  };

  const handleChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginValues.Email || !loginValues.Password) {
      setValidationErrors({
        Email: !loginValues.Email ? "Email is required" : "",
        Password: !loginValues.Password ? "Password is required" : "",
      });
      return;
    }
    axios
      .post("http://localhost:8080/registerlogin", loginValues)
      .then((res) => {
        console.log(res);
        // console.log(res.data);
        localStorage.setItem("LoginData", JSON.stringify(res.data.user));
        Notification("success", res.data.message);
        setloginsuccess(true);
      })
      .catch((err) => {
        console.log("err", err.response.data.error);
        Notification("error", err.response.data.error);
      });
  };

  return (
    <>
      <div className="row auto" style={{ marginTop: "15%" }}>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h4 className="card-title">Login Here</h4>
            </div>
            <div className="card-body text-center">
              <div className="row">
                <div className="col-md-3 mt-1">
                  <label>Email</label>
                </div>
                <div className="col-md-9">
                  <input
                    type={"email"}
                    className="form-control"
                    name="Email"
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter Your Email"
                  ></input>
                  <div className="text-danger text-start">
                    {validationErrors.Email}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-3 mt-1">
                  <label>Password</label>
                </div>
                <div className="col-md-9">
                  <input
                    type={"password"}
                    className="form-control"
                    name="Password"
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter Your Password"
                  ></input>
                  <div className="text-danger text-start">
                    {validationErrors.Password}
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-secondary mt-4"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
              <div></div>
            </div>
            <div className="card-footer text-center">
              If you are new here click{" "}
              <b onClick={() => setNotSignIn(false)}>Here</b>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
}

export default Login;
