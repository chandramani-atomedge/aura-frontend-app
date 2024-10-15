"use client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import m1 from "@/assets/img/messages-1.jpg";
import m2 from "@/assets/img/messages-2.jpg";

const page = () => {
  const [role, setRole] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  //function to fetch the holidays
  const fetchData = async () => {
    const orgid = localStorage.getItem("orgId");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/allrolemanagement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orgid }),
        }
      );

      let result = await response.json();
      if (response.ok) {
        if (result === null) result = [];
        setRole(result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //function to toggle the dropdown
  function toggleDropdown(event) {
    const dropdowns = document.querySelectorAll(".dropdown-content"); //close the another dropdown if any other dropdown is click
    dropdowns.forEach((dropdown) => {
      dropdown.style.display = "none";
    });
    const dropdown = event.target.parentElement.nextElementSibling;
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";

    document.addEventListener("click", function (event) {
      const isClickInside =
        dropdown.contains(event.target) ||
        event.target ===
          event.target.parentElement.querySelector(".assignes-span-text");
      if (!isClickInside) {
        dropdown.style.display = "none";
        document.removeEventListener("click", arguments.caller);
      }
    });
  }

  return (
    <main id="main" className="main holidays-list">
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item">Manage</li>
            <li className="breadcrumb-item active">Roles</li>
          </ol>
        </nav>
        <div className="table-header">
          <h1>Roles</h1>
          <div className="right-column">
            <div className="search-container">
              <input type="text" className="search-input" placeholder="Search" />
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
              href="/role/create"
            >
              <i className="bi bi-plus-circle mr-10"></i> Add Role
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
                <table className="table" id="role-table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Assignees</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-strong cursor-pointer">
                        Software Architect
                      </td>
                      <td className="text-muted">Standard</td>
                      <td className="assignes-td">
                        <div className="assignes-section-one">
                          <span className="assignes-span">
                            <Image
                              src={m1}
                              alt="assignes"
                              title="User name"
                              draggable="false"
                              class="assignes-img"
                            />
                          </span>
                          <span className="assignes-span-two">
                            <Image
                              src={m2}
                              alt="assignes"
                              title="User name"
                              draggable="false"
                              class="assignes-img"
                            />
                          </span>
                          <span className="assignes-span-three">
                            <Image
                              src={m1}
                              alt="assignes"
                              title="User name"
                              draggable="false"
                              class="assignes-img"
                            />
                          </span>
                          <span className="assignes-span-four">
                            <Image
                              src={m2}
                              alt="assignes"
                              title="User name"
                              draggable="false"
                              class="assignes-img"
                            />
                          </span>
                          <span
                            className="assignes-span-text"
                            onClick={toggleDropdown}
                          >
                            +6
                          </span>
                        </div>
                        <div
                          className="dropdown-content"
                          style={{ display: "none" }}
                        >
                          <div className="user-card-title">
                            <span classs="card-title">Software Architect</span>
                          </div>
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
                                <line
                                  x1="21"
                                  y1="21"
                                  x2="16.65"
                                  y2="16.65"
                                ></line>
                              </svg>
                            </div>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m1}
                              alt="User 1"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Davis Herwitz</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m2}
                              alt="User 2"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Justin Schleifer</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m1}
                              alt="User 1"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Davis Herwitz</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m2}
                              alt="User 2"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Justin Schleifer</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m1}
                              alt="User 1"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Davis Herwitz</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m2}
                              alt="User 2"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Justin Schleifer</span>
                          </div>
                        </div>
                      </td>
                      <td className="position-relative assignes-action-icons">
                        <div className="icon-sections">
                          <i
                            className="bi bi-pencil-square edit-icon"
                            title="Edit"
                          ></i>
                          <i
                            className="bi bi-trash delete-icon"
                            title="Delete"
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteModal"
                          ></i>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-strong cursor-pointer">
                        Software Architect
                      </td>
                      <td className="text-muted">Standard</td>
                      <td className="assignes-td">
                        <div className="assignes-section-one">
                          <span className="assignes-span">
                            <Image
                              src={m1}
                              alt="assignes"
                              title="User name"
                              draggable="false"
                              class="assignes-img"
                            />
                          </span>
                          <span className="assignes-span-two">
                            <Image
                              src={m2}
                              alt="assignes"
                              title="User name"
                              draggable="false"
                              class="assignes-img"
                            />
                          </span>
                          <span className="assignes-span-three">
                            <Image
                              src={m1}
                              alt="assignes"
                              title="User name"
                              draggable="false"
                              class="assignes-img"
                            />
                          </span>
                          <span className="assignes-span-four">
                            <Image
                              src={m2}
                              alt="assignes"
                              title="User name"
                              draggable="false"
                              class="assignes-img"
                            />
                          </span>
                          <span
                            className="assignes-span-text"
                            onClick={toggleDropdown}
                          >
                            +6
                          </span>
                        </div>
                        <div
                          className="dropdown-content"
                          style={{ display: "none" }}
                        >
                          <div className="user-card-title">
                            <span className="card-title">Software Architect</span>
                          </div>
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
                                <line
                                  x1="21"
                                  y1="21"
                                  x2="16.65"
                                  y2="16.65"
                                ></line>
                              </svg>
                            </div>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m1}
                              alt="User 1"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Davis Herwitz</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m2}
                              alt="User 2"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Justin Schleifer</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m1}
                              alt="User 1"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Davis Herwitz</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m2}
                              alt="User 2"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Justin Schleifer</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m1}
                              alt="User 1"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Davis Herwitz</span>
                          </div>
                          <div className="user-card">
                            <Image
                              src={m2}
                              alt="User 2"
                              class="user-img"
                              draggable="false"
                            />
                            <span>Justin Schleifer</span>
                          </div>
                        </div>
                      </td>
                      <td className="position-relative assignes-action-icons">
                        <div className="icon-sections">
                          <i
                            className="bi bi-pencil-square edit-icon"
                            title="Edit"
                          ></i>
                          <i
                            className="bi bi-trash delete-icon"
                            title="Delete"
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteModal"
                          ></i>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
