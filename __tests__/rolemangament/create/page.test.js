import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // This will make the toBeChecked() matcher available

import { useRouter } from "next/navigation";
import CreateRole from "@/app/[lang]/rolemanagement/create/page";

// Mocking the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RoleCheckboxes Component", () => {
  const emptyElements = [1, 2, 3, 4]; // Example data
  const mockHandleCheckboxChange = jest.fn(); // Mock function

  beforeEach(() => {
    // Reset the mock before each test
    useRouter.mockImplementation(() => ({
      query: {},
      push: jest.fn(),
      replace: jest.fn(),
    }));
  });

  test("renders checkboxes correctly", () => {
    const { getByTestId } = render(<CreateRole />);

    // Now run your assertions
    expect(getByTestId("role-user-check-1")).toBeChecked();
    expect(getByTestId("role-user-check-2")).toBeChecked();
    expect(getByTestId("role-user-check-3")).toBeChecked();
    expect(getByTestId("role-user-check-4")).toBeChecked();
  });
  test("renders checkboxes correctly", () => {
    render(<CreateRole />);
    const roleNameText = screen.getByText("Role Name");
    expect(roleNameText).toBeInTheDocument();
    //
  });
});
