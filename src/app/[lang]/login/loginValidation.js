export const validateLoginField = (name, value,isemailaddressSelected) => {
  let error = "";
  if (isemailaddressSelected && name === "emailaddress") {
    if (!value) {
      error = "emailaddress is required ";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid emailaddress address";
    }
  } else if (!isemailaddressSelected && name === "mobilenumber") {
    if (!value) {
      error = "Mobile number is required.";
    } else if (!/^\+\d{1,3}\d{5,15}$/.test(value)) {
      error = "Mobile number must be with country code (i.e. +91) and length must be between 5 and 15 characters.";
    }
  } else if (name === "password") {
    if (!value) {
      error = "Password is required";
    } else if (value.length < 6) {
      error = "Password must be at least 6 characters long";
    } else if (!/[@$!%*?&#]/.test(value)) {
      error = "Password must contain at least one special character";
    }
  }

  return error;
};
