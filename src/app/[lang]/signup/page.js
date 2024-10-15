"use client";

import React, { useState, useEffect, useCallback } from "react";
import moment from "moment-timezone";
import { validateSignUp } from "./signupValidation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/img/logo.png";
import google from "@/assets/img/icons/google-icon.svg";
import outlook from "@/assets/img/icons/outlook-icon.svg";
import slider from "@/assets/img/slider-1.svg";
import bootstrap from "@/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
import { getDictionary } from "@/getDictionary";

const SignupForm = ({ params }) => {
  const [lang, setLang] = useState(null);

  useEffect(() => {
    // Function to fetch the dictionary asynchronously
    async function fetchDictionary() {
      const dictionary = await getDictionary(params.lang);
      setLang(dictionary); // Set the resolved dictionary in state
    }
    fetchDictionary();
  }, [params.lang]);

  //state
  const [formData, setFormData] = useState({
    firstname: "",
    emailaddress: "",
    mobilenumber: "",
    password: "",
    locate: "",
    termsandconditions: false,
  });

  const [isemailaddressSelected, setIsemailaddressSelected] = useState(true);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  //Dynamically fetch the location
  useEffect(() => {
    const userTimezone = moment.tz.guess();
    setFormData((prevData) => ({
      ...prevData,
      locate: userTimezone,
    }));
  }, []);

  //function to change the data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateSignUp(name, value, isemailaddressSelected);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error || null,
    }));
  };

  //Function to handle checkbox
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      termsandconditions: e.target.checked, // Update the checkbox value
    });
  };

  // Function to hide password
  function hidePassword() {
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("yourPassword");

    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    const iconClass = type === "password" ? "bi-eye-slash" : "bi-eye";
    togglePassword.innerHTML = `<i class="bi ${iconClass}"></i>`;
  }
  const SlideToggle = useCallback(async () => {
    const dictionary = await getDictionary(params.lang);
    const descriptions = [
      dictionary?.signup?.description,
      dictionary?.signup?.description,
      dictionary?.signup?.description,
    ];

    const carousel = document.getElementById("carouselExampleIndicators");
    const descriptionElement = document.getElementById("carousel-description");

    carousel.addEventListener("slid.bs.carousel", function (event) {
      const currentSlideIndex = event.to;
      descriptionElement.textContent = descriptions[currentSlideIndex];
    });
  }, [lang]);

  useEffect(() => {
    const togglePassword = document.getElementById("togglePassword");
    SlideToggle();

    togglePassword.addEventListener("click", hidePassword, false);

    return () => {
      togglePassword.removeEventListener("click", hidePassword, false);
    };
  }, []);

  //Function to switch email or mobile
  const handleToggle = () => {
    setIsemailaddressSelected(!isemailaddressSelected);
    setFormData((prevData) => ({
      ...prevData,
      emailaddress: "",
      mobilenumber: "",
    }));
  };

  //submit the data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    let hasError = false;

    for (const field in formData) {
      const error = validateSignUp(
        field,
        formData[field],
        isemailaddressSelected
      );
      if (error) {
        validationErrors[field] = error;
        hasError = true;

        break;
      }
    }

    setErrors(validationErrors);

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        {
          method: "POST",
          headers: { Accept: "*", "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: formData.firstname,
            emailaddress: isemailaddressSelected ? formData.emailaddress : "",
            mobilenumber: isemailaddressSelected ? "" : formData.mobilenumber,
            password: formData.password,
            locate: formData.locate,
          }),
        }
      );

      const responseData = await response.json();

      if (responseData?.message === "Inserted Successfully") {
        setMessage(JSON.stringify(responseData));
        router.push("/login");
      } else {
        setErrors(responseData || {});
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="signup-section">
                  <div className="logo-centered">
                    <a href="index.html" className="logo">
                      <Image
                        src={logo}
                        alt="logo"
                        style={{ height: "auto", width: "auto" }}
                      />
                    </a>
                  </div>
                  <div className="mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-2 fs-4">
                          {lang?.signup?.Signup}
                        </h5>
                        <p className="text-center small">
                          {lang?.signup?.subheading}
                        </p>
                      </div>
                      <div className="sso-login-buttons">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          <Image
                            src={google}
                            className="mr-10"
                            alt="Google"
                            draggable="false"
                          />{" "}
                          {lang?.signup?.gmail}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          <Image
                            src={outlook}
                            className="mr-10"
                            alt="Outlook"
                            draggable="false"
                          />{" "}
                          {lang?.signup?.outlook}
                        </button>
                      </div>
                      <div className="separator">
                        <p className="text-center">or</p>
                      </div>
                      <div className="toogle-buttons">
                        <div className="toggle-container">
                          <input
                            type="radio"
                            id="email"
                            name="contact"
                            value="emailaddress"
                            checked={isemailaddressSelected}
                            onChange={handleToggle}
                          />
                          <label htmlFor="email" className="toggle-label">
                            <i className="bi bi-envelope mr-10"></i>
                            {lang?.signup?.email}
                          </label>
                          <input
                            type="radio"
                            id="phone"
                            name="contact"
                            value="phone"
                            checked={!isemailaddressSelected}
                            onChange={handleToggle}
                          />
                          <label htmlFor="phone" className="toggle-label">
                            <i className="bi bi-telephone mr-10"></i>{" "}
                            {lang?.signup?.phone}
                          </label>
                          <div className="toggle-slider"></div>
                        </div>
                      </div>
                      <form
                        className="row g-3 needs-validation"
                        noValidate=""
                        onSubmit={handleSubmit}
                      >
                        <div className="col-12">
                          <input
                            type="text"
                            name="firstname"
                            className="form-control"
                            id="first-name"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder={lang?.signup?.name}
                          />
                          <div
                            style={{ display: "block" }}
                            className="invalid-feedback"
                          >
                            {errors.firstname && <p>{errors.firstname}</p>}
                          </div>
                        </div>
                        {isemailaddressSelected ? (
                          <div className="col-12 email-field">
                            <input
                              type="email"
                              name="emailaddress"
                              className="form-control mt-10"
                              id="email"
                              value={formData.emailaddress}
                              onChange={handleChange}
                              placeholder={lang?.signup?.email}
                            />
                            <div
                              style={{ display: "block" }}
                              className="invalid-feedback"
                            >
                              {errors.emailaddress && (
                                <p>{errors.emailaddress}</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="col-12 phone-field">
                            <input
                              type="text"
                              name="mobilenumber"
                              className="form-control mt-10"
                              id="phone"
                              value={formData.mobilenumber}
                              onChange={handleChange}
                              placeholder={lang?.signup?.mobile}
                            />
                            <div
                              style={{ display: "block" }}
                              className="invalid-feedback"
                            >
                              {errors.mobilenumber && (
                                <p>{errors.mobilenumber}</p>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="col-12">
                          <div className="password-container">
                            <input
                              type="password"
                              name="password"
                              className="form-control mt-10 position-relative"
                              value={formData.password}
                              id="yourPassword"
                              onChange={handleChange}
                              placeholder={lang?.signup?.password}
                            />
                            <div
                              style={{ display: "block" }}
                              className="invalid-feedback"
                            >
                              {errors.password && <p>{errors.password}</p>}
                            </div>
                            <span className="eye-icon" id="togglePassword">
                              <i className="bi bi-eye-slash"></i>
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-check mt-10">
                            <input
                              className="form-check-input"
                              name="terms"
                              type="checkbox"
                              checked={formData.termsandconditions}
                              id="acceptTerms"
                              required=""
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label small"
                              htmlFor="acceptTerms"
                            >
                              {lang?.signup?.terms}{" "}
                              <a href="#">{lang?.signup?.conditions} </a>
                            </label>
                            <div className="invalid-feedback">
                              {lang?.signup?.account}
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-primary mt-10 w-100"
                            type="submit"
                          >
                            {lang?.signup?.Signup}
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0 text-center">
                            {lang?.signup?.account}{" "}
                            <Link href="/login" className="text-underline">
                              {lang?.signup?.Signin}
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 signup-slider-div">
                <div className="signup-slider">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="3000"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <Image
                          src={slider}
                          className="d-block w-100"
                          alt="Slide 1"
                        />
                      </div>
                      <div className="carousel-item">
                        <Image
                          src={slider}
                          className="d-block w-100"
                          alt="Slide 2"
                        />
                      </div>
                      <div className="carousel-item">
                        <Image
                          src={slider}
                          className="d-block w-100"
                          alt="Slide 3"
                        />
                      </div>
                    </div>
                  </div>
                  <p
                    id="carousel-description"
                    className="description text-center mt-20"
                  >
                    {lang?.signup?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignupForm;
