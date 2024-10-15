export const FormValdidation = (name, value) => {
  let error = "";

  // Check if department name is provided
  if (name === "department") {
    if (!value) {
      error = "Field is required ";
    } else if (!/^[a-zA-Z0-9 ]*$/.test(value)) {
      error = "Field can only contain letters and numbers";
    } else if (value.length < 2 || value.length > 20) {
      error = "Field must be between 2 and 50 characters";
    }
  }

  return error;
};
