import React, { useEffect, useLayoutEffect, useState } from "react";
import HolidayForm from "./Form_Level1";
import HolidayDetailsForm from "./Form_Level2";
import { Modal } from "bootstrap";
function Holiday({ onClick, holidayId }) {
  //state
  const [seen, setSeen] = useState(false);
  const [step, setStep] = useState(holidayId ? 0 : 1);
  const [holidayData, setHolidayData] = useState({});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");

  useLayoutEffect(() => {
    const modal = Modal.getOrCreateInstance("#AddHolidayModal");
    modal.show();
    modal._element.addEventListener("hidden.bs.modal", onClick);
    return () => {
      modal._element.removeEventListener("hidden.bs.modal", onClick);
      modal.hide();
    };
  }, []);

  //autofill data on mount  -[ no dependency ]
  useEffect(() => {
    if (holidayId) {
      const myPromise = new Promise((resolve, reject) => {
        resolve(getHolidayToEdit(holidayId));
      })
        .then((val) => val.json())
        .then((val) => {
          setHolidayData(val);
          setStep(1);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return () => {
      setHolidayData({});
    };
  }, []);

  //get the holiday by ID to autofill
  function getHolidayToEdit(id) {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("refreshToken");
    const orgid = localStorage.getItem("orgId");

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/getholidaybyid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": `${accesstoken},`,
        "Refresh-Token": `${refreshtoken},`,
      },
      body: JSON.stringify({
        id: id,
        orgid: orgid,
      }),
    });
  }

  // Reset to the first step when opening the modal
  const togglePop = () => {
    setSeen(!seen);
    if (!seen) {
      setStep(1);
    }
  };

  // Functions to  switch First form
  const switchToForm1 = () => {
    setStep(1);
  };
  //Function to switch second form
  const switchToForm2 = (data) => {
    if (
      !data["name"] ||
      !data["fromdate"] ||
      !data["todate"] ||
      !data?.applicablefor?.location
    ) {
      setErrors("Fill this form");
      return;
    }

    setStep(2);
  };

  function setHolidayDataChange(data) {
    setHolidayData({ ...holidayData, ...data });
  }

  // Function to handle data from HolidayForm
  const handleHolidayFormData = (data) => {
    setHolidayData({ ...holidayData, ...data });
    switchToForm2(data); // Switch to the next form after receiving the data
  };

  //Function to submit data to API
  const submitToBackend = async (datas) => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("refreshToken");
    const orgid = localStorage.getItem("orgId");

    const combinedData = {
      ...holidayData,
      ...datas,
      orgid: orgid,
    };

    if (holidayId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/holiday`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Access-Token": `${accesstoken},`,
              "Refresh-Token": `${refreshtoken},`,
            },
            body: JSON.stringify({ ...combinedData, id: holidayId }),
          }
        );
        const result = await response.json();
       
        if (response.ok) {
          setMessage(JSON.stringify(result));
          setTimeout(() => {
            const modal = Modal.getOrCreateInstance("#AddHolidayModal");
            modal.hide();
            onClick();
          }, 1000);
        } else {
          setErrors(result.message || "");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/holiday`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": `${accesstoken},`,
            "Refresh-Token": `${refreshtoken},`,
          },
          body: JSON.stringify(combinedData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        const modal = Modal.getOrCreateInstance("#AddHolidayModal");
          modal.hide();
          onClick();
      } else {
        setErrors(result.message || "");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="AddHolidayModal"
      tabIndex="-1"
      //disable outside click
      data-bs-keyboard="false"
      data-bs-backdrop="static"
      aria-labelledby="AddHolidayModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h1 className="modal-title" id="AddHolidayModalLabel">
              {holidayId ? "Edit Holiday" : "Add Holiday"}
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
              <div className="form-wizard">
                <div
                  className={`${
                    step === 1
                      ? "form-wizard-indicator"
                      : "form-wizard-indicator-disabled"
                  }`}
                  onClick={switchToForm1}
                >
                  <span className="indicator"></span>
                  <h6 className="form-wizard-text">Details</h6>
                </div>
                <div className="form-wizard-separator"></div>
                <div
                  className={`${
                    step === 2
                      ? "form-wizard-indicator"
                      : "form-wizard-indicator-disabled"
                  }`}
                  onClick={() => {
                    switchToForm2(holidayData);
                  }}
                >
                  <span className="indicator"></span>
                  <h6 className="form-wizard-text">Description</h6>
                </div>
              </div>
              {step === 1 ? (
                <>
                  <HolidayForm
                    editHoliday={holidayId ? true : false}
                    defaultData={holidayData}
                    onSubmit={handleHolidayFormData}
                    setHolidayDataChange={setHolidayDataChange}
                    onClick={onClick}
                  />
                </>
              ) : (
                <>
                  <HolidayDetailsForm
                    editHoliday={holidayId ? true : false}
                    defaultData={holidayData}
                    onClick={submitToBackend}
                    setHolidayDataChange={setHolidayDataChange}
                    onSubmit={onClick}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Holiday;
