import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function ProfileModalPopup({ showModal, handleCloseModal, data: initialData }) {
  const [data, setData] = useState(initialData || {});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("LoginData")) || {};
    setData(storedData);
  }, [initialData]);

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{data ? data.Role : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {data ? data.Name : ""}</p>
          <p>Email: {data ? data.Email : ""}</p>
          <p>City: {data ? data.City : ""}</p>
          {/* Add other fields as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileModalPopup;
