
# Details

```http
POST/alldesignation
```
```http
Navigation : manage -> Designation
```
```
when we clicking the Designation it will navigate to the Designation page and display the types
```
#### Method
```http
POST/alldesignation
```
### Headers
```json
"Access-Token" : token,
"Refresh-Token" : token
```

#### Body
```http
  orgid : id
```


#### data from the API

```json
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
``` 


##### Output

| Type      | edit | delete |
| :-------- | ---- | ------ |
| permanent | icon | icon   |






### Flow chart


[GET](designationGet.png)