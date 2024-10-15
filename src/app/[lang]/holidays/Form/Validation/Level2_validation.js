export const validateField = (name, value) => {
  let error = "";
  if (name === "description") {
    const regex = /^[a-zA-Z0-9\s]+$/; // Only allows letters, numbers, and spaces
    if (value?.length > 1) {
      if (value.length < 10) {
        error = "Description must be at least 10 characters long";
      } else if (!regex.test(value)) {
        error = "Description cannot contain special characters";
      }
    }
  }

  return error;
};
