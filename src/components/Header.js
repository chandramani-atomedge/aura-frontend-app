"use client";
import logo from "@/assets/img/logo.png";
import profile from "@/assets/img/profile-img.jpg";
import Image from "next/image";
import React from "react";
import { useState, useEffect, useRef } from "react";
const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(false);

  const ref = useRef();

  // Toggle function
  const handleToggleDropdown = (dropdownId) => {
    // If the clicked dropdown is already open, close it; otherwise, open it
    setActiveDropdown((prev) => (prev === dropdownId ? false : dropdownId));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActiveDropdown(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a
          href="index.html"
          className="logo d-flex"
          style={{ height: "26px", width: "26px" }}
        >
          <Image src={logo} alt="logo" draggable="false" />
        </a>
      </div>
      <div className="mega-menu d-flex align-items-center" ref={ref}>
        <div className="mega-menu-one">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            title="Menu"
            onClick={(e) => {
              e.preventDefault(); // Prevents default anchor behavior
              handleToggleDropdown("self"); // Open the dropdown
            }}
          >
            Self <i className="bi bi-chevron-down text-12"></i>
          </a>
          {activeDropdown === "self" && (
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow mega-menu show">
              <div className="row py-20 px-10 pb-20">
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="#">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Time & Attendance{" "}
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Check-in/out
                    </a>
                    <a href="#" className="dropdown-item">
                      Attendance Record
                    </a>
                    <a href="#" className="dropdown-item">
                      Request Time off
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="#">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Time & Attendance{" "}
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Check-in/out
                    </a>
                    <a href="#" className="dropdown-item">
                      Attendance Record
                    </a>
                    <a href="#" className="dropdown-item">
                      Request Time off
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="#">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Time & Attendance{" "}
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Check-in/out
                    </a>
                    <a href="#" className="dropdown-item">
                      Attendance Record
                    </a>
                    <a href="#" className="dropdown-item">
                      Request Time off
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="#">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Time & Attendance{" "}
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Check-in/out
                    </a>
                    <a href="#" className="dropdown-item">
                      Attendance Record
                    </a>
                    <a href="#" className="dropdown-item">
                      Request Time off
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="#">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Time & Attendance{" "}
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Check-in/out
                    </a>
                    <a href="#" className="dropdown-item">
                      Attendance Record
                    </a>
                    <a href="#" className="dropdown-item">
                      Request Time off
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="#">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Time & Attendance{" "}
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Check-in/out
                    </a>
                    <a href="#" className="dropdown-item">
                      Attendance Record
                    </a>
                    <a href="#" className="dropdown-item">
                      Request Time off
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="#">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Time & Attendance{" "}
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Check-in/out
                    </a>
                    <a href="#" className="dropdown-item">
                      Attendance Record
                    </a>
                    <a href="#" className="dropdown-item">
                      Request Time off
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="#">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Time & Attendance{" "}
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Check-in/out
                    </a>
                    <a href="#" className="dropdown-item">
                      Attendance Record
                    </a>
                    <a href="#" className="dropdown-item">
                      Request Time off
                    </a>
                  </li>
                </div>
              </div>
            </ul>
          )}
        </div>

        <div className="mega-menu-one">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            title="Menu"
            onClick={(e) => {
              e.preventDefault(); // Prevents default anchor behavior
              handleToggleDropdown("manage"); // Open the dropdown
            }}
          >
            Manage <i className="bi bi-chevron-down text-12"></i>
          </a>
          {activeDropdown === "manage" && (
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow mega-menu show">
              <div className="row py-20 px-10 pb-20">
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="/holidays">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Holidays
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Add holiday
                    </a>
                    <a href="#" className="dropdown-item">
                      Edit holiday
                    </a>
                    <a href="#" className="dropdown-item">
                      Upcoming holidays
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="/department">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Department
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Add Department
                    </a>
                    <a href="#" className="dropdown-item">
                      Edit Department
                    </a>
                    <a href="#" className="dropdown-item">
                      Delete Department
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="/designation">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Designation
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Add Desigantion
                    </a>
                    <a href="#" className="dropdown-item">
                      Edit Designation
                    </a>
                    <a href="#" className="dropdown-item">
                      Delete Designation
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="/employeeType">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      EmployeeType
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Add EmployeeType
                    </a>
                    <a href="#" className="dropdown-item">
                      Edit EmployeeType
                    </a>
                    <a href="#" className="dropdown-item">
                      Delete EmployeeType
                    </a>
                  </li>
                </div>
                <div className="col-xl-3 col-md-12 dropdown-separate">
                  <li className="dropdown-header">
                    <a href="#">
                      <i className="bi bi-clock text-dark fw-500"></i>&nbsp;
                      Employee
                      <i className="bi bi-arrow-up-right text-light-blue"></i>
                    </a>
                  </li>
                  <li>
                    <p className="mega-menu-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">
                      Add Employee
                    </a>
                    <a href="#" className="dropdown-item">
                      Edit Employee
                    </a>
                    <a href="#" className="dropdown-item">
                      Delete Employee
                    </a>
                  </li>
                </div>
              </div>
            </ul>
          )}
        </div>
        <a href="#" className="nav-link">
          Subscription
        </a>
      </div>
      <nav className="header-nav">
        <ul className="d-flex align-items-center pr-10">
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" title="Search">
              <i className="bi bi-search"></i>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link nav-icon"
              href="#"
              data-bs-toggle="dropdown"
              title="Notifications"
              onClick={(e) => {
                e.preventDefault(); // Prevents default anchor behavior
                handleToggleDropdown("notifications"); // Open the dropdown
              }}
            >
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </a>
            {activeDropdown === "notifications" && (
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications show"
                style={{
                  position: "absolute",
                  inset: "0px 0px auto auto",
                  margin: "0px",
                  transform: "translate3d(-24.8px, 28.8px, 0px)",
                }}
              >
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <div className="progress-card">
                <div className="percent">
                  <svg
                    onClick={(e) => {
                      e.preventDefault(); // Prevents default anchor behavior
                      handleToggleDropdown("profile"); // Open the dropdown
                    }}
                  >
                    <circle cx="105" cy="105" r="100"></circle>
                    <circle
                      className="border-yellow"
                      cx="105"
                      cy="105"
                      r="100"
                      style={{
                        "--percent": "30",
                      }}
                    ></circle>
                  </svg>
                </div>
              </div>
              <Image
                src={profile}
                alt="Profile"
                class="profile-img rounded-circle"
                draggable="false"
                width="40"
                height="40"
              />
            </a>
            {activeDropdown === "profile" && (
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile profile-dropdown show"
                style={{
                  position: "absolute",
                  inset: "0px 0px auto auto",
                  margin: "0px",
                  transform: "translate3d(0px, 38.4px, 0px)",
                }}
              >
                <li className="dropdown-header d-lg-flex gap-3 align-items-center">
                  <div className="profile-dropdown-img">
                    <div className="progress">
                      <div
                        role="progressbar"
                        className="progressbar orange"
                        aria-valuenow="35"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ "--value": "35" }}
                      ></div>
                      <div className="progressbar-layer"></div>
                    </div>
                    <Image
                      src={profile}
                      alt="Profile"
                      class="profile-img rounded-circle"
                      width="40"
                      height="40"
                      draggable="false"
                    />
                  </div>
                  <div className="profile-name text-start">
                    <h6>Kevin Anderson</h6>
                    <span>Web Designer</span>
                    <span className="update-profile-text">Update Profile</span>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#UserProfileModal"
                  >
                    <i className="bi bi-person text-dark"></i>
                    <span>Profile setup</span>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <i className="bi bi-gear text-dark"></i>
                    <span>Settings</span>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <i className="bi bi-question-circle text-dark"></i>
                    <span>Change Password</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <i className="bi bi-repeat"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
