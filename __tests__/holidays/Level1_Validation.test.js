import HolidayForm from "@/app/[lang]/holidays/Form/Form_Level1";
import "@testing-library/jest-dom";
import { validateField } from "@/app/[lang]/holidays/Form/Validation/Level1_validation";
import { render, fireEvent, screen } from "@testing-library/react";
describe("Form1",()=>{

    
    it("should render the form with all fields", () => {
        render(<HolidayForm />);
        
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Date")).toBeInTheDocument();
       
       
       
      });
      it("render the Next button", () => {
        render(<HolidayForm />);
        fireEvent.click(screen.getByText(/Next/i));
        expect(screen.getByText(/Next/i)).toBeInTheDocument();
      });
      it("should return an error if the name is empty", () => {
        const result = validateField("name", "");
        expect(result).toBe("Name is required ");
      });
    
     
    
      it("should return an error if the name contains special characters", () => {
        const result = validateField("name", "John$");
        expect(result).toBe("Name can only contain letters and numbers");
      });
    
      it("should return an error if the name is less than 2 characters", () => {
        const result = validateField("name", "J");
        expect(result).toBe("Name must be between 2 and 50 characters");
      });
    
      it("should return an error if the name is more than 50 characters", () => {
        const longName = "a".repeat(51); // Generate a string with 51 characters
        const result = validateField("name", longName);
        expect(result).toBe("Name must be between 2 and 50 characters");
      });
      it("should return an empty string if the name is valid", () => {
        const result = validateField("name", "John123");
        expect(result).toBe("");
    
    })
    
})