"use client";

import React, { useState } from "react";
import { validateField } from "./Validation/Level2_validation";

const HolidayDetailsForm = ({
  onClick,
  setHolidayDataChange,
  defaultData,
  editHoliday,
  onSubmit,
}) => {
  //state
  const [description, setDescription] = useState(
    editHoliday ? defaultData.description : ""
  );
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  //handle the image changes
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  //fucntion to handle the data to submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    const descriptionError = validateField("description", description);
    // Set errors for individual fields
    const newErrors = {};
    if (descriptionError) {
      newErrors.description = descriptionError;
    }
    // If there are errors, set the state and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      description,
      image: image ? image.name : null, // Log the image name if an image is selected
    };
    onClick(formData);
    // setMessage("Form submitted successfully!");
    // Clear form fields and errors
    setDescription("");
    setImage(null);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="description-wizard" id="description-wizard">
        <div className="col-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            rows="5"
            id="description"
            value={description}
            onChange={(e) => {
              setHolidayDataChange({ description: e.target.value });
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="col-12 pt-20">
          <label htmlFor="photo" className="form-label">
            Upload Photo
          </label>
          <div className="drop-zone">
            <i
              className="bi bi-upload"
              onClick={() => document.getElementById("fileInput").click()}
            ></i>
            <span className="drop-zone__prompt">
              Drag & drop file or
              <span
                className="browse-text"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Browse
              </span>
            </span>
            <input
              type="file"
              name="myFile"
              className="drop-zone__input"
              id="fileInput"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        </div>
      </div>
      <div className="text-end pt-20">
        <button
          type="reset"
          onClick={onSubmit}
          className="btn btn-secondary mr-20"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" onClick={onClick}>
          Save
        </button>
      </div>
    </form>
  );
};

export default HolidayDetailsForm;
