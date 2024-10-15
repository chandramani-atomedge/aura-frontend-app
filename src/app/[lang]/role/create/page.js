"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoleValdidation } from "./Validation/roleValidation";
const CreateRole = ({ params }) => {
  //state
  const [roleName, setRoleName] = useState("");
  const [role, setRole] = useState({
    employee: {
      1: true,
      2: true,
      3: true,
      4: true,
    },
    department: {
      1: true,
      2: true,
      3: true,
      4: true,
    },
    role: {
      1: true,
      2: true,
      3: true,
      4: true,
    },
  });

  const [openAccordion, setOpenAccordion] = useState(0);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const emptyElements = [1, 2, 3, 4, 5, 6];
  const router = useRouter();

  //function to toggle the accordian
  const toggleAccordion = (accordionId) => {
    setOpenAccordion(openAccordion === accordionId ? 0 : accordionId);
  };

  // Handle checkbox change
  const handleCheckboxChange = (module, val) => {
    if (role[module] && role[module][val]) {
      delete role[module][val];
    } else {
      role[module] = role[module] || {};
      role[module][val] = true;
    }

    setRole((prev) => ({
      ...prev,
      [module]: role[module],
    }));
  };

  //function to submit data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleData = {
      name: roleName,
      permission: Object.fromEntries(
        Object.keys(role).map((element) => [
          element,
          Object.keys(role[element])
            .filter((key) => role[element][key]) // Only keep checked permissions
            .map((key) => Number(key)), // Convert keys to numbers
        ])
      ),
      type: "standard", // Static type because in UI there is no input field for type
    };
  

    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("refreshToken");
    const orgid = localStorage.getItem("orgId");
    const combinedData = {
      orgid: orgid,
      roledata: roleData,
    };

    let roleError = {};

    const nameError = RoleValdidation("roleName", roleName);

    if (nameError) roleError.roleName = nameError;
    if (Object.keys(roleError).length > 0) {
      setErrors(roleError);
      return;
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/role`,
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
          setMessage(JSON.stringify(result));
          router.push("/role");
        } else {
          setErrors(result.message || "");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const routeBack = () => {
    router.push("/role");
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
            <li className="breadcrumb-item">Roles</li>
            <li className="breadcrumb-item active">Add Role</li>
          </ol>
        </nav>
        <div className="table-header">
          <h1>Add Role</h1>
          <div className="right-column">
            <i className="bi bi-question-circle" title="FAQ"></i>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card box-shadow-none add-edit-role">
              <div className="card-body card-table pb-0">
                <div className="card-title mb-0">
                  <p className="card-name">Role Name</p>
                  <input
                    type="text"
                    className="search-input"
                    placeholder=""
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                  />
                </div>
                {errors.roleName && <p>{errors.roleName}</p>}
                <div className="card-title pt-10 pb-0 mb-0">
                  <p className="card-name">Permissions</p>
                </div>
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          openAccordion === 1 ? "" : "collapsed"
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded={openAccordion === 1}
                        aria-controls="flush-collapseOne"
                        onClick={() => toggleAccordion(1)}
                      >
                        <i className="bi bi-people mr-10 text-dark text-strong fw_500"></i>{" "}
                        Employee
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className={`accordion-collapse collapse ${
                        openAccordion === 1 ? "show" : ""
                      }`}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col" style={{ width: "100px" }}>
                                Name
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Description
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Read
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Create
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Edit
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Delete
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Add User
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Remove User
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-strong text-dark">
                                Employee
                              </td>
                              <td className="text-truncate">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </td>
                              {emptyElements.map((val, index) => (
                                <td key={index} className="text-center">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`role-user-check-${val}`} // +1 to make IDs start from 1
                                      data-testid={`role-user-check-${val}`}
                                      checked={
                                        role["employee"]
                                          ? role["employee"][val] || false
                                          : false
                                      } // Ensure it defaults to false if not checked
                                      onChange={() => {
                                        handleCheckboxChange("employee", val);
                                      }}
                                    />
                                  </div>
                                </td>
                              ))}
                            </tr>

                            <tr>
                              <td className="text-strong text-dark">Role</td>
                              <td className="text-truncate">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </td>
                              {emptyElements.map((val, index) => (
                                <td key={index} className="text-center">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`role-user-check-${val}`} // +1 to make IDs start from 1
                                      checked={
                                        role["role"]
                                          ? role["role"][val] || false
                                          : false
                                      } // Ensure it defaults to false if not checked
                                      onChange={() => {
                                        handleCheckboxChange("role", val);
                                      }}
                                    />
                                  </div>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          openAccordion === 2 ? "" : "collapsed"
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded={openAccordion === 2}
                        aria-controls="flush-collapseTwo"
                        onClick={() => toggleAccordion(2)}
                      >
                        <i className="bi bi-people mr-10 text-dark text-strong fw_500"></i>{" "}
                        Department
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className={`accordion-collapse collapse ${
                        openAccordion === 2 ? "show" : ""
                      }`}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col" style={{ width: "100px" }}>
                                Name
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Description
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Read
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Create
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Edit
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Delete
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Add User
                              </th>
                              <th scope="col" style={{ width: "100px" }}>
                                Remove User
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-strong text-dark">
                                Department
                              </td>
                              <td className="text-truncate">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </td>
                              {emptyElements.map((val, index) => (
                                <td key={index} className="text-center">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`role-user-check-${val}`} // +1 to make IDs start from 1
                                      checked={
                                        role["department"]
                                          ? role["department"][val] || false
                                          : false
                                      } // Ensure it defaults to false if not checked
                                      onChange={() => {
                                        handleCheckboxChange("department", val);
                                      }}
                                    />
                                  </div>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-buttons text-end">
              <button
                type="reset"
                className="btn btn-secondary mr-20"
                onClick={routeBack}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreateRole;
