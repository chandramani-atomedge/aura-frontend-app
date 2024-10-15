"use client";
import withAuth from "@/app/utils/withAuth";
import DeletePopUp from "@/components/DeletePopUp";
import DepartmentForm from "@/components/Form/Form";
import useToken from "@/hooks/useToken";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";

const Designation = () => {
  //state
  const [designationData, setDesignationData] = useState({});
  const [designationId, setDeleteDesignationId] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [defaultVal, setDefaultVal] = useState({});
  const [desRowId, setDesRowId] = useState("");
  //to fetch data - depedencies []
  useEffect(() => {
    fetchData();
  }, []);

  //form mount
  const mountForm = () => {
    setOpenForm(true);
  };

  //dismount the form
  const disMountForm = () => {
    setOpenForm(false);
    fetchData();
    setDefaultVal({});
  };

  //function to create designation
  async function handleSubmit(designation, id) {
    if (id) {
      let response = await useToken(
        "designation",
        { designation, id },
        "PATCH"
      );
      if (response.ok) {
        disMountForm();
      }
    } else {
      let response = await useToken("designation", { designation }, "POST");
      if (response.ok) {
        disMountForm();
      }
    }
  }

  async function deleteDesignation() {
    let response = await useToken(
      "designation",
      { id: desRowId, designationid: designationId },
      "DELETE"
    );
    if (response.ok) {
      closebutton();
      fetchData();
    }
  }

  function closebutton() {
    const modal = Modal.getOrCreateInstance("#DeleteModal");
    modal.hide();
    setDeleteDesignationId("");
  }

  //to fetch data from server list of designations in the organization
  const fetchData = async () => {
    const orgid = localStorage.getItem("orgId");
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("refreshToken");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/alldesignation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": `${accesstoken},`,
            "Refresh-Token": `${refreshtoken},`,
          },
          body: JSON.stringify({ orgid }),
        }
      );

      let result = await response.json();
      if (response.ok) {
        if (result === null) result = [];
        result = result[0];
        setDesRowId(result?.id);
        setDesignationData(result?.designation);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main id="main" className="main holidays-list">
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item">Manage</li>
            <li className="breadcrumb-item active">Designation</li>
          </ol>
        </nav>
        <div className="table-header">
          <h1>Designation</h1>
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
              data-bs-target="#AddEmploymentModal"
              onClick={mountForm}
            >
              <i className="bi bi-plus-circle mr-10"></i> Add Designation Type
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
              <div className="card-body card-table pb-0">
                <table className="table" id="designation-table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(designationData).map(([id, value]) => (
                      <tr key={id}>
                        <td className="text-strong">{value}</td>
                        <td className="position-relative designation-action-icons">
                          <div className="icon-sections">
                            <i
                              className="bi bi-pencil-square edit-icon"
                              title="Edit"
                              onClick={() => {
                                setDefaultVal({ id: id, value: value });
                                mountForm();
                              }}
                            ></i>
                            <i
                              className="bi bi-trash delete-icon"
                              title="Delete"
                              onClick={() => {
                                setDeleteDesignationId(id);
                                const modal =
                                  Modal.getOrCreateInstance("#DeleteModal");
                                modal.show();
                              }}
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
      {openForm && (
        <DepartmentForm
          onClick={disMountForm}
          onSubmit={handleSubmit}
          formTitle={"Designation Type Name"}
          heading={defaultVal && Object.keys(defaultVal).length > 0 ? "Edit Designation Type " : "Add Designation Type"}
          defaultvalue={defaultVal}
        />
      )}
      <DeletePopUp onDelete={deleteDesignation} onClose={closebutton} />
    </main>
  );
};

export default withAuth(Designation);
