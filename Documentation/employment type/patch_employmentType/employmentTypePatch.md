# Employment Role Editing Process

This document provides a brief overview of the core functionality used for editing employment roles via a Bootstrap modal, with a focus on the PATCH method used to update the employment role name.

## Core Values & Functions

1. **Edit Trigger**:
    - Clicking the **Edit Icon** triggers the opening of a Bootstrap modal. This modal is populated with the current employment role name.
2. **Real-Time Validation**:
    - As the user modifies the employment role name, input changes are detected, and real-time validation ensures that the input is valid (e.g., non-empty, correct format).
3. **Save Action**:
    - Upon successful validation, the user can click **Save**, which sends a PATCH request to update the employment type.
4. **API Interaction**:
    - After the role is updated, the system fetches the latest employment roles and displays the updated data to the user.

---

## PATCH Method: Update Employment Role

### Endpoint

`PATCH /employmenttype`

### Headers
```json
{ 
	"Access-Token":token,
	"Refresh-Token" : token
}
```

### Body

```json
{
    "id" : typeid,
    "orgid":orgid,
    "type": newType
}
```

- **type**: The new name for the employment role being updated. This value is provided by the user through the modal input field.
## Summary

The employment role editing process centers around a clean, user-friendly interaction:

- Real-time validation ensures valid input.
- The PATCH method is used to update employment types with a simple request structure.
- After updating, a GET request ensures that the latest data is reflected in the UI.



[Post](employmentTypePatch.png)