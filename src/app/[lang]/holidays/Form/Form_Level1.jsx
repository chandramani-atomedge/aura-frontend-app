import React, { useEffect, useState } from "react";
import { validateField } from "./Validation/Level1_validation";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Select2 from "select2";
import datepicker from "bootstrap-datepicker";
import { Modal } from "bootstrap";
import $ from "jquery";
const HolidayForm = ({
  onSubmit,
  setHolidayDataChange,
  defaultData,
  editHoliday,
  onClick,
}) => {
  //state

  const [name, setName] = useState(editHoliday ? defaultData.name : "");
  const [fromdate, setfromdate] = useState(
    editHoliday && defaultData.date ? defaultData.date.split("T")[0] : ""
  );
  const [todate, settodate] = useState(
    editHoliday && defaultData.date ? defaultData.date.split("T")[0] : ""
  );
  const [selectedLocations, setSelectedLocations] = useState(
    editHoliday ? defaultData?.applicablefor?.location?.split(", ") : []
  );
  const [mandatory, setMandatory] = useState(
    editHoliday ? defaultData.mandatory : true
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    $("#from-date").datepicker({
      format: "yyyy-mm-dd",
      autoclose: true,
    });

    $("#from-date").on("change", function (e) {
      setfromdate(e.target.value);
    });

    $("#to-date").datepicker({
      format: "yyyy-mm-dd",
      autoclose: true,
    });

    $("#to-date").on("change", function (e) {
      settodate(e.target.value);
    });

    let availableLocations = [
      {
        id: 0,
        text: "Christmas Island",
      },
      {
        id: 1,
        text: "South Sudan",
      },
      {
        id: 2,
        text: "Jamaica",
      },
      {
        id: 3,
        text: "Kenya",
      },
      {
        id: 4,
        text: "French Guiana",
      },
      {
        id: 5,
        text: "Mayotta",
      },
      {
        id: 6,
        text: "Liechtenstein",
      },
      {
        id: 7,
        text: "Denmark",
      },
      {
        id: 8,
        text: "Eritrea",
      },
      {
        id: 9,
        text: "Gibraltar",
      },

      {
        id: 10,
        text: "Haiti",
      },

      {
        id: 11,
        text: "Namibia",
      },

      {
        id: 12,
        text: "Vietnam",
      },
    ];

    $("#multiple-select-field").select2({
      data: availableLocations,
      theme: "bootstrap-5",
      width: $(this).data("width")
        ? $(this).data("width")
        : $(this).hasClass("w-100")
        ? "100%"
        : "style",
      placeholder: $(this).data("placeholder"),
      closeOnSelect: false,
    });

    if (editHoliday) {
      const isFound = selectedLocations.map((searchTerm) => {
        let available = availableLocations.find(
          (element) => element.text === searchTerm
        );
        if (available) {
          return available.id;
        }
      });

      $("#multiple-select-field").val(isFound).trigger("change");

      $("#from-date").datepicker("setDate", new Date(defaultData.fromdate));
      $("#to-date").datepicker("setDate", new Date(defaultData.todate));
    }

    $("#multiple-select-field").on("change", function (e) {
      const selectedOptions = $(this).find("option:selected"); // Get the selected option elements
      const selectedText = [];

      selectedOptions.each(function () {
        const text = $(this).text(); // Get the text inside the option
        selectedText.push(text); // Store the text in the array
      });
      setSelectedLocations(selectedText); // Store the selected text only
    });

    return () => {
      // $("#from-date").off("click");
      $("#from-date").off("change");
      // $("#to-date").off("click");
      $("#to-date").off("change");
      $("#multiple-select-field").off("change");
    };
  }, []);

  //Send the data to the Holiday Page
 
  const formData = {
    name,
    fromdate,
    todate,
    mandatory: mandatory,
    applicablefor: {
      location: selectedLocations.join(", "),
    },
  };

  //function to submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validate each field
    const nameError = validateField("name", name);
    if (nameError) formErrors.name = nameError;
    if (!fromdate) formErrors.fromdate = "Date is required";
    if (!todate) formErrors.todate = "Date is required";
    if (selectedLocations.length === 0)
      formErrors.selectedLocations = "Please select at least one location";
    // If there are errors, set the state and stop form submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setHolidayDataChange(formData);
    onSubmit(formData);
  };

  return (
    <div className="add-form-content">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="holiday-name" className="form-label">
            Holiday Name
          </label>
          <input
            type="text"
            className="form-control"
            id="holiday-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-6 position-relative">
          <label htmlFor="from-date" className="form-label">
            From Date
          </label>
          <input
            type="text"
            className="form-control"
            id="from-date"
            value={fromdate}
            onChange={(e) => setfromdate(e.target.value)}
          />
          <div className="date-icon">
            <i className="bi bi-calendar-week text-dark"></i>
          </div>
        </div>
        <div className="col-6 position-relative">
          <label htmlFor="to-date" className="form-label">
            To Date
          </label>
          <input
            type="text"
            className="form-control"
            id="to-date"
            value={todate}
            onChange={(e) => settodate(e.target.value)}
          />
          <div className="date-icon-to">
            <i className="bi bi-calendar-week text-dark"></i>
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Type</label>
          <div className="toogle-buttons">
            <div className="toggle-container">
              <input
                type="radio"
                id="email"
                checked={mandatory === true}
                onChange={(e) => {
                  setMandatory(true);
                  setHolidayDataChange({ mandatory: true });
                }}
              />
              <label htmlFor="email" className="toggle-label">
                Mandatory
              </label>
              <input
                type="radio"
                id="phone"
                checked={mandatory === false}
                onChange={(e) => {
                  setMandatory(false);
                  setHolidayDataChange({ mandatory: false });
                }}
              />
              <label htmlFor="phone" className="toggle-label">
                Optional
              </label>
              <div className="toggle-slider"></div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <select
            className="form-select"
            id="multiple-select-field"
            data-placeholder=""
            multiple
          ></select>
        </div>
        <div className="text-end pt-20">
          <button
            type="reset"
            onClick={onClick}
            className="btn btn-secondary mr-20"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default HolidayForm;
