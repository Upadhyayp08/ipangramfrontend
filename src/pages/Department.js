import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Notification from "../utils/Notification";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Department() {
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  const getDepartmentData = () => {
    axios
      .get(`http://localhost:8080/departments`)
      .then((res) => {
        console.log(res);
        setDepartments(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  console.log("departments", departments);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate department name
    if (departmentName.trim() === "") {
      setError("Department Name cannot be empty");
      return;
    }

    // Clear any previous error
    setError("");

    // You can add logic here to handle the form submission, such as sending the departmentName to a server or performing some other action.
    console.log("Department Name submitted:", departmentName);
    axios
      .post(`http://localhost:8080/departments`, { name: departmentName })
      .then((res) => {
        console.log(res);
        Notification("success", "Data Inserted Successfully");
        getDepartmentData();
        setDepartmentName("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (departmentId) => {
    axios
      .delete(`http://localhost:8080/departments/${departmentId}`)
      .then((res) => {
        Notification("success", "Data Deleted Successfully");
        console.log(res);
        getDepartmentData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div
            className="col-md-6 px-3 py-3"
            style={{ border: "1px solid black" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="text-center">
                  <h3>Add Department</h3>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="departmentName" className="form-label mt-1">
                      Department Name:
                    </label>
                  </div>
                  <div className="col-md-9 ">
                    <input
                      type="text"
                      className={`form-control ${error && "is-invalid"}`}
                      id="departmentName"
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Display Departments in Bootstrap Cards */}
        <div className="row mt-4">
          {departments?.map((department) => (
            <div className="col-md-4 mb-3" key={department._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{department.name}</h5>
                  <p className="card-text">
                    Employees: {department.employees.join(", ")}
                  </p>
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(department._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Department;
