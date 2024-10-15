import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";

import { validateSignUp } from "@/app/[lang]/signup/signpValidation";
import SignupForm from "@/app/[lang]/signup/page";
global.fetch = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("SignUp", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the  name  ", async () => {
    const testProps = {
      firstName: "John",
    };

    const { getByPlaceholderText } = await render(<SignupForm />);

    const firstNameInput = screen.getByPlaceholderText("Name");

    firstNameInput.value = testProps.firstName;

    expect(firstNameInput.value).toBe(testProps.firstName);
  });

  it("should render the form with all fields", () => {
    render(<SignupForm />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("toggles between email and phone input", () => {
    render(<SignupForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();

    expect(
      screen.queryByPlaceholderText("Phone with country code")
    ).not.toBeInTheDocument();

    const phoneButton = screen.getByText("Phone");
    fireEvent.click(phoneButton);

    const phoneInput = screen.getByPlaceholderText("Phone with country code");
    expect(phoneInput).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Email")).not.toBeInTheDocument();
  });

  it("render the submit button", () => {
    render(<SignupForm />);
    fireEvent.click(screen.getByText(/SignUp/i));
    expect(screen.getByText(/SignUp/i)).toBeInTheDocument();
  });
  it("should return an error if firstname or lastname is empty", () => {
    expect(validateSignUp("firstname", "")).toBe("Name is required ");
  });

  it("should return an error if firstname or lastname contains spaces", () => {
    expect(validateSignUp("firstname", "John Doe")).toBe(
      "Name cannot contain spaces"
    );
  });

  it("should return an error if firstname or lastname contains special characters", () => {
    expect(validateSignUp("firstname", "John@")).toBe(
      "Name can only contain letters and numbers"
    );
  });

  it("should return an error if firstname or lastname is too short or too long", () => {
    expect(validateSignUp("firstname", "J")).toBe(
      "Name must be between 2 and 50 characters"
    );

    expect(
      validateSignUp("firstname", "AveryLongNameExceedingTwentyCharacters")
    ).toBe("Name must be between 2 and 50 characters");
  });

  it("should return an error if email address is empty", () => {
    expect(validateSignUp("emailaddress", "", true)).toBe(
      "emailaddress is required "
    );
  });

  it("should return an error if email address is invalid", () => {
    expect(validateSignUp("emailaddress", "invalidemail", true)).toBe(
      "Invalid emailaddress address"
    );
  });

  it("should not return an error if email address is valid", () => {
    expect(validateSignUp("emailaddress", "test@example.com", true)).toBe("");
  });
});

// Test mobilenumber validation
it("should return an error if mobilenumber is empty", () => {
  expect(validateSignUp("mobilenumber", "")).toBe("Mobile number is required.");
});

it("should return an error if mobilenumber is invalid", () => {
  // Test invalid mobile number (too short)
  expect(validateSignUp("mobilenumber", "+9113")).toBe(
    "Mobile number must be valid with country code (i.e. +91) and length must be between 5 and 15 characters."
  );

  // Test invalid mobile number without country code
  expect(validateSignUp("mobilenumber", "12342341234123412341324")).toBe(
    "Mobile number must be valid with country code (i.e. +91) and length must be between 5 and 15 characters."
  );
});

// Test password validation
it("should return an error if password is empty", () => {
  expect(validateSignUp("password", "")).toBe("Password is required ");
});

it("should return an error if password is too short", () => {
  expect(validateSignUp("password", "12345")).toBe(
    "Password must be at least 6 characters long"
  );
});

it("should return an error if password does not contain special characters", () => {
  expect(validateSignUp("password", "password")).toBe(
    "Password must contain at least one special character"
  );
});


// Test no error case
it("should return an empty string if there is no error", () => {
  expect(validateSignUp("firstname", "John")).toBe("");
  expect(validateSignUp("lastname", "Doe")).toBe("");
  expect(validateSignUp("email", "john.doe@example.com")).toBe("");
  expect(validateSignUp("mobilenumber", "+911234567890")).toBe("");
  expect(validateSignUp("company", "Valid Company")).toBe("");
  expect(validateSignUp("password", "password@")).toBe("");
});
