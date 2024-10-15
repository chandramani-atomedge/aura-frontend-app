import EmploymentType from "@/app/[lang]/employeeType/page";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Get Employment Type", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });
  const mockData = [
    {
      id: 1,
      name: "Permanent",
    },
    {
      id: 2,
      name: "Full-Time",
    },
  ];
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });
  it("List renders successfully", () => {
    render(<EmploymentType />);
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });
});
