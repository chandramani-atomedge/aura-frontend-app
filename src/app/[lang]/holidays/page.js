"use client";
import "@/assets/js/main.js";
import React, { useState, useEffect } from "react";
import Holiday from "./Form/Form";
import DeletePopUp from "@/components/DeletePopUp";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ViewHoliday from "./ViewHoliday/ViewHoliday";
import withAuth from "@/app/utils/withAuth";
import { Modal } from "bootstrap";
const Holidaypage = ({ params }) => {
  // state
  const [createHoliday, setCreateHoliday] = useState(false);
  const [holidayData, setHolidayData] = useState([]);
  const [editHoliday, setEditHoliday] = useState("");
  const [deleteHoliday, setDeleteHoliday] = useState("");
  const [viewHoliday, setViewHoliday] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  //To enable form
  const mountForm = () => {
    setEditHoliday("");
    setCreateHoliday(true);
  };

  //Disable form
  const disMountForm = () => {
    setCreateHoliday(false);
    fetchData();
  };

  //mount component with edit access
  const handleEditHoliday = (id) => {
    setEditHoliday(id);
    setCreateHoliday(true);
  };
  //Close the popup without any change
  const closebutton = () => {
    setDeleteHoliday("");
  };

  //Passing the id
  const viewHolidayDetails = (id) => {
    setViewHoliday(id);
  };

  //close the popup
  const closePopUp = () => {
    setViewHoliday("");
  };

  //format date
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" }); // Get short month name without locale
    const year = d.getFullYear().toString().slice(-2); // Get last two digits of the year

    return `${day}, ${month}, ${year}`;
  };

  //function to delete the holidays
  const holidayDeletion = async () => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("refreshToken");
    const orgid = localStorage.getItem("orgId");

    const combinedData = {
      id: deleteHoliday,
      orgid: orgid,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/holiday`,
        {
          method: "DELETE",
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
        const modal = Modal.getOrCreateInstance("#DeleteModal");
        modal.hide();
        setDeleteHoliday("");
        fetchData();
      } else {
        setErrors(result.message || "");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //function to fetch the holidays
  const fetchData = async () => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("refreshToken");
    const orgid = localStorage.getItem("orgId");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/holidays`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, headers: {
            "Content-Type": "application/json",
            "Access-Token": `${accesstoken},`,
            "Refresh-Token": `${refreshtoken},`,
          },
          body: JSON.stringify({ orgid }),
        }
      );
      console.log(response)
      let result = await response.json();
      console.log("resilt",result);
      // console.log(response)
      if (response.ok) {
        if (result === null) result = [];
        setHolidayData(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      id="main"
      className="main holidays-list"
      style={{ fontFamily: "Poppins ,sans-serif" }}
    >
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item">Manage</li>
            <li className="breadcrumb-item active">Holidays</li>
          </ol>
        </nav>
        <div className="table-header">
          <h1>Holidays</h1>
          <div className="right-column">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search"
              />
              <div className="search-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            <a
              className="btn btn-primary btn-sm py-20 mr-20"
              type="button"
              data-bs-target="#AddHolidayModal"
              onClick={mountForm}
            >
              <i className="bi bi-plus-circle mr-10"></i> Add Holiday
            </a>
            <button
              className="btn btn-outline-primary bordered-gray btn-sm py-20 mr-20"
              type="submit"
            >
              <i className="bi bi-upload mr-10"></i> Upload CSV
            </button>
            <button
              className="btn btn-outline-primary bordered-gray btn-sm py-20 mr-20"
              type="submit"
            >
              <i className="bi bi-upload mr-10"></i> Download Sample CSV
            </button>
            <i className="bi bi-question-circle" title="FAQ"></i>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body card-table">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Type</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {holidayData.map((holiday) => (
                      <tr
                        onClick={() => {
                          viewHolidayDetails(holiday.id);
                        }}
                        key={holiday.id}
                      >
                        <td
                          className="text-strong cursor-pointer"
                          data-bs-target="#HolidayModal"
                        >
                          {holiday.name}
                        </td>
                        <td className="text-truncate">{holiday.description}</td>
                        <td>{formatDate(holiday.fromdate)}</td>
                        <td> {formatDate(holiday.todate)}</td>
                        <td>{holiday.mandatory ? "Mandatory" : "Optional"}</td>
                        <td className="position-relative holiday-action-icons">
                          <div className="icon-sections">
                            <i
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditHoliday(holiday.id);
                              }}
                              className="bi bi-pencil-square edit-icon"
                              title="Edit"
                            ></i>
                            <i
                              onClick={(e) => {
                                e.stopPropagation();
                                const modal =
                                  Modal.getOrCreateInstance("#DeleteModal");
                                modal.show();
                                setDeleteHoliday(holiday.id);
                              }}
                              className="bi bi-trash delete-icon"
                              title="Delete"
                              data-bs-target="#DeleteModal"
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {createHoliday && (
        <Holiday onClick={disMountForm} holidayId={editHoliday} />
      )}
      <DeletePopUp onDelete={holidayDeletion} onClose={closebutton} />
      {viewHoliday && (
        <ViewHoliday id={viewHoliday} onClose={closePopUp} lang={params} />
      )}
    </main>
  );
};

export default withAuth(Holidaypage);
