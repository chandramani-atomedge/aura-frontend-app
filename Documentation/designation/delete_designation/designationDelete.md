
# Details

```http
DELETE/designation
```

```
when we clicking the delete Designation it will enable a pop-up for surety of deletion and on confirmation we can delete the department based on the id and refetch the list api and update the table
```
#### Method
```http
DELETE/designation
```
### Headers
```http
Access-Token : token
```
 
```http
Refresh-Token : token
```

#### Body
```http
 "orgid":orgid,
```
```http
 "id": designation id
```


#### data from the API

```json
 {

    "message": "Designation Deleted Successfully"

}
``` 






### Flow chart


[DELETE](designationDelete.png)