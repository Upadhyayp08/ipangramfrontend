import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Successtoast, Errortoast } from "../Helper/toast";
import Notification from "../utils/Notification";

function Register({ signIn, setNotSignIn, setloginsuccess }) {
  const [loginValues, setLoginValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const handleLogin = () => {
    setNotSignIn(true);
  };
  const [user, setUser] = useState({ User: "" });
  const handleChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!user.Role) {
      errors.role = "Please select a role.";
    }
    if (!loginValues.Name) {
      errors.name = "Please enter your name.";
    }
    if (!loginValues.City) {
      errors.city = "Please enter your city.";
    }
    if (!loginValues.Email) {
      errors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(loginValues.Email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!loginValues.Password) {
      errors.password = "Please enter your password.";
    } else if (loginValues.Password.length < 8) {
      errors.password = "Password should be at least 8 characters long.";
    }

    // Update the validationErrors state
    setValidationErrors(errors);

    // If there are validation errors, do not proceed with the submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    const datatobesend = { ...user, ...loginValues };
    console.log("datatobesend", datatobesend);
    axios
      .post("http://localhost:8080/registerlogin/register", datatobesend)
      .then((res) => {
        // Successtoast(res.ResponseCode);
        Notification("success", res.data.ResponseCode);
        localStorage.setItem(
          "LoginData",
          JSON.stringify(res.data.ResponseData)
        );
        setloginsuccess(true);
      })
      .catch((err) => {
        console.log("err", err);
        Notification("error", err.response.data.ResponseCode);
      });
  };

  return (
    <>
      <div className="row auto" style={{ marginTop: "15%" }}>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          {/* <button onClick={() => handleLogin()}>Login</button> */}
          <div class="card">
            <div class="card-header text-center">
              <h4 class="card-title">Register Here</h4>
            </div>
            <div class="card-body text-center">
              <div className="row mb-3">
                <div className="col-md-3 mt-1">Register As</div>
                <div className="col-md-4">
                  <button
                    // className="btn btn-primary"
                    className={
                      user.Role === "Manager"
                        ? "btn btn-primary"
                        : "btn btn-secondary"
                    }
                    onClick={() => setUser({ Role: "Manager" })}
                  >
                    Manager
                  </button>
                </div>
                <div className="col-md-5">
                  <button
                    // className="btn btn-primary"
                    className={
                      user.Role === "Employee"
                        ? "btn btn-primary"
                        : "btn btn-secondary"
                    }
                    onClick={() => setUser({ Role: "Employee" })}
                  >
                    Employee
                  </button>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-9 offset-md-3">
                  {validationErrors.role && (
                    <div className="text-danger text-start">
                      {validationErrors.role}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mt-1">
                  <label>Name</label>
                </div>
                <div className="col-md-9">
                  <input
                    type={"text"}
                    className="form-control"
                    name="Name"
                    onChange={(e) => handleChange(e)}
                    disabled={!user.Role}
                    placeholder="Enter Your Name"
                  ></input>
                  {validationErrors.name && (
                    <div className="text-danger text-start">
                      {validationErrors.name}
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-3 mt-1">
                  <label>City</label>
                </div>
                <div className="col-md-9">
                  <input
                    type={"text"}
                    className="form-control"
                    name="City"
                    onChange={(e) => handleChange(e)}
                    disabled={!user.Role}
                    placeholder="Enter Your City"
                  ></input>
                  {validationErrors.city && (
                    <div className="text-danger text-start">
                      {validationErrors.city}
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-3 mt-1">
                  <label>Email</label>
                </div>
                <div className="col-md-9">
                  <input
                    type={"email"}
                    className="form-control"
                    placeholder="Enter Your Email"
                    name="Email"
                    disabled={!user.Role}
                    onChange={(e) => handleChange(e)}
                  ></input>
                  {validationErrors.email && (
                    <div className="text-danger text-start">
                      {validationErrors.email}
                    </div>
                  )}
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
                    placeholder="Enter Your Password"
                    name="Password"
                    disabled={!user.Role}
                    onChange={(e) => handleChange(e)}
                  ></input>
                  {validationErrors.password && (
                    <div className="text-danger text-start">
                      {validationErrors.password}
                    </div>
                  )}
                </div>
                <div>
                  <button
                    className="btn btn-secondary mt-4"
                    disabled={!user.Role}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div></div>
            </div>
            <div class="card-footer text-center">
              If you have already registered click{" "}
              <b onClick={() => setNotSignIn(true)}>Here</b>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
}

export default Register;
