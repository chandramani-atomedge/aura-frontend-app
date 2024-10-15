"use client";

import React, { useState } from "react";
import { validateLoginField } from "./loginValidation";
import { useRouter } from "next/navigation";
import logo from "@/assets/img/logo.png";
import googleIcon from "@/assets/img/icons/google-icon.svg";
import outlookIcon from "@/assets/img/icons/outlook-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/getDictionary";

function Loginpage({ params }) {
  //get preferred language
  const lang = getDictionary(params.lang);
  //...constants

  const navigate = useRouter();

  //...state

  const [isemailaddressSelected, setIsemailaddressSelected] = useState(true);
  const [loginData, setLoginData] = useState({
    emailaddress: "",
    mobilenumber: "",
    password: "",
  });
  const [validEmail, setValidEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");

  //...functions
  const validateInput = (valid) => {
    let inputVerifier = {};
    let error;
    error = validateLoginField(valid, loginData[valid], isemailaddressSelected);
    inputVerifier[valid] = loginData[valid];
    if (error) {
      inputVerifier = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [valid]: error || "",
      }));
    }
    return inputVerifier;
  };

  // toggle password input type toggle ( password - text )
  function togglePasswordView() {
    const passwordField = document.getElementById("yourPassword");
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    const iconClass = type === "password" ? "bi-eye-slash" : "bi-eye";
    togglePassword.innerHTML = `<i class="bi ${iconClass}"></i>`;
  }

  function changeEmailorPhone() {
    setValidEmail(false);
  }

  //toggle between phone and mail
  const handleToggle = () => {
    if (!validEmail) {
      setIsemailaddressSelected((emailSelected) => !emailSelected);
      setLoginData((prevData) => ({
        ...prevData,
        emailaddress: "",
        mobilenumber: "",
      }));
    } else {
      setIsemailaddressSelected((emailSelected) => !emailSelected);
      setValidEmail(false);
      setLoginData((prevData) => ({
        ...prevData,
        emailaddress: "",
        mobilenumber: "",
      }));
    }
  };

  //check email to proceed with password
  async function handleCheckEmail() {
    let dataToVerify = {};
    if (isemailaddressSelected) {
      dataToVerify = validateInput("emailaddress");
    } else {
      dataToVerify = validateInput("mobilenumber");
    }
    if (!dataToVerify) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-identifier`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToVerify),
        }
      );
      const data = await response.json();
      if (response.ok && data["orgid"]) {
        localStorage.setItem("orgId", data["orgid"]);
        setValidEmail(true);
      } else {
        setMessage(JSON.stringify(data));
      }
    } catch (error) {
      setMessage(error);
      console.error(error);
    }
  }

  //navigate to signup
  function navigateToSignUp() {
    navigate.push(`/${params.lang}/signup`);
  }

  //validate on input enter
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    const error = validateLoginField(name, value, isemailaddressSelected);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error || null,
    }));
  };

  //submission of mail and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    let hasError = false;

    for (const field in loginData) {
      const error = validateLoginField(
        field,
        loginData[field],
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      setMessage(JSON.stringify(data));

      if (response?.ok) {
        const token = JSON.parse(data.message);
        localStorage.setItem("accessToken", token["access-token"]);
        localStorage.setItem("refreshToken", token["refresh-token"]);
        navigate.push(`/${params.lang}/home`);
        setMessage(JSON.stringify(data));
      } else {
        setErrors(data || {});
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-12">
                <div className="signup-section login-sections">
                  <div className="logo-centered">
                    <a href="index.html" className="logo">
                      <Image
                        src={logo}
                        style={{
                          height: "auto",
                          width: "auto",
                        }}
                        alt="logo"
                        draggable="false"
                      />
                    </a>
                  </div>
                  <div className="mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-2 fs-4">
                          Login
                        </h5>
                        <p className="text-center small">
                          Please choose login method
                        </p>
                      </div>
                      <div className="sso-login-buttons">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          <Image
                            src={googleIcon}
                            className="mr-10"
                            alt="Google"
                            draggable="false"
                          />{" "}
                          Sign in with Gmail
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          <Image
                            src={outlookIcon}
                            className="mr-10"
                            alt="Outlook"
                            draggable="false"
                          />{" "}
                          Sign in with Outlook
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
                            name="emailaddress"
                            checked={isemailaddressSelected}
                            onChange={handleToggle}
                          />
                          <label htmlFor="email" className="toggle-label">
                            <i className="bi bi-envelope mr-10"></i> Email
                          </label>
                          <input
                            type="radio"
                            id="phone"
                            checked={!isemailaddressSelected}
                            onChange={handleToggle}
                            name="mobilenumber"
                          />
                          <label htmlFor="phone" className="toggle-label">
                            <i className="bi bi-telephone mr-10"></i> Phone
                          </label>
                          <div className="toggle-slider"></div>
                        </div>
                      </div>
                      <div className="row g-3 needs-validation">
                        {isemailaddressSelected ? (
                          <div className="col-12 email-field">
                            <input
                              type="email"
                              name="emailaddress"
                              onChange={handleChange}
                              className="form-control mt-10"
                              id="yourEmail"
                              value={loginData.emailaddress || ""}
                              disabled={validEmail}
                              required
                              placeholder="Email"
                            />
                            {errors.emailaddress && (
                              <div
                                style={{ display: "block" }}
                                className="invalid-feedback"
                              >
                                {errors.emailaddress}
                              </div>
                            )}
                            {validEmail && (
                              <span
                                onClick={changeEmailorPhone}
                                className="change-email-button"
                              >
                                Change
                              </span>
                            )}
                          </div>
                        ) : (
                          <div
                            style={{ position: "relative" }}
                            className="col-12 phone-field"
                          >
                            <input
                              type="tel"
                              name="mobilenumber"
                              className="form-control mt-10"
                              id="yourMobile"
                              disabled={validEmail}
                              value={loginData.mobilenumber || ""}
                              onChange={handleChange}
                              placeholder="Phone with country code"
                            />
                            {errors.mobilenumber && (
                              <div
                                style={{ display: "block" }}
                                className="invalid-feedback"
                              >
                                {errors.mobilenumber}
                              </div>
                            )}
                            {validEmail && (
                              <span
                                onClick={changeEmailorPhone}
                                style={{
                                  position: "absolute",
                                  right: "26px",
                                  top: "55%",
                                  transform: "translateY(-30%)",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                className="change-email-button"
                              >
                                Change
                              </span>
                            )}
                          </div>
                        )}

                        {!validEmail && (
                          <button
                            id="submitButton"
                            className="btn btn-primary w-100"
                            onClick={handleCheckEmail}
                          >
                            Next
                          </button>
                        )}
                        {validEmail && (
                          <>
                            <div className="col-12">
                              <div className="password-container">
                                <input
                                  type="password"
                                  name="password"
                                  autoComplete="false"
                                  autoCorrect="false"
                                  className="form-control mt-10"
                                  id="yourPassword"
                                  value={loginData.password}
                                  onChange={handleChange}
                                  placeholder="Password"
                                />
                                {errors.password && (
                                  <div
                                    style={{ display: "block" }}
                                    className="invalid-feedback"
                                  >
                                    {errors.password}
                                  </div>
                                )}
                                <span
                                  onClick={togglePasswordView}
                                  className="eye-icon"
                                  id="togglePassword"
                                >
                                  <i className="bi bi-eye-slash"></i>
                                </span>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-check text-end">
                                <label className="forgot-password-label">
                                  <a href="#">Forgot Password?</a>
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <button
                                id="submitButton"
                                className="btn btn-primary w-100"
                                type="submit"
                                onClick={handleSubmit}
                              >
                                <span id="buttonText">Login</span>
                                <span id="loader" className="d-none"></span>
                              </button>
                            </div>
                          </>
                        )}
                        <div className="col-12">
                          <p className="small mb-0 text-center">
                            Don’t have an account?{" "}
                            <Link
                              href={`/${params.lang}/signup`}
                              className="text-underline"
                            >
                              Signup
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Loginpage;
