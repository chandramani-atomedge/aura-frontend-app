import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { format } from "date-fns";
import ViewHoliday from "@/app/[lang]/holidays/ViewHoliday/ViewHoliday";

// Mock the localStorage
const mockLocalStorage = () => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
    switch (key) {
      case "accessToken":
        return "mockAccessToken";
      case "refreshToken":
        return "mockRefreshToken";
      case "orgId":
        return "mockOrgId";
      default:
        return null;
    }
  });
};

// Mock holiday data
const mockHolidayData = {
  id: "1",
  name: "New Year",
  description: "New Year celebration",
  date: "2024-01-01",
  applicablefor: { location: "Worldwide" },
  mandatory: true,
};

describe("ViewHoliday Component", () => {
  beforeEach(() => {
    mockLocalStorage();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockHolidayData),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the "Close" button and call onClose when clicked', () => {
    const onCloseMock = jest.fn();
    render(<ViewHoliday id="1" onClose={onCloseMock} />);

    const closeButton = screen.getByText(/Close/i);
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should fetch and display holiday data when the component mounts", async () => {
    render(<ViewHoliday id="1" onClose={jest.fn()} />);

    // Use getByRole to specifically target the heading (h1) for the holiday name
    expect(
      await screen.findByRole("heading", { level: 1, name: /New Year/i })
    ).toBeInTheDocument();

    // Use getByText for description, location, and mandatory status
    expect(screen.getByText(/New Year celebration/i)).toBeInTheDocument();
    expect(screen.getByText(/Worldwide/i)).toBeInTheDocument();
    expect(screen.getByText(/Mandatory/i)).toBeInTheDocument();
  });

  it("should format the date correctly", async () => {
    render(<ViewHoliday id="1" onClose={jest.fn()} />);

    const formattedDate = format(
      new Date(mockHolidayData.date),
      "MMMM do, yyyy"
    );
    expect(await screen.findByText(formattedDate)).toBeInTheDocument();
  });

  it('should display "Optional" if the holiday is not mandatory', async () => {
    const optionalHolidayData = { ...mockHolidayData, mandatory: false };

    // Mock fetch to return the optional holiday data
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(optionalHolidayData),
      })
    );

    render(<ViewHoliday id="1" onClose={jest.fn()} />);

    expect(await screen.findByText(/Optional/i)).toBeInTheDocument();
  });
});
