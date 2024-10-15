

This document explains the minimal process of creating a new employment type using a **Bootstrap modal**. It includes **validation for alphanumeric input** and the **POST API** request that sends **access tokens** and **refresh tokens** for authentication.

## Key Steps

1. **Create Button**: Triggers a Bootstrap modal to enter employment type details.
2. **Modal Input**: Users enter:
   - Employment type name (alphanumeric only).
   - Organization ID.
3. **Validation**: Ensures the input is valid before submission.
4. **POST API Call**: After validation, the data is sent to the backend API with required headers.
5. **Disable Modal**

## API Call

### Create Employment Type API

- **URL**: `/employmenttype`
- **Method**: `POST`
- **Headers**:
  - `Authorization: {access-token}`
  - `Refresh-Token: {refresh-token}`
  
- **Body**:
  ```json
  {
    "name": "Employment Type Name",
    "orgId": "Organization ID"
  }
  ```

[POST](PostEmpType.png)
