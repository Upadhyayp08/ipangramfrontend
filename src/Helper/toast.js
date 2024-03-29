import React from "react";

const Successtoast = ({ message }) => {
  return (
    <>
      <div
        className="toast bg-success"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          {/* <img src="..." className="rounded me-2" alt="..." />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-body-secondary">11 mins ago</small> */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </>
  );
};

const Errortoast = ({ message }) => {
  return (
    <>
      <div
        className="toast bg-danger"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          {/* <img src="..." className="rounded me-2" alt="..." />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-body-secondary">11 mins ago</small> */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </>
  );
};

// export default { Successtoast, Errortoast };
export { Successtoast, Errortoast };
