import HolidayDetailsForm from "@/app/[lang]/holidays/Form/Form_Level2";
import { validateField } from "@/app/[lang]/holidays/Form/Validation/Level2_validation";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
describe("Form2", () => {
  it("should render the form with all fields", () => {
    render(<HolidayDetailsForm />);
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });
  it("renders the Save button and handles click event", () => {
    // Create a mock function for the onClick handler
    const mockOnClick = jest.fn();
  
    // Render the component with the mock onClick function
    render(<HolidayDetailsForm onClick={mockOnClick} />);
  
    // Find and click the Save button
    fireEvent.click(screen.getByText(/Save/i));
  
    // Assert that the Save button is present in the document
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  
    // Assert that the mock onClick function was called
    expect(mockOnClick).toHaveBeenCalled();
  });
 
  it('should return an error if the description is less than 10 characters long', () => {
    const error = validateField('description', 'short');
    expect(error).toBe('Description must be at least 10 characters long');
  });

  it('should return an error if the description contains special characters', () => {
    const error = validateField('description', 'invalid@desc');
    expect(error).toBe('Description cannot contain special characters');
  });

  it('should return an empty string for a valid description', () => {
    const error = validateField('description', 'Valid description');
    expect(error).toBe('');
  });
});
