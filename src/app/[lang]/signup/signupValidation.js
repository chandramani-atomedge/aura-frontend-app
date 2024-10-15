export const validateSignUp = (name, value, isemailaddressSelected) => {
    let error = "";
  
    if (name === "firstname") {
      if (!value) {
        error = "Name is required ";
      } else if (/\s/.test(value)) {
        error = "Name cannot contain spaces";
      } else if (!/^[a-zA-Z0-9]*$/.test(value)) {
        error = "Name can only contain letters and numbers";
      } else if (value.length < 2 || value.length > 20) {
        error = "Name must be between 2 and 50 characters";
      }
    } else if (isemailaddressSelected && name === "emailaddress") {
      if (!value) {
        error = "emailaddress is required ";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid emailaddress address";
      }
    } else if (!isemailaddressSelected && name === "mobilenumber") {
      if (!value) {
        error = "Mobile number is required.";
      } else if (!/^\+\d{1,3}\d{5,15}$/.test(value)) {
        error =
          "Mobile number must be valid with country code (i.e. +91) and length must be between 5 and 15 characters.";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required ";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long";
      } else if (!/[@$!%*?&#]/.test(value)) {
        error = "Password must contain at least one special character";
      }
    } else if (name === "termsandconditions") {
      if (!value) {
        error = "You must agree to the terms and conditions";
      }
    }
  
    return error;
  };
  