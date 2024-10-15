import DepartmentForm from "@/components/Form/Form";
import Department from "@/app/[lang]/department/page";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormValdidation } from "@/components/Form/Validation/FormValidation"; 
import DeletePopUp from "@/components/DeletePopUp";

describe("Get department", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });
  const mockData = [
    {
      id: 1,
      name: "New Year",
    },
    {
      id: 2,
      name: "Christmas",
    },
  ];
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });

  it("renders the  name  ", async () => {
    const testProps = {
      Name: "Engineer",
    };

    const { getByLabelText } = await render(<DepartmentForm />);

    const firstNameInput = screen.getByLabelText("Department Name");

    firstNameInput.value = testProps.Name;

    expect(firstNameInput.value).toBe(testProps.Name);
  });
  it("List renders successfully", () => {
    render(<Department data={mockData} />);
    expect(screen.getByLabelText(/Departmet Name/i)).toBeInTheDocument();
  });

  it("should return 'Name can only contain letters and numbers' if the value contains invalid characters", () => {
    const result = FormValdidation("department", "Dep@rtment!");
    expect(result).toBe("Field can only contain letters and numbers");
  });

  it("should return 'Name must be between 2 and 50 characters' if the value is too short", () => {
    const result = FormValdidation("department", "D");
    expect(result).toBe("Field must be between 2 and 50 characters");
  });

  it("should return 'Name must be between 2 and 50 characters' if the value is too long", () => {
    const result = FormValdidation(
      "department",
      "ThisIsAVeryLongDepartmentNameThatExceedsLimit"
    );
    expect(result).toBe("Field must be between 2 and 50 characters");
  });

  it("should return an empty string if the value is valid", () => {
    const result = FormValdidation("department", "HR Department");
    expect(result).toBe(""); // No error
  });
  it("renders correctly", () => {
    const { getByText } = render(<DeletePopUp />);
    expect(getByText("Are you sure?")).toBeInTheDocument();
    expect(
      getByText(
        "This action cannot be undone. All values associated with this field will be lost."
      )
    ).toBeInTheDocument();
  });
  it("displaying popup", () => {
    render(<Department />);
    const button = screen.getByText('Delete');
    fireEvent.click(button);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });
});
