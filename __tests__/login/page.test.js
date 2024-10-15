import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";

import { validateLoginField } from "@/app/[lang]/login/loginValidation";
import Loginpage from "@/app/[lang]/login/page";
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
describe("Login Page", () => {
  global.fetch = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("finds the email address input by label", () => {
    render(<Loginpage/>);
  
    // Find the input by the exact label text ("emailaddress Address:")
    const emailInput = screen.getByLabelText(/emailaddress address:/i);
    expect(emailInput).toBeInTheDocument();
  });

  it("should render the form with all fields", () => {
    render(<Loginpage />);
    expect(screen.getByPlaceholderText("Emailaddress")).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<Loginpage />);

    // Looking for the "Next" button as seen in the rendered output
    fireEvent.click(screen.getByText(/next/i));

    // Checking if the "Next" button exists
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it("should return an error if emailaddress is empty when email is selected", () => {
    const error = validateLoginField("emailaddress", "", true);
    expect(error).toBe("emailaddress is required ");
  });

  it("should return an error if emailaddress is invalid", () => {
    const error = validateLoginField("emailaddress", "invalid@", true);
    expect(error).toBe("Invalid emailaddress address");
  });

  it("should not return an error for valid emailaddress", () => {
    const error = validateLoginField("emailaddress", "test@example.com", true);
    expect(error).toBe("");
  });

  it("should return an error if mobilenumber is empty when mobile is selected", () => {
    const error = validateLoginField("mobilenumber", "", false);
    expect(error).toBe("Mobile number is required.");
  });

  it("should return an error if mobilenumber is invalid", () => {
    const error = validateLoginField("mobilenumber", "+123456", false);
    expect(error).toBe("Mobile number must be with country code (i.e. +91) and length must be between 5 and 15 characters.");
  });


  it("should not return an error for valid mobilenumber", () => {
    const error = validateLoginField("mobilenumber", "+911234567890", false);
    expect(error).toBe("");
  });
  

  it("should return an error if password is empty", () => {
    const error = validateLoginField("password", "", false);
    expect(error).toBe("Password is required");
  });

  it("should return an error if password is less than 6 characters", () => {
    const error = validateLoginField("password", "12345", false);
    expect(error).toBe("Password must be at least 6 characters long");
  });

  it("should return an error if password doesn't contain a special character", () => {
    const error = validateLoginField("password", "123456", false);
    expect(error).toBe("Password must contain at least one special character");
  });

  it("should not return an error for valid password", () => {
    const error = validateLoginField("password", "Password@123", false);
    expect(error).toBe("");
  });
  
});
