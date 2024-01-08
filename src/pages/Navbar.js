import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModalPopup from "../components/ProfileModalPopup";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    // navigate("/");
    window.location.reload();
  };

  const localstoragedata = JSON.parse(localStorage.getItem("LoginData"));
  console.log(localstoragedata?.Role);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (selectedItem) => {
    console.log("Opening modal");
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {/* <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate("/")}>
            Navbar
          </a>
          <form className="d-flex">
            <div className="d-flex">
              <button
                className="btn btn-outline-none"
                type="submit"
                onClick={() => navigate("/employee")}
              >
                Employees
              </button>
            </div>
            <div className="d-flex">
              <button
                className="btn btn-outline-none"
                type="submit"
                onClick={() => navigate("/department")}
              >
                Departments
              </button>
            </div>
            <div className="d-flex">
              <button
                className="btn btn-outline-none"
                // type="submit"
                type="button"
                onClick={() => handleOpenModal()}
              >
                Profile
              </button>
            </div>
            <div className="d-flex">
              <button
                className="btn btn-outline-none"
                type="submit"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </nav>
      <ProfileModalPopup
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        data={localstoragedata}
      /> */}
      <>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" onClick={() => navigate("/")}>
              Navbar
            </a>
            <form className="d-flex">
              {localstoragedata?.Role === "Manager" && (
                <div className="d-flex">
                  <button
                    className="btn btn-outline-none"
                    type="button"
                    onClick={() => navigate("/employee")}
                  >
                    Employees
                  </button>
                </div>
              )}
              {localstoragedata?.Role === "Manager" && (
                <div className="d-flex">
                  <button
                    className="btn btn-outline-none"
                    type="button"
                    onClick={() => navigate("/department")}
                  >
                    Departments
                  </button>
                </div>
              )}
              <div className="d-flex">
                <button
                  className="btn btn-outline-none"
                  type="button"
                  onClick={() => handleOpenModal()}
                >
                  Profile
                </button>
              </div>
              <div className="d-flex">
                <button
                  className="btn btn-outline-none"
                  type="button"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </nav>
        <ProfileModalPopup
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          data={localstoragedata}
        />
      </>
    </>
  );
}

export default Navbar;
