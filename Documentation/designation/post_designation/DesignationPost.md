This document explains the minimal process of creating a new `Designation` using a **Bootstrap modal**. It includes **validation for alphanumeric input** and the **POST API** request that sends **access tokens** and **refresh tokens** for authentication.

## Key Steps

1. **Create Button**: Triggers a Bootstrap modal to enter `Designation` details.
2. **Modal Input**: Users enter:
   - `Designation` name (alphanumeric only).
3. **Validation**: Ensures the input is valid before submission.
4. **POST API Call**: After validation, the data is sent to the backend API with required headers.
5. **Disable Modal**


## localstorage

```json
{
 "Access-Token": token,
 "Refresh-Token": token,
 "orgid": id
}
```

## API Call

### Create Designation API

- **URL**: `/designation`
- **Method**: `POST`
- **Headers**:
 ```json
"Access-Token": token
```

```json
"Refresh-Token": token
  ```
**Body**:
```json
{
 "name": "Designation Name",
 "orgId": "Organization ID"
}
```

[POST](designationPost.png)