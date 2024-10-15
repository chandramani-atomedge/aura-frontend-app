export const validateField = (name, value) => {
  let error = "";

  if (name === "name") {
    if (!value) {
      error = "Name is required ";
    } else if (!/^[a-zA-Z0-9 ]*$/.test(value)) {
      error = "Name can only contain letters and numbers";
    } else if (value.length < 2 || value.length > 20) {
      error = "Name must be between 2 and 50 characters";
    }
  }

  return error;
};
