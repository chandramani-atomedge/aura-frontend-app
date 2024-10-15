"use client";

import React, { useLayoutEffect, useState } from "react";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { FormValdidation } from "./Validation/FormValidation";

const DepartmentForm = ({
  onClick,
  onSubmit,
  defaultvalue,
  heading,
  formTitle,
}) => {
  //State
  const [department, setDepartment] = useState(
    defaultvalue ? defaultvalue.value : ""
  );

  const [errors, setErrors] = useState("");

  useLayoutEffect(() => {
    const modal = Modal.getOrCreateInstance("#AddEmploymentModal");
    modal.show();
    
    modal._element.addEventListener("hidden.bs.modal", onClick);
    return () => {
      modal._element.removeEventListener("hidden.bs.modal", onClick);
      modal.hide();
    };
  }, []);

  //close the popup
  const closePopUp = () => {
    onClick();
  };

  //handle submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let deptErrors = {};

    const nameError = FormValdidation("department", department);

    if (nameError) deptErrors.error = nameError;
    if (Object.keys(deptErrors).length > 0) {
      setErrors(deptErrors.error);
      return;
    }
    onSubmit(department, defaultvalue?.id);
  };

  return (
    <div
      className="modal fade"
      id="AddEmploymentModal"
      tabIndex="-1"
      //disable outside click
      data-bs-keyboard="false"
      data-bs-backdrop="static"
      aria-labelledby="AddEmploymentModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h1 className="modal-title" id="AddEmploymentModalLabel">
              {heading}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="model-content">
              <div className="add-form-content">
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-12">
                    <label htmlFor="employment-name" className="form-label">
                      {formTitle}
                    </label>
                    <input
                      className="form-control"
                      id="employment-name"
                      type="text"
                      defaultValue={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                  <div
                    style={{ display: "block" }}
                    className="invalid-feedback"
                  >
                    {errors && <p>{errors}</p>}
                  </div>
                  <div className="text-end pt-20">
                    <button
                      type="button"
                      className="btn btn-secondary mr-20"
                      onClick={() => {
                        closePopUp();
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;
