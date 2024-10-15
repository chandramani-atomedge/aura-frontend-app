import Holidaypage from "@/app/[lang]/holidays/page";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Get Holidays", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });
  const mockData = [
    {
      id: 1,
      name: "New Year",
      date: "2024-01-01",
      description: "New Year's Day",
      mandatory: true,
    },
    {
      id: 2,
      name: "Christmas",
      date: "2024-12-25",
      description: "Christmas Day",
      mandatory: true,
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
    render(<Holidaypage data={mockData} />);
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
  });

  it("should delete a user and refresh the user list", async () => {
    // Mocking the fetch API for GET request to simulate users being loaded
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([
        {
          id: 1,
          name: "New Year",
          date: "2024-01-01",
          description: "New Year's Day",
          mandatory: true,
        },
      ]),
    });

    render(<Holidaypage />);

    // Wait for the user to be rendered in the document
    await waitFor(() => {
      expect(screen.getByText("New Year")).toBeInTheDocument(); // Ensure the user is displayed
    });

    // Simulate clicking the delete button
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);
  });
});
