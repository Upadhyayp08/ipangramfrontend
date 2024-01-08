import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Notification from "../utils/Notification";

function Employee() {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  const getEmployeeData = () => {
    axios
      .get(`http://localhost:8080/registerlogin/employee`)
      .then((res) => {
        console.log(res);
        setEmployeeData(res.data.ResponseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getEmployeeData();
  }, []);

  const localstoragedata = JSON.parse(localStorage.getItem("LoginData"));

  useEffect(() => {
    // If there is no data in local storage, redirect to "/"
    if (!localstoragedata) {
      navigate("/");
    }
  }, [localstoragedata]);

  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const [selectedDepartments, setSelectedDepartments] = useState({});
  const [submitButtonStatus, setSubmitButtonStatus] = useState({});

  const handleDepartmentChange = (event, employeeId) => {
    // handleSubmit(employeeId);
    const selectedValue = event.target.value;

    // Update the department for the specific employee
    setSelectedDepartments((prevSelectedDepartments) => ({
      ...prevSelectedDepartments,
      [employeeId]: selectedValue,
    }));

    setEmployeeData((prevEmployeeData) =>
      prevEmployeeData.map((employee) =>
        employee._id === employeeId
          ? { ...employee, Department: selectedValue }
          : employee
      )
    );

    setSubmitButtonStatus((prevButtonStatus) => ({
      ...prevButtonStatus,
      [employeeId]: selectedValue !== "",
    }));

    setIsSubmitActive(selectedValue !== "");
  };

  const handleSubmit = (employeeId, employee) => {
    console.log(employee, "employeeData2");
    // console.log(`Employee submitted with department: ${selectedDepartments}`);
    axios
      .put(
        `http://localhost:8080/registerlogin/employees/${employeeId}`,
        employee
      )
      .then((res) => {
        console.log(res);
        Notification("success", res.data.ResponseCode);
        getEmployeeData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [nameSortOrder, setNameSortOrder] = useState("asc");
  const [citySortOrder, setCitySortOrder] = useState("asc");

  const handleNameSortChange = (event) => {
    console.log(event.target.name, event.target.value);
    axios
      .get(
        `http://localhost:8080/registerlogin/employee?sortBy=${event.target.name}&sortOrder=${event.target.value}`
      )
      .then((res) => {
        console.log(res);
        setEmployeeData(res.data.ResponseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (employeeId) => {
    axios
      .delete(`http://localhost:8080/registerlogin/employees/${employeeId}`)
      .then((res) => {
        console.log(res);
        Notification("success", "Data Deleted Successfully");
        getEmployeeData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log(employeeData, "employeeData");

  const [departments, setDepartments] = useState([]);

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
  return (
    <>
      <Navbar />
      <div className="container mt-4 ">
        <div className="row mb-3 text-end">
          <div className="col-md-2">
            {/* Dropdown for Name */}
            <select
              className="form-select"
              name="Name"
              // value={nameSortOrder}
              onChange={handleNameSortChange}
            >
              <option value="" defaultChecked>
                Filter Name By
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="col-md-2">
            {/* Dropdown for City */}
            <select
              className="form-select"
              name="City"
              // value={citySortOrder}
              onChange={handleNameSortChange}
            >
              <option value="" defaultChecked>
                Filter City By
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        {employeeData?.map((employee, index) => (
          <div key={employee._id} className="card mb-5">
            <div className="card-body">
              <h5 className="card-title">Employee Information</h5>

              {/* Employee Details */}
              <div className="mb-3">
                <strong>Name:</strong> {employee.Name}
              </div>

              <div className="mb-3">
                <strong>City:</strong> {employee.City}
              </div>

              <div className="mb-3">
                <strong>Email:</strong> {employee.Email}
              </div>

              <div className="mb-3">
                <strong>Role:</strong> {employee.Role}
              </div>

              {/* Department Dropdown */}
              <div className="mb-3">
                <select
                  id={`departmentSelect-${employee._id}`}
                  className="form-select"
                  onChange={(event) =>
                    handleDepartmentChange(event, employee._id)
                  }
                  // value={selectedDepartments[employee._id] || ""}
                  value={employee.Department}
                >
                  <option value="">Select Department</option>
                  {departments.map((item) => (
                    <option value={item.name}>{item.name}</option>
                  ))}
                  {/* <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option> */}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className={`btn btn-primary ${
                  submitButtonStatus[employee._id] ? "active" : ""
                }`}
                onClick={() => handleSubmit(employee._id, employee)}
                disabled={!submitButtonStatus[employee._id]}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger ms-4"
                // onClick={() => handleSubmit(employee._id, employee)}
                onClick={() => handleDelete(employee._id)}
                // disabled={!submitButtonStatus[employee._id]}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Employee;
