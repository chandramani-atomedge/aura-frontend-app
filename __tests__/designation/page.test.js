import Designation from "@/app/[lang]/designation/page";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Get Designation", () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mocks after each test
    });
    const mockData = [
        {
            "id": "c1111e1b-218e-4ac0-ae06-d43845c6d84d",
            "userid": "",
            "orgid": "",
            "designation": {
                "a9d2b697-8eae-4d50-97b2-14825fc11fc9": "CEO"
            },
            "createdby": "",
            "createddate": ""
        }
    ];
    beforeAll(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockData),
        })
      );
    });
    it("List renders successfully", () => {
      render(<Designation data={mockData}/>);
      expect(screen.getByText(/Name/i)).toBeInTheDocument();
    });
  });