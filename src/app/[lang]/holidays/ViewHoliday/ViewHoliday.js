import React, { useEffect, useLayoutEffect, useState } from "react";
import { format } from "date-fns";
import holidaypopup from "@/assets/img/holiday-popup-firework.svg";
import Image from "next/image";
import { Modal } from "bootstrap";


const ViewHoliday = ({ id, onClose, lang }) => {
  //state
  const [holidayData, setHolidayData] = useState([]);
//Function to dismount form on cliking on the backspace
  function modelUnMount() {
    onClose()
  }

  //function to mount the form
  useLayoutEffect(() => {
    const modal = Modal.getOrCreateInstance("#HolidayModal");
    modal.show();
    viewDetails();

    modal._element.addEventListener("hidden.bs.modal", modelUnMount);
    return () => {
      modal._element.removeEventListener("hidden.bs.modal", modelUnMount);
      setHolidayData([]);
    };
  }, []);

  //Function to close the popup
  const closeDetails = () => {
    const modal = Modal.getOrCreateInstance("#HolidayModal");
    modal.hide();
    onClose();
  };

  //Function to view the holiday details
  const viewDetails = async () => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("refreshToken");
    const orgid = localStorage.getItem("orgId");
    const combinedData = {
      id: id,
      orgid: orgid,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getholidaybyid`,
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
      const data = await response.json();
      setHolidayData(data);
    } catch (error) {
      console.error(error);
    }
  };

  //Display the date based on the language 
  const fromDate = new Date(holidayData.fromdate);
  const toDate = new Date(holidayData.todate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div
      className="modal fade show"
      id="HolidayModal"
      tabIndex="-1"
      aria-labelledby="HolidayModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title" id="HolidayModalLabel">
              {holidayData.name}
            </h1>
            <button
              onClick={closeDetails}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="model-content">
              <h5 className="content-title">Description</h5>
              <p className="content-text">{holidayData.description}</p>
            </div>
          </div>
          <div className="footer-bg">
            <div className="footer-info">
              <div className="date">
                <i className="bi bi-calendar2-week mr-10"></i>
                {fromDate.toLocaleDateString(lang, options)} -{" "}
                {toDate.toLocaleDateString(lang, options)}
              </div>
              <div className="location">
                <i className="bi bi-geo-alt mr-10"></i>
                {holidayData?.applicablefor?.location}
              </div>
              <div className="type">
                <i className="bi bi-calendar-check mr-10"></i>
                {holidayData.mandatory ? "Mandatory" : "Optional"}
              </div>
            </div>
            <Image
              src={holidaypopup}
              className="footer-bg-img"
              alt="Fireworks"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHoliday;
