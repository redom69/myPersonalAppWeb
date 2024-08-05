---
title: Marsinet v2.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
language_clients:
  - shell: ''
  - http: ''
  - javascript: ''
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="marsinet">Marsinet v2.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

The marsinet API description

Base URLs:
<https://api.develop.marsinet.com>
<https://api.marsinet.com>

# Authentication

- HTTP Authentication, scheme: bearer

<h1 id="marsinet-user-not-authenticated">User not authenticated</h1>

## AppController_getData

<a id="opIdAppController_getData"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /

```

```http
GET / HTTP/1.1

```

```javascript
fetch('/', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /`

_Check if server is up_

<h3 id="appcontroller_getdata-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Hello API   | None   |

<aside class="success">
This operation does not require authentication
</aside>

## AppController_login

<a id="opIdAppController_login"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /login HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "username": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /login`

_Login_

> Body parameter

```json
{
  "username": "string",
  "password": "string"
}
```

<h3 id="appcontroller_login-parameters">Parameters</h3>

| Name | In   | Type                        | Required | Description |
| ---- | ---- | --------------------------- | -------- | ----------- |
| body | body | [LoginDto](#schemalogindto) | true     | Login data  |

> Example responses

> 200 Response

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

<h3 id="appcontroller_login-responses">Responses</h3>

| Status | Meaning                                                          | Description                  | Schema                                      |
| ------ | ---------------------------------------------------------------- | ---------------------------- | ------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Login response               | [LoginResponseDto](#schemaloginresponsedto) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Invalid username or password | None                                        |

<aside class="success">
This operation does not require authentication
</aside>

## AppController_refreshToken

<a id="opIdAppController_refreshToken"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /refresh-token \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /refresh-token HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

fetch('/refresh-token', {
  method: 'POST',
  body: inputBody,
  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`POST /refresh-token`

_Refresh token_

> Body parameter

```json
"string"
```

<h3 id="appcontroller_refreshtoken-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description        |
| ---- | ---- | ------ | -------- | ------------------ |
| body | body | string | true     | Refresh token data |

> Example responses

> 200 Response

```json
"string"
```

<h3 id="appcontroller_refreshtoken-responses">Responses</h3>

| Status | Meaning                                                          | Description            | Schema |
| ------ | ---------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Refresh token response | string |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Invalid refresh token  | None   |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)  | Refresh token expired  | None   |

<aside class="success">
This operation does not require authentication
</aside>

## AppController_register

<a id="opIdAppController_register"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /register \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /register HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "string",
  "password": "string",
  "name": "string",
  "surnames": "string",
  "phone": "string",
  "birth_date": {},
  "nationality": "string",
  "organization_id": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/register',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /register`

_Register_

> Body parameter

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "surnames": "string",
  "phone": "string",
  "birth_date": {},
  "nationality": "string",
  "organization_id": "string"
}
```

<h3 id="appcontroller_register-parameters">Parameters</h3>

| Name | In   | Type                              | Required | Description   |
| ---- | ---- | --------------------------------- | -------- | ------------- |
| body | body | [RegisterDto](#schemaregisterdto) | true     | Register data |

> Example responses

> 200 Response

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

<h3 id="appcontroller_register-responses">Responses</h3>

| Status | Meaning                                                          | Description         | Schema                                            |
| ------ | ---------------------------------------------------------------- | ------------------- | ------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Register response   | [RegisterResponseDto](#schemaregisterresponsedto) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Invalid data        | None                                              |
| 409    | [Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)    | User already exists | None                                              |

<aside class="success">
This operation does not require authentication
</aside>

## AppController_requestResetPassword

<a id="opIdAppController_requestResetPassword"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /request-reset-password \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /request-reset-password HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "username": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/request-reset-password',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /request-reset-password`

_Request reset password_

> Body parameter

```json
{
  "username": "string"
}
```

<h3 id="appcontroller_requestresetpassword-parameters">Parameters</h3>

| Name | In   | Type                                                      | Required | Description                 |
| ---- | ---- | --------------------------------------------------------- | -------- | --------------------------- |
| body | body | [RequestResetPasswordDto](#schemarequestresetpassworddto) | true     | Request reset password data |

> Example responses

> 200 Response

```json
{
  "success": true
}
```

<h3 id="appcontroller_requestresetpassword-responses">Responses</h3>

| Status | Meaning                                                          | Description                     | Schema                                                                    |
| ------ | ---------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Request reset password response | [RequestResetPasswordResponseDto](#schemarequestresetpasswordresponsedto) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Invalid email                   | None                                                                      |

<aside class="success">
This operation does not require authentication
</aside>

## AppController_resetPassword

<a id="opIdAppController_resetPassword"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /reset-password \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /reset-password HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "new_password": "string",
  "confirm_new_password": "string",
  "id": "string",
  "r": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/reset-password',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /reset-password`

_Reset password_

> Body parameter

```json
{
  "new_password": "string",
  "confirm_new_password": "string",
  "id": "string",
  "r": "string"
}
```

<h3 id="appcontroller_resetpassword-parameters">Parameters</h3>

| Name | In   | Type                                        | Required | Description         |
| ---- | ---- | ------------------------------------------- | -------- | ------------------- |
| body | body | [ResetPasswordDto](#schemaresetpassworddto) | true     | Reset password data |

> Example responses

> 200 Response

```json
{
  "success": true
}
```

<h3 id="appcontroller_resetpassword-responses">Responses</h3>

| Status | Meaning                                                          | Description             | Schema                                                      |
| ------ | ---------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Reset password response | [ResetPasswordResponseDto](#schemaresetpasswordresponsedto) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Invalid data            | None                                                        |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | User not found          | None                                                        |

<aside class="success">
This operation does not require authentication
</aside>

## AppController_getOrganizationNameByCode

<a id="opIdAppController_getOrganizationNameByCode"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /organization-name/{id} \
  -H 'Accept: application/json'

```

```http
GET /organization-name/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
};

fetch('/organization-name/{id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /organization-name/{id}`

_Get organization name by code_

<h3 id="appcontroller_getorganizationnamebycode-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description       |
| ---- | ---- | ------ | -------- | ----------------- |
| id   | path | string | true     | Organization code |

> Example responses

> 200 Response

```json
"string"
```

<h3 id="appcontroller_getorganizationnamebycode-responses">Responses</h3>

| Status | Meaning                                                        | Description            | Schema |
| ------ | -------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Organization name      | string |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Organization not found | None   |

<aside class="success">
This operation does not require authentication
</aside>

## AppController_getOrganizations

<a id="opIdAppController_getOrganizations"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /organizations \
  -H 'Accept: application/json'

```

```http
GET /organizations HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
};

fetch('/organizations', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /organizations`

_Get organizations_

> Example responses

> 200 Response

```json
[
  {
    "name": "string",
    "o_id": "string"
  }
]
```

<h3 id="appcontroller_getorganizations-responses">Responses</h3>

| Status | Meaning                                                        | Description             | Schema |
| ------ | -------------------------------------------------------------- | ----------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Organizations           | Inline |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Organizations not found | None   |

<h3 id="appcontroller_getorganizations-responseschema">Response Schema</h3>

Status Code **200**

| Name        | Type                                        | Required | Restrictions | Description |
| ----------- | ------------------------------------------- | -------- | ------------ | ----------- |
| _anonymous_ | [[OrganizationDto](#schemaorganizationdto)] | false    | none         | none        |
| » name      | string                                      | true     | none         | none        |
| » o_id      | string                                      | true     | none         | none        |

<aside class="success">
This operation does not require authentication
</aside>

## AppController_get_patient_to_informe

<a id="opIdAppController_get_patient_to_informe"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /b348fd12-8f4c-11ee-9946-dbaaaabbe5b9/b46e56a6-8f4c-11ee-959c-034b050d71b2/b4c5c5da-8f4c-11ee-aeae-07d4f942d6e1/b51819ca-8f4c-11ee-8cd3-3302d0c50040/{patient_id}

```

```http
GET /b348fd12-8f4c-11ee-9946-dbaaaabbe5b9/b46e56a6-8f4c-11ee-959c-034b050d71b2/b4c5c5da-8f4c-11ee-aeae-07d4f942d6e1/b51819ca-8f4c-11ee-8cd3-3302d0c50040/{patient_id} HTTP/1.1

```

```javascript
fetch('/b348fd12-8f4c-11ee-9946-dbaaaabbe5b9/b46e56a6-8f4c-11ee-959c-034b050d71b2/b4c5c5da-8f4c-11ee-aeae-07d4f942d6e1/b51819ca-8f4c-11ee-8cd3-3302d0c50040/{patient_id}', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /b348fd12-8f4c-11ee-9946-dbaaaabbe5b9/b46e56a6-8f4c-11ee-959c-034b050d71b2/b4c5c5da-8f4c-11ee-aeae-07d4f942d6e1/b51819ca-8f4c-11ee-8cd3-3302d0c50040/{patient_id}`

_Get report_

<h3 id="appcontroller_get_patient_to_informe-parameters">Parameters</h3>

| Name       | In   | Type   | Required | Description |
| ---------- | ---- | ------ | -------- | ----------- |
| patient_id | path | string | true     | Patient ID  |

<h3 id="appcontroller_get_patient_to_informe-responses">Responses</h3>

| Status | Meaning                                                        | Description       | Schema |
| ------ | -------------------------------------------------------------- | ----------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Informe           | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Patient not found | None   |

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="marsinet-sessions">Sessions</h1>

## SessionController_getMyPdf

<a id="opIdSessionController_getMyPdf"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /session/get-pdf/{patient_id}/{start}/{end}

```

```http
GET /session/get-pdf/{patient_id}/{start}/{end} HTTP/1.1

```

```javascript
fetch('/session/get-pdf/{patient_id}/{start}/{end}', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /session/get-pdf/{patient_id}/{start}/{end}`

_Get a PDF with the sessions of a patient_

<h3 id="sessioncontroller_getmypdf-parameters">Parameters</h3>

| Name       | In   | Type   | Required | Description |
| ---------- | ---- | ------ | -------- | ----------- |
| patient_id | path | string | true     | Patient ID  |
| start      | path | string | true     | Start date  |
| end        | path | string | true     | End date    |

<h3 id="sessioncontroller_getmypdf-responses">Responses</h3>

| Status | Meaning                                                        | Description                        | Schema |
| ------ | -------------------------------------------------------------- | ---------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | PDF with the sessions of a patient | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Patient not found                  | None   |

<aside class="success">
This operation does not require authentication
</aside>

## SessionController_findAllSessionsOfDevice

<a id="opIdSessionController_findAllSessionsOfDevice"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /session/of-device/{device_id} \
  -H 'Accept: application/json'

```

```http
GET /session/of-device/{device_id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
};

fetch('/session/of-device/{device_id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /session/of-device/{device_id}`

_Get all sessions of a device_

<h3 id="sessioncontroller_findallsessionsofdevice-parameters">Parameters</h3>

| Name      | In   | Type   | Required | Description |
| --------- | ---- | ------ | -------- | ----------- |
| device_id | path | string | true     | Device ID   |

> Example responses

> 200 Response

```json
{
  "id": "a3f5ad56-2c0b-4efb-b8e9-68c2a4a96b4d",
  "steps_automatic_forward": 100,
  "steps_automatic_backward": 50,
  "steps_intention_forward": 75,
  "steps_intention_backward": 25,
  "flexos_hip": 30,
  "flexos_knee": 45,
  "flexos_ankle": 15,
  "threshold_hipL": 20,
  "threshold_kneeL": 25,
  "threshold_hipR": 20,
  "threshold_kneeR": 25,
  "therapist_dungarees": 8,
  "therapist_effort": 5,
  "d_id": "8e5ac92a-db8f-4c28-aac1-5e4d2b3c5c18",
  "date": "2024-04-26",
  "start": "2024-04-26T08:00:00Z",
  "end": "2024-04-26T09:00:00Z",
  "time_automatic_forward": 10,
  "time_automatic_backward": 5,
  "time_intentiton_forward": 15,
  "time_intention_backward": 10,
  "steps_total": 200,
  "time_total": 60,
  "cadence_automatic_forward": 2,
  "cadence_automatic_backward": 1,
  "cadence_intention_forward": 1.5,
  "cadence_intention_backward": 0.5,
  "chest": 1,
  "evaluation": 7,
  "ingestion_id": "fe338788-8b9a-4666-92b6-dd3b44c5a91d"
}
```

<h3 id="sessioncontroller_findallsessionsofdevice-responses">Responses</h3>

| Status | Meaning                                                        | Description          | Schema                    |
| ------ | -------------------------------------------------------------- | -------------------- | ------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Sessions of a device | [Session](#schemasession) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Device not found     | None                      |

<aside class="success">
This operation does not require authentication
</aside>

## SessionController_findAllSessionsOfPatient

<a id="opIdSessionController_findAllSessionsOfPatient"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /session/of-patient/{patient_id} \
  -H 'Accept: application/json'

```

```http
GET /session/of-patient/{patient_id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
};

fetch('/session/of-patient/{patient_id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /session/of-patient/{patient_id}`

_Get all sessions of a patient_

<h3 id="sessioncontroller_findallsessionsofpatient-parameters">Parameters</h3>

| Name       | In   | Type   | Required | Description |
| ---------- | ---- | ------ | -------- | ----------- |
| patient_id | path | string | true     | Patient ID  |

> Example responses

> 200 Response

```json
{
  "id": "a3f5ad56-2c0b-4efb-b8e9-68c2a4a96b4d",
  "steps_automatic_forward": 100,
  "steps_automatic_backward": 50,
  "steps_intention_forward": 75,
  "steps_intention_backward": 25,
  "flexos_hip": 30,
  "flexos_knee": 45,
  "flexos_ankle": 15,
  "threshold_hipL": 20,
  "threshold_kneeL": 25,
  "threshold_hipR": 20,
  "threshold_kneeR": 25,
  "therapist_dungarees": 8,
  "therapist_effort": 5,
  "d_id": "8e5ac92a-db8f-4c28-aac1-5e4d2b3c5c18",
  "date": "2024-04-26",
  "start": "2024-04-26T08:00:00Z",
  "end": "2024-04-26T09:00:00Z",
  "time_automatic_forward": 10,
  "time_automatic_backward": 5,
  "time_intentiton_forward": 15,
  "time_intention_backward": 10,
  "steps_total": 200,
  "time_total": 60,
  "cadence_automatic_forward": 2,
  "cadence_automatic_backward": 1,
  "cadence_intention_forward": 1.5,
  "cadence_intention_backward": 0.5,
  "chest": 1,
  "evaluation": 7,
  "ingestion_id": "fe338788-8b9a-4666-92b6-dd3b44c5a91d"
}
```

<h3 id="sessioncontroller_findallsessionsofpatient-responses">Responses</h3>

| Status | Meaning                                                        | Description           | Schema                    |
| ------ | -------------------------------------------------------------- | --------------------- | ------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Sessions of a patient | [Session](#schemasession) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Patient not found     | None                      |

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="marsinet-patients">Patients</h1>

## PatientController_create

<a id="opIdPatientController_create"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /patient \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /patient HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": [
    "123e4567-e89b-12d3-a456-426614174000"
  ],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": [
    "Diabetes",
    "Hypertension"
  ],
  "affectation": [
    "Arthritis"
  ],
  "treatment": [
    "Insulin",
    "Metformin"
  ],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/patient',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /patient`

_Create a new patient_

> Body parameter

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1
}
```

<h3 id="patientcontroller_create-parameters">Parameters</h3>

| Name | In   | Type                            | Required | Description  |
| ---- | ---- | ------------------------------- | -------- | ------------ |
| body | body | [PatientDto](#schemapatientdto) | true     | Patient data |

> Example responses

> 201 Response

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1
}
```

<h3 id="patientcontroller_create-responses">Responses</h3>

| Status | Meaning                                                          | Description                   | Schema                          |
| ------ | ---------------------------------------------------------------- | ----------------------------- | ------------------------------- |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)     | Patient created successfully. | [PatientDto](#schemapatientdto) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error creating patient.       | None                            |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## PatientController_findAll

<a id="opIdPatientController_findAll"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /patient \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /patient HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/patient', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /patient`

_List all patients_

> Example responses

> 200 Response

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John",
  "surnames": "Doe",
  "institutions": ["Institution 1", "Institution 2"],
  "total_session": 20,
  "last_session": "2023-01-15",
  "total_steps": 5000
}
```

<h3 id="patientcontroller_findall-responses">Responses</h3>

| Status | Meaning                                                          | Description                | Schema                              |
| ------ | ---------------------------------------------------------------- | -------------------------- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | List of patients           | [PatientTable](#schemapatienttable) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error retrieving patients. | None                                |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Patients not found.        | None                                |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## PatientController_update

<a id="opIdPatientController_update"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /patient/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /patient/{id} HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": [
    "123e4567-e89b-12d3-a456-426614174000"
  ],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": [
    "Diabetes",
    "Hypertension"
  ],
  "affectation": [
    "Arthritis"
  ],
  "treatment": [
    "Insulin",
    "Metformin"
  ],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/patient/{id}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /patient/{id}`

_Update patient data_

> Body parameter

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1
}
```

<h3 id="patientcontroller_update-parameters">Parameters</h3>

| Name | In   | Type                                        | Required | Description               |
| ---- | ---- | ------------------------------------------- | -------- | ------------------------- |
| id   | path | string                                      | true     | Unique patient identifier |
| body | body | [UpdatePatientDto](#schemaupdatepatientdto) | true     | Patient data              |

> Example responses

> 200 Response

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1
}
```

<h3 id="patientcontroller_update-responses">Responses</h3>

| Status | Meaning                                                          | Description                                                        | Schema                                      |
| ------ | ---------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Update patient data                                                | [UpdatePatientDto](#schemaupdatepatientdto) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error updating patient data because the version is lower or equal. | None                                        |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Patient not found.                                                 | None                                        |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## PatientController_remove

<a id="opIdPatientController_remove"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /patient/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE /patient/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/patient/{id}', {
  method: 'DELETE',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`DELETE /patient/{id}`

_Delete a patient_

<h3 id="patientcontroller_remove-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description               |
| ---- | ---- | ------ | -------- | ------------------------- |
| id   | path | string | true     | Unique patient identifier |

> Example responses

> 200 Response

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1
}
```

<h3 id="patientcontroller_remove-responses">Responses</h3>

| Status | Meaning                                                          | Description                   | Schema                          |
| ------ | ---------------------------------------------------------------- | ----------------------------- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Patient deleted successfully. | [PatientDto](#schemapatientdto) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error deleting patient.       | None                            |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## PatientController_findOne

<a id="opIdPatientController_findOne"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /patient/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /patient/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/patient/{id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /patient/{id}`

_Get patient data_

<h3 id="patientcontroller_findone-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description               |
| ---- | ---- | ------ | -------- | ------------------------- |
| id   | path | string | true     | Unique patient identifier |

> Example responses

> 200 Response

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1,
  "weight_unit": "string",
  "height_unit": "string",
  "sessions": [
    {
      "id": "a3f5ad56-2c0b-4efb-b8e9-68c2a4a96b4d",
      "steps_automatic_forward": 100,
      "steps_automatic_backward": 50,
      "steps_intention_forward": 75,
      "steps_intention_backward": 25,
      "flexos_hip": 30,
      "flexos_knee": 45,
      "flexos_ankle": 15,
      "threshold_hipL": 20,
      "threshold_kneeL": 25,
      "threshold_hipR": 20,
      "threshold_kneeR": 25,
      "therapist_dungarees": 8,
      "therapist_effort": 5,
      "d_id": "8e5ac92a-db8f-4c28-aac1-5e4d2b3c5c18",
      "date": "2024-04-26",
      "start": "2024-04-26T08:00:00Z",
      "end": "2024-04-26T09:00:00Z",
      "time_automatic_forward": 10,
      "time_automatic_backward": 5,
      "time_intentiton_forward": 15,
      "time_intention_backward": 10,
      "steps_total": 200,
      "time_total": 60,
      "cadence_automatic_forward": 2,
      "cadence_automatic_backward": 1,
      "cadence_intention_forward": 1.5,
      "cadence_intention_backward": 0.5,
      "chest": 1,
      "evaluation": 7,
      "ingestion_id": "fe338788-8b9a-4666-92b6-dd3b44c5a91d"
    }
  ]
}
```

<h3 id="patientcontroller_findone-responses">Responses</h3>

| Status | Meaning                                                          | Description                             | Schema                            |
| ------ | ---------------------------------------------------------------- | --------------------------------------- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Patient data                            | [PatientView](#schemapatientview) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error retrieving patient.               | None                              |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Patient not found in your organization. | None                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## PatientController_getConfig

<a id="opIdPatientController_getConfig"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /patient/config \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /patient/config HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/patient/config', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /patient/config`

_List all the configuration of the patients_

> Example responses

> 200 Response

```json
[
  {
    "p_id": "123e4567-e89b-12d3-a456-426614174000",
    "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
    "birth_date": "1980-01-01",
    "sex": "M",
    "pathology": ["Diabetes", "Hypertension"],
    "affectation": ["Arthritis"],
    "treatment": ["Insulin", "Metformin"],
    "city": "New York",
    "nationality": "USA",
    "name": "John",
    "surnames": "Doe",
    "phone": "+11234567890",
    "legal_guardian_email_1": "guardian1@example.com",
    "legal_guardian_email_2": "guardian2@example.com",
    "legal_guardian_name_1": "Jane",
    "legal_guardian_name_2": "Jack",
    "weight": 70,
    "height": 175,
    "shoe_size": 42,
    "femur_len_r": 25,
    "femur_len_l": 25,
    "tibia_len_r": 30,
    "tibia_len_l": 30,
    "walker_len": 2,
    "hip_width": 30,
    "chest_size": "M",
    "flexos_hip": 10,
    "flexos_knee": 15,
    "abd": true,
    "version": 1
  }
]
```

<h3 id="patientcontroller_getconfig-responses">Responses</h3>

| Status | Meaning                                                          | Description                | Schema |
| ------ | ---------------------------------------------------------------- | -------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | List of patients           | Inline |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error retrieving patients. | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Patients not found.        | None   |

<h3 id="patientcontroller_getconfig-responseschema">Response Schema</h3>

Status Code **200**

| Name                     | Type                              | Required | Restrictions | Description                                                 |
| ------------------------ | --------------------------------- | -------- | ------------ | ----------------------------------------------------------- |
| _anonymous_              | [[PatientDto](#schemapatientdto)] | false    | none         | none                                                        |
| » p_id                   | string                            | true     | none         | Unique identifier of the patient.                           |
| » o_ids                  | [string]                          | true     | none         | List of organization IDs associated with the patient.       |
| » birth_date             | object                            | true     | none         | Date of birth of the patient.                               |
| » sex                    | string                            | true     | none         | Sex of the patient.                                         |
| » pathology              | [string]                          | true     | none         | List of diagnosed pathologies of the patient.               |
| » affectation            | [string]                          | true     | none         | List of diagnosed conditions of the patient.                |
| » treatment              | [string]                          | true     | none         | List of treatments assigned to the patient.                 |
| » city                   | string                            | true     | none         | City of residence of the patient.                           |
| » nationality            | string                            | true     | none         | Nationality of the patient.                                 |
| » name                   | string                            | true     | none         | First name of the patient.                                  |
| » surnames               | string                            | true     | none         | Surname of the patient.                                     |
| » phone                  | string                            | true     | none         | Phone number of the patient.                                |
| » legal_guardian_email_1 | string                            | true     | none         | Email of the first legal guardian of the patient.           |
| » legal_guardian_email_2 | string                            | false    | none         | Email of the second legal guardian of the patient.          |
| » legal_guardian_name_1  | string                            | false    | none         | First name of the first legal guardian of the patient.      |
| » legal_guardian_name_2  | string                            | false    | none         | First name of the second legal guardian of the patient.     |
| » weight                 | number                            | true     | none         | Weight of the patient in kilograms.                         |
| » height                 | number                            | true     | none         | Height of the patient in centimeters.                       |
| » shoe_size              | number                            | true     | none         | Shoe size of the patient.                                   |
| » femur_len_r            | number                            | true     | none         | Length of the right femur in centimeters.                   |
| » femur_len_l            | number                            | true     | none         | Length of the left femur in centimeters.                    |
| » tibia_len_r            | number                            | true     | none         | Length of the right tibia in centimeters.                   |
| » tibia_len_l            | number                            | true     | none         | Length of the left tibia in centimeters.                    |
| » walker_len             | number                            | true     | none         | Length of the walker in meters, adjustable between 1 and 4. |
| » hip_width              | number                            | true     | none         | Hip width in centimeters.                                   |
| » chest_size             | string                            | true     | none         | Chest size of the patient, either 'M' or 'L'.               |
| » flexos_hip             | number                            | true     | none         | Hip flexion in degrees.                                     |
| » flexos_knee            | number                            | true     | none         | Knee flexion in degrees.                                    |
| » abd                    | boolean                           | true     | none         | Indicates whether the patient has a pronounced abdomen.     |
| » version                | number                            | true     | none         | Version of the record for optimistic concurrency control.   |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| sex         | M     |
| sex         | F     |
| nationality | AD    |
| nationality | AE    |
| nationality | AF    |
| nationality | AG    |
| nationality | AI    |
| nationality | AL    |
| nationality | AM    |
| nationality | AN    |
| nationality | AO    |
| nationality | AQ    |
| nationality | AR    |
| nationality | AS    |
| nationality | AU    |
| nationality | AS    |
| nationality | AW    |
| nationality | AZ    |
| nationality | BA    |
| nationality | BB    |
| nationality | BD    |
| nationality | BE    |
| nationality | BF    |
| nationality | BH    |
| nationality | BI    |
| nationality | BJ    |
| nationality | BM    |
| nationality | BO    |
| nationality | BR    |
| nationality | BS    |
| nationality | BT    |
| nationality | BU    |
| nationality | BV    |
| nationality | BW    |
| nationality | BX    |
| nationality | BY    |
| nationality | BZ    |
| nationality | CA    |
| nationality | CC    |
| nationality | CF    |
| nationality | CG    |
| nationality | CH    |
| nationality | CI    |
| nationality | CK    |
| nationality | CL    |
| nationality | CM    |
| nationality | CN    |
| nationality | CO    |
| nationality | CR    |
| nationality | CU    |
| nationality | CV    |
| nationality | CX    |
| nationality | CY    |
| nationality | CZ    |
| nationality | DE    |
| nationality | DJ    |
| nationality | DK    |
| nationality | DM    |
| nationality | DO    |
| nationality | DZ    |
| nationality | EC    |
| nationality | EE    |
| nationality | EG    |
| nationality | EH    |
| nationality | ER    |
| nationality | ES    |
| nationality | ET    |
| nationality | FI    |
| nationality | FJ    |
| nationality | FK    |
| nationality | FM    |
| nationality | FO    |
| nationality | FR    |
| nationality | GA    |
| nationality | GB    |
| nationality | GD    |
| nationality | GE    |
| nationality | GF    |
| nationality | GH    |
| nationality | GI    |
| nationality | GL    |
| nationality | GM    |
| nationality | GN    |
| nationality | GP    |
| nationality | GQ    |
| nationality | GR    |
| nationality | GS    |
| nationality | GT    |
| nationality | GU    |
| nationality | GW    |
| nationality | GY    |
| nationality | HK    |
| nationality | HM    |
| nationality | HN    |
| nationality | HR    |
| nationality | HT    |
| nationality | HU    |
| nationality | ID    |
| nationality | IE    |
| nationality | IL    |
| nationality | IN    |
| nationality | IO    |
| nationality | IQ    |
| nationality | IR    |
| nationality | IS    |
| nationality | IT    |
| nationality | JM    |
| nationality | JO    |
| nationality | JP    |
| nationality | KE    |
| nationality | KG    |
| nationality | KH    |
| nationality | KI    |
| nationality | KM    |
| nationality | KN    |
| nationality | KP    |
| nationality | KR    |
| nationality | KW    |
| nationality | KY    |
| nationality | KZ    |
| nationality | LA    |
| nationality | LB    |
| nationality | LC    |
| nationality | LI    |
| nationality | LK    |
| nationality | LR    |
| nationality | LS    |
| nationality | LT    |
| nationality | LU    |
| nationality | LV    |
| nationality | LY    |
| nationality | MA    |
| nationality | MC    |
| nationality | MD    |
| nationality | MG    |
| nationality | MH    |
| nationality | MK    |
| nationality | ML    |
| nationality | MM    |
| nationality | MN    |
| nationality | MO    |
| nationality | MP    |
| nationality | MQ    |
| nationality | MR    |
| nationality | MS    |
| nationality | MT    |
| nationality | MU    |
| nationality | MV    |
| nationality | MW    |
| nationality | MX    |
| nationality | MY    |
| nationality | MZ    |
| nationality | NA    |
| nationality | NC    |
| nationality | NE    |
| nationality | NF    |
| nationality | NG    |
| nationality | NI    |
| nationality | NE    |
| nationality | NO    |
| nationality | NP    |
| nationality | NR    |
| nationality | NU    |
| nationality | NZ    |
| nationality | OM    |
| nationality | PA    |
| nationality | PE    |
| nationality | PF    |
| nationality | PG    |
| nationality | PH    |
| nationality | PK    |
| nationality | PO    |
| nationality | PM    |
| nationality | PN    |
| nationality | PR    |
| nationality | PT    |
| nationality | PW    |
| nationality | PY    |
| nationality | QA    |
| nationality | RE    |
| nationality | RO    |
| nationality | RU    |
| nationality | RW    |
| nationality | SA    |
| nationality | SB    |
| nationality | SC    |
| nationality | SD    |
| nationality | SE    |
| nationality | SG    |
| nationality | SH    |
| nationality | SI    |
| nationality | SJ    |
| nationality | SK    |
| nationality | SL    |
| nationality | SM    |
| nationality | SN    |
| nationality | SO    |
| nationality | SR    |
| nationality | ST    |
| nationality | SV    |
| nationality | SY    |
| nationality | SZ    |
| nationality | TC    |
| nationality | TD    |
| nationality | TF    |
| nationality | TG    |
| nationality | TH    |
| nationality | TI    |
| nationality | TK    |
| nationality | TM    |
| nationality | TN    |
| nationality | TO    |
| nationality | TP    |
| nationality | TR    |
| nationality | TT    |
| nationality | TV    |
| nationality | TW    |
| nationality | TZ    |
| nationality | UA    |
| nationality | UG    |
| nationality | UK    |
| nationality | UM    |
| nationality | US    |
| nationality | UY    |
| nationality | UZ    |
| nationality | VA    |
| nationality | VC    |
| nationality | VE    |
| nationality | VG    |
| nationality | VN    |
| nationality | VU    |
| nationality | WF    |
| nationality | WS    |
| nationality | YE    |
| nationality | YT    |
| nationality | YU    |
| nationality | ZA    |
| nationality | ZM    |
| nationality | ZR    |
| nationality | ZW    |
| chest_size  | M     |
| chest_size  | L     |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## PatientController_getSessionsOfPatientBetweenDates

<a id="opIdPatientController_getSessionsOfPatientBetweenDates"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /patient/{id}/session/{start}/{end} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /patient/{id}/session/{start}/{end} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/patient/{id}/session/{start}/{end}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /patient/{id}/session/{start}/{end}`

_Get sessions of a patient between dates_

<h3 id="patientcontroller_getsessionsofpatientbetweendates-parameters">Parameters</h3>

| Name  | In   | Type   | Required | Description               |
| ----- | ---- | ------ | -------- | ------------------------- |
| id    | path | string | true     | Unique patient identifier |
| start | path | string | true     | Start date                |
| end   | path | string | true     | End date                  |

> Example responses

> 200 Response

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1,
  "weight_unit": "string",
  "height_unit": "string",
  "sessions": [
    {
      "id": "a3f5ad56-2c0b-4efb-b8e9-68c2a4a96b4d",
      "steps_automatic_forward": 100,
      "steps_automatic_backward": 50,
      "steps_intention_forward": 75,
      "steps_intention_backward": 25,
      "flexos_hip": 30,
      "flexos_knee": 45,
      "flexos_ankle": 15,
      "threshold_hipL": 20,
      "threshold_kneeL": 25,
      "threshold_hipR": 20,
      "threshold_kneeR": 25,
      "therapist_dungarees": 8,
      "therapist_effort": 5,
      "d_id": "8e5ac92a-db8f-4c28-aac1-5e4d2b3c5c18",
      "date": "2024-04-26",
      "start": "2024-04-26T08:00:00Z",
      "end": "2024-04-26T09:00:00Z",
      "time_automatic_forward": 10,
      "time_automatic_backward": 5,
      "time_intentiton_forward": 15,
      "time_intention_backward": 10,
      "steps_total": 200,
      "time_total": 60,
      "cadence_automatic_forward": 2,
      "cadence_automatic_backward": 1,
      "cadence_intention_forward": 1.5,
      "cadence_intention_backward": 0.5,
      "chest": 1,
      "evaluation": 7,
      "ingestion_id": "fe338788-8b9a-4666-92b6-dd3b44c5a91d"
    }
  ]
}
```

<h3 id="patientcontroller_getsessionsofpatientbetweendates-responses">Responses</h3>

| Status | Meaning                                                          | Description                | Schema                            |
| ------ | ---------------------------------------------------------------- | -------------------------- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | List of sessions           | [PatientView](#schemapatientview) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error retrieving sessions. | None                              |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Sessions not found.        | None                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="marsinet-ingestion">Ingestion</h1>

## IngestionController_uploadFiles

<a id="opIdIngestionController_uploadFiles"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /ingestion/upload \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /ingestion/upload HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/ingestion/upload', {
  method: 'POST',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`POST /ingestion/upload`

_Upload a compressed file with a csv and a json file_

> Example responses

> 200 Response

```json
"string"
```

<h3 id="ingestioncontroller_uploadfiles-responses">Responses</h3>

| Status | Meaning                                                          | Description                                         | Schema |
| ------ | ---------------------------------------------------------------- | --------------------------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Upload a compressed file with a csv and a json file | string |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | File is required.                                   | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## IngestionController_processCsv

<a id="opIdIngestionController_processCsv"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /ingestion/process/{file}/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /ingestion/process/{file}/{id} HTTP/1.1

```

```javascript
const headers = {
  Authorization: 'Bearer {access-token}',
};

fetch('/ingestion/process/{file}/{id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /ingestion/process/{file}/{id}`

_Process the content of the compressed file_

<h3 id="ingestioncontroller_processcsv-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description                    |
| ---- | ---- | ------ | -------- | ------------------------------ |
| file | path | string | true     | The compressed file to process |
| id   | path | any    | true     | The ingestion                  |

<h3 id="ingestioncontroller_processcsv-responses">Responses</h3>

| Status | Meaning                                                          | Description                                | Schema |
| ------ | ---------------------------------------------------------------- | ------------------------------------------ | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Process the content of the compressed file | None   |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | File is required.                          | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Device or Patient not found                | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## IngestionController_findAll

<a id="opIdIngestionController_findAll"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /ingestion \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /ingestion HTTP/1.1

```

```javascript
const headers = {
  Authorization: 'Bearer {access-token}',
};

fetch('/ingestion', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /ingestion`

_Retrieve all ingestions_

<h3 id="ingestioncontroller_findall-parameters">Parameters</h3>

| Name  | In    | Type   | Required | Description                  |
| ----- | ----- | ------ | -------- | ---------------------------- |
| page  | query | string | false    | The page number              |
| limit | query | string | false    | The number of items per page |

<h3 id="ingestioncontroller_findall-responses">Responses</h3>

| Status | Meaning                                                          | Description             | Schema |
| ------ | ---------------------------------------------------------------- | ----------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Retrieve all ingestions | None   |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Page is not a number    | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## IngestionController_findOne

<a id="opIdIngestionController_findOne"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /ingestion/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /ingestion/{id} HTTP/1.1

```

```javascript
const headers = {
  Authorization: 'Bearer {access-token}',
};

fetch('/ingestion/{id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /ingestion/{id}`

_Retrieve an ingestion by ID_

<h3 id="ingestioncontroller_findone-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description                            |
| ---- | ---- | ------ | -------- | -------------------------------------- |
| id   | path | string | true     | The unique identifier of the ingestion |

<h3 id="ingestioncontroller_findone-responses">Responses</h3>

| Status | Meaning                                                          | Description                 | Schema |
| ------ | ---------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Retrieve an ingestion by ID | None   |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Ingestion ID is required    | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## IngestionController_remove

<a id="opIdIngestionController_remove"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /ingestion/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE /ingestion/{id} HTTP/1.1

```

```javascript
const headers = {
  Authorization: 'Bearer {access-token}',
};

fetch('/ingestion/{id}', {
  method: 'DELETE',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`DELETE /ingestion/{id}`

_Delete an ingestion by ID_

<h3 id="ingestioncontroller_remove-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description                            |
| ---- | ---- | ------ | -------- | -------------------------------------- |
| id   | path | string | true     | The unique identifier of the ingestion |

<h3 id="ingestioncontroller_remove-responses">Responses</h3>

| Status | Meaning                                                          | Description               | Schema |
| ------ | ---------------------------------------------------------------- | ------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Delete an ingestion by ID | None   |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Ingestion ID is required  | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## IngestionController_downloadFile

<a id="opIdIngestionController_downloadFile"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /ingestion/download/{name} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /ingestion/download/{name} HTTP/1.1

```

```javascript
const headers = {
  Authorization: 'Bearer {access-token}',
};

fetch('/ingestion/download/{name}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /ingestion/download/{name}`

_Download the file of an ingestion_

<h3 id="ingestioncontroller_downloadfile-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description                      |
| ---- | ---- | ------ | -------- | -------------------------------- |
| name | path | string | true     | The name of the file to download |

<h3 id="ingestioncontroller_downloadfile-responses">Responses</h3>

| Status | Meaning                                                          | Description                       | Schema |
| ------ | ---------------------------------------------------------------- | --------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Download the file of an ingestion | None   |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | File is required                  | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | File not found                    | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="marsinet-myaccount">MyAccount</h1>

## MyAccountController_getData

<a id="opIdMyAccountController_getData"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /my-account \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /my-account HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/my-account', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /my-account`

_Get user account data_

> Example responses

> 200 Response

```json
{
  "user": {
    "email": "user@example.com",
    "user_data": {
      "name": "string",
      "surnames": "string",
      "birth_date": "1990-01-01",
      "nationality": "string",
      "phone": "+1234567890"
    }
  },
  "organization": {},
  "can_edit": true
}
```

<h3 id="myaccountcontroller_getdata-responses">Responses</h3>

| Status | Meaning                                                        | Description            | Schema                        |
| ------ | -------------------------------------------------------------- | ---------------------- | ----------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | User account data      | [MyAccount](#schemamyaccount) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | User account not found | None                          |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## MyAccountController_update

<a id="opIdMyAccountController_update"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /my-account \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /my-account HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "surnames": "string",
  "birth_date": "1990-01-01",
  "nationality": "string",
  "phone": "+1234567890"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/my-account',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /my-account`

_Update user account data_

> Body parameter

```json
{
  "name": "string",
  "surnames": "string",
  "birth_date": "1990-01-01",
  "nationality": "string",
  "phone": "+1234567890"
}
```

<h3 id="myaccountcontroller_update-parameters">Parameters</h3>

| Name | In   | Type                                  | Required | Description         |
| ---- | ---- | ------------------------------------- | -------- | ------------------- |
| body | body | [UserUpdateDto](#schemauserupdatedto) | true     | User data to update |

> Example responses

> 200 Response

```json
{
  "user": {
    "email": "user@example.com",
    "user_data": {
      "name": "string",
      "surnames": "string",
      "birth_date": "1990-01-01",
      "nationality": "string",
      "phone": "+1234567890"
    }
  },
  "organization": {},
  "can_edit": true
}
```

<h3 id="myaccountcontroller_update-responses">Responses</h3>

| Status | Meaning                                                        | Description               | Schema                        |
| ------ | -------------------------------------------------------------- | ------------------------- | ----------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Updated user account data | [MyAccount](#schemamyaccount) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | User account not found    | None                          |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## MyAccountController_getMenu

<a id="opIdMyAccountController_getMenu"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /my-account/menu \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /my-account/menu HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/my-account/menu', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /my-account/menu`

_Get menu of user_

> Example responses

> 200 Response

```json
{
  "menu": [
    {
      "i_class_name": "string",
      "to": "string",
      "translation": "string"
    }
  ],
  "is_active": true,
  "premium": false
}
```

<h3 id="myaccountcontroller_getmenu-responses">Responses</h3>

| Status | Meaning                                                 | Description      | Schema                            |
| ------ | ------------------------------------------------------- | ---------------- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Get menu of user | [GetMenuInfo](#schemagetmenuinfo) |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## MyAccountController_getMyDevices

<a id="opIdMyAccountController_getMyDevices"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /my-account/my-devices \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /my-account/my-devices HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/my-account/my-devices', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /my-account/my-devices`

_Get devices access of user_

> Example responses

> 200 Response

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "model": "Model X",
  "serial": "SN123456789",
  "active": true
}
```

<h3 id="myaccountcontroller_getmydevices-responses">Responses</h3>

| Status | Meaning                                                        | Description                 | Schema                        |
| ------ | -------------------------------------------------------------- | --------------------------- | ----------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Devices access of user      | [MyDevices](#schemamydevices) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | User organization not found | None                          |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## MyAccountController_addDeviceToMyAccount

<a id="opIdMyAccountController_addDeviceToMyAccount"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /my-account/add-device/{device_id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /my-account/add-device/{device_id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/my-account/add-device/{device_id}', {
  method: 'POST',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`POST /my-account/add-device/{device_id}`

_Add device to my account_

<h3 id="myaccountcontroller_adddevicetomyaccount-parameters">Parameters</h3>

| Name      | In   | Type   | Required | Description |
| --------- | ---- | ------ | -------- | ----------- |
| device_id | path | string | true     | Device ID   |

> Example responses

> 200 Response

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "model": "Model X",
  "serial": "SN123456789",
  "active": true
}
```

<h3 id="myaccountcontroller_adddevicetomyaccount-responses">Responses</h3>

| Status | Meaning                                                          | Description                                       | Schema                        |
| ------ | ---------------------------------------------------------------- | ------------------------------------------------- | ----------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Devices access of user                            | [MyDevices](#schemamydevices) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Device is already associated with an organization | None                          |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Device not found                                  | None                          |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## MyAccountController_updateOrganization

<a id="opIdMyAccountController_updateOrganization"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /my-account/update-organization/{organization_id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /my-account/update-organization/{organization_id} HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "street_name": "string",
  "street_number": "string",
  "postal_code": "string",
  "country": "string",
  "state": "string",
  "city": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/my-account/update-organization/{organization_id}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /my-account/update-organization/{organization_id}`

_Update organization_

> Body parameter

```json
{
  "name": "string",
  "street_name": "string",
  "street_number": "string",
  "postal_code": "string",
  "country": "string",
  "state": "string",
  "city": "string"
}
```

<h3 id="myaccountcontroller_updateorganization-parameters">Parameters</h3>

| Name            | In   | Type                                                  | Required | Description |
| --------------- | ---- | ----------------------------------------------------- | -------- | ----------- |
| organization_id | path | string                                                | true     | none        |
| body            | body | [OrganizationUpdateDto](#schemaorganizationupdatedto) | true     | none        |

> Example responses

> 200 Response

```json
{
  "user": {
    "email": "user@example.com",
    "user_data": {
      "name": "string",
      "surnames": "string",
      "birth_date": "1990-01-01",
      "nationality": "string",
      "phone": "+1234567890"
    }
  },
  "organization": {},
  "can_edit": true
}
```

<h3 id="myaccountcontroller_updateorganization-responses">Responses</h3>

| Status | Meaning                                                        | Description                 | Schema                        |
| ------ | -------------------------------------------------------------- | --------------------------- | ----------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Updated organization        | [MyAccount](#schemamyaccount) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | User organization not found | None                          |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="marsinet-devices">Devices</h1>

## DevicesController_create

<a id="opIdDevicesController_create"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /devices \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /devices HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "model": "Model X Pro",
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!",
  "o_id": "123e4567-e89b-12d3-a456-426614174000"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/devices',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /devices`

_Create a new device_

> Body parameter

```json
{
  "model": "Model X Pro",
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!",
  "o_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

<h3 id="devicescontroller_create-parameters">Parameters</h3>

| Name | In   | Type                                      | Required | Description |
| ---- | ---- | ----------------------------------------- | -------- | ----------- |
| body | body | [CreateDeviceDto](#schemacreatedevicedto) | true     | Device data |

> Example responses

> 201 Response

```json
{
  "d_id": "123e4567-e89b-12d3-a456-426614174000",
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!"
}
```

<h3 id="devicescontroller_create-responses">Responses</h3>

| Status | Meaning                                                          | Description            | Schema                            |
| ------ | ---------------------------------------------------------------- | ---------------------- | --------------------------------- |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)     | Device created         | [DeviceTable](#schemadevicetable) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error creating device. | None                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## DevicesController_findAll

<a id="opIdDevicesController_findAll"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /devices \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /devices HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/devices', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /devices`

_Retrieve all devices_

> Example responses

> 200 Response

```json
[
  {
    "d_id": "123e4567-e89b-12d3-a456-426614174000",
    "active": true,
    "serial": "SN123456789",
    "structure_version": "v1.0.0",
    "password": "P@ssw0rd!"
  }
]
```

<h3 id="devicescontroller_findall-responses">Responses</h3>

| Status | Meaning                                                          | Description                       | Schema |
| ------ | ---------------------------------------------------------------- | --------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | List of devices                   | Inline |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error retrieving devices          | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Devices not found in organization | None   |

<h3 id="devicescontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

| Name                | Type                                | Required | Restrictions | Description                                                                      |
| ------------------- | ----------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------- |
| _anonymous_         | [[DeviceTable](#schemadevicetable)] | false    | none         | none                                                                             |
| » d_id              | string                              | true     | none         | Unique identifier of the device.                                                 |
| » active            | boolean                             | true     | none         | Indicates whether the device is currently active.                                |
| » serial            | string                              | true     | none         | Serial number of the device.                                                     |
| » structure_version | string                              | true     | none         | Version of the device structure, indicating hardware or software configurations. |
| » password          | string                              | true     | none         | Password for the device, used for configurations or access.                      |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## DevicesController_findOne

<a id="opIdDevicesController_findOne"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /devices/one/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /devices/one/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/devices/one/{id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /devices/one/{id}`

_Retrieve a device by its ID_

<h3 id="devicescontroller_findone-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description              |
| ---- | ---- | ------ | -------- | ------------------------ |
| id   | path | string | true     | Unique device identifier |

> Example responses

> 200 Response

```json
{
  "d_id": "123e4567-e89b-12d3-a456-426614174000",
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!"
}
```

<h3 id="devicescontroller_findone-responses">Responses</h3>

| Status | Meaning                                                         | Description      | Schema                            |
| ------ | --------------------------------------------------------------- | ---------------- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)         | Device found     | [DeviceTable](#schemadevicetable) |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1) | Unauthorized     | None                              |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)  | Device not found | None                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## DevicesController_update

<a id="opIdDevicesController_update"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /devices/{id}/active \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /devices/{id}/active HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "active": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/devices/{id}/active',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /devices/{id}/active`

_Update the active status of a device_

> Body parameter

```json
{
  "active": true
}
```

<h3 id="devicescontroller_update-parameters">Parameters</h3>

| Name | In   | Type                                                  | Required | Description              |
| ---- | ---- | ----------------------------------------------------- | -------- | ------------------------ |
| id   | path | string                                                | true     | Unique device identifier |
| body | body | [UpdateActiveDeviceDto](#schemaupdateactivedevicedto) | true     | Device active status     |

> Example responses

> 200 Response

```json
{
  "d_id": "123e4567-e89b-12d3-a456-426614174000",
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!"
}
```

<h3 id="devicescontroller_update-responses">Responses</h3>

| Status | Meaning                                                        | Description      | Schema                            |
| ------ | -------------------------------------------------------------- | ---------------- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Device updated   | [DeviceTable](#schemadevicetable) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Device not found | None                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## DevicesController_updateDevice

<a id="opIdDevicesController_updateDevice"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /devices/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /devices/{id} HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "p@ssw0rd",
  "model": "ModelXPro"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/devices/{id}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /devices/{id}`

_Update a device by its ID_

> Body parameter

```json
{
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "p@ssw0rd",
  "model": "ModelXPro"
}
```

<h3 id="devicescontroller_updatedevice-parameters">Parameters</h3>

| Name | In   | Type                                      | Required | Description              |
| ---- | ---- | ----------------------------------------- | -------- | ------------------------ |
| id   | path | string                                    | true     | Unique device identifier |
| body | body | [UpdateDeviceDto](#schemaupdatedevicedto) | true     | Device data              |

> Example responses

> 200 Response

```json
{
  "d_id": "123e4567-e89b-12d3-a456-426614174000",
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!"
}
```

<h3 id="devicescontroller_updatedevice-responses">Responses</h3>

| Status | Meaning                                                        | Description      | Schema                            |
| ------ | -------------------------------------------------------------- | ---------------- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Device updated   | [DeviceTable](#schemadevicetable) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Device not found | None                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## DevicesController_remove

<a id="opIdDevicesController_remove"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /devices/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE /devices/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/devices/{id}', {
  method: 'DELETE',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`DELETE /devices/{id}`

_Delete a device by its ID and all relations with the organizations that it belongs_

<h3 id="devicescontroller_remove-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description              |
| ---- | ---- | ------ | -------- | ------------------------ |
| id   | path | string | true     | Unique device identifier |

> Example responses

> 200 Response

```json
{
  "d_id": "123e4567-e89b-12d3-a456-426614174000",
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!"
}
```

<h3 id="devicescontroller_remove-responses">Responses</h3>

| Status | Meaning                                                        | Description      | Schema                            |
| ------ | -------------------------------------------------------------- | ---------------- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Device deleted   | [DeviceTable](#schemadevicetable) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Device not found | None                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## DevicesController_removeDeviceFromOrganizations

<a id="opIdDevicesController_removeDeviceFromOrganizations"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /devices/all/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE /devices/all/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/devices/all/{id}', {
  method: 'DELETE',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`DELETE /devices/all/{id}`

_Delete all devices from an organization_

<h3 id="devicescontroller_removedevicefromorganizations-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description              |
| ---- | ---- | ------ | -------- | ------------------------ |
| id   | path | string | true     | Unique device identifier |

> Example responses

> 200 Response

```json
[
  {
    "d_id": "123e4567-e89b-12d3-a456-426614174000",
    "active": true,
    "serial": "SN123456789",
    "structure_version": "v1.0.0",
    "password": "P@ssw0rd!"
  }
]
```

<h3 id="devicescontroller_removedevicefromorganizations-responses">Responses</h3>

| Status | Meaning                                                        | Description      | Schema |
| ------ | -------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Devices deleted  | Inline |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Device not found | None   |

<h3 id="devicescontroller_removedevicefromorganizations-responseschema">Response Schema</h3>

Status Code **200**

| Name                | Type                                | Required | Restrictions | Description                                                                      |
| ------------------- | ----------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------- |
| _anonymous_         | [[DeviceTable](#schemadevicetable)] | false    | none         | none                                                                             |
| » d_id              | string                              | true     | none         | Unique identifier of the device.                                                 |
| » active            | boolean                             | true     | none         | Indicates whether the device is currently active.                                |
| » serial            | string                              | true     | none         | Serial number of the device.                                                     |
| » structure_version | string                              | true     | none         | Version of the device structure, indicating hardware or software configurations. |
| » password          | string                              | true     | none         | Password for the device, used for configurations or access.                      |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## DevicesController_findAllOrganizations

<a id="opIdDevicesController_findAllOrganizations"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /devices/organizations/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /devices/organizations/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/devices/organizations/{id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /devices/organizations/{id}`

_Retrieve all organizations for a given device_

<h3 id="devicescontroller_findallorganizations-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description              |
| ---- | ---- | ------ | -------- | ------------------------ |
| id   | path | string | true     | Unique device identifier |

> Example responses

> 200 Response

```json
[
  {
    "d_id": "123e4567-e89b-12d3-a456-426614174000",
    "active": true,
    "serial": "SN123456789",
    "structure_version": "v1.0.0",
    "password": "P@ssw0rd!"
  }
]
```

<h3 id="devicescontroller_findallorganizations-responses">Responses</h3>

| Status | Meaning                                                          | Description                    | Schema |
| ------ | ---------------------------------------------------------------- | ------------------------------ | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | List of organizations          | Inline |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error retrieving organizations | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Device not found               | None   |

<h3 id="devicescontroller_findallorganizations-responseschema">Response Schema</h3>

Status Code **200**

| Name                | Type                                | Required | Restrictions | Description                                                                      |
| ------------------- | ----------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------- |
| _anonymous_         | [[DeviceTable](#schemadevicetable)] | false    | none         | none                                                                             |
| » d_id              | string                              | true     | none         | Unique identifier of the device.                                                 |
| » active            | boolean                             | true     | none         | Indicates whether the device is currently active.                                |
| » serial            | string                              | true     | none         | Serial number of the device.                                                     |
| » structure_version | string                              | true     | none         | Version of the device structure, indicating hardware or software configurations. |
| » password          | string                              | true     | none         | Password for the device, used for configurations or access.                      |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## DevicesController_addDeviceToOrganization

<a id="opIdDevicesController_addDeviceToOrganization"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /devices/add-device-to-organization/{device_id}/{organization_id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /devices/add-device-to-organization/{device_id}/{organization_id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/devices/add-device-to-organization/{device_id}/{organization_id}', {
  method: 'POST',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`POST /devices/add-device-to-organization/{device_id}/{organization_id}`

_Add a device to an organization_

<h3 id="devicescontroller_adddevicetoorganization-parameters">Parameters</h3>

| Name            | In   | Type   | Required | Description     |
| --------------- | ---- | ------ | -------- | --------------- |
| device_id       | path | string | true     | Device ID       |
| organization_id | path | string | true     | Organization ID |

> Example responses

> 201 Response

```json
{
  "d_id": "123e4567-e89b-12d3-a456-426614174000",
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!"
}
```

<h3 id="devicescontroller_adddevicetoorganization-responses">Responses</h3>

| Status | Meaning                                                         | Description                      | Schema                            |
| ------ | --------------------------------------------------------------- | -------------------------------- | --------------------------------- |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)    | Device added to organization     | [DeviceTable](#schemadevicetable) |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1) | Unauthorized                     | None                              |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)  | Device or organization not found | None                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## DevicesController_removeDeviceFromOrganization

<a id="opIdDevicesController_removeDeviceFromOrganization"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /devices/remove-device-from-organization/{device_id}/{organization_id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE /devices/remove-device-from-organization/{device_id}/{organization_id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/devices/remove-device-from-organization/{device_id}/{organization_id}', {
  method: 'DELETE',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`DELETE /devices/remove-device-from-organization/{device_id}/{organization_id}`

_Remove a device from an organization_

<h3 id="devicescontroller_removedevicefromorganization-parameters">Parameters</h3>

| Name            | In   | Type   | Required | Description     |
| --------------- | ---- | ------ | -------- | --------------- |
| device_id       | path | string | true     | Device ID       |
| organization_id | path | string | true     | Organization ID |

> Example responses

> 200 Response

```json
{
  "d_id": "123e4567-e89b-12d3-a456-426614174000",
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!"
}
```

<h3 id="devicescontroller_removedevicefromorganization-responses">Responses</h3>

| Status | Meaning                                                          | Description                                     | Schema                            |
| ------ | ---------------------------------------------------------------- | ----------------------------------------------- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Device removed from organization                | [DeviceTable](#schemadevicetable) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Device is not associated with this organization | None                              |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)  | Unauthorized                                    | None                              |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Device or organization not found                | None                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="marsinet-users">Users</h1>

## UsersController_findAll

<a id="opIdUsersController_findAll"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /users \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /users HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/users', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /users`

_Retrieves all users_

> Example responses

> 200 Response

```json
{
  "can_create_organization": true,
  "users": [
    {
      "u_id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John",
      "surnames": "Doe",
      "email": "john.doe@example.com",
      "o_id": "456e4577-e89b-12d3-a456-426655440000",
      "is_admin": true,
      "role": "manager",
      "active": true
    }
  ]
}
```

<h3 id="userscontroller_findall-responses">Responses</h3>

| Status | Meaning                                                        | Description                                         | Schema                        |
| ------ | -------------------------------------------------------------- | --------------------------------------------------- | ----------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | List of users and organization creation permissions | [UsersView](#schemausersview) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Organization not found                              | None                          |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## UsersController_toggleActiveUser

<a id="opIdUsersController_toggleActiveUser"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /users/active \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /users/active HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "u_id": "10689150-8feb-43c7-b67a-b1742f9ba6a9",
  "active": true,
  "o_id": "771da566-6a45-46f4-aab5-a21ecd7d3226"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/users/active',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /users/active`

_Toggles the active status of a user_

> Body parameter

```json
{
  "u_id": "10689150-8feb-43c7-b67a-b1742f9ba6a9",
  "active": true,
  "o_id": "771da566-6a45-46f4-aab5-a21ecd7d3226"
}
```

<h3 id="userscontroller_toggleactiveuser-parameters">Parameters</h3>

| Name | In   | Type                                              | Required | Description             |
| ---- | ---- | ------------------------------------------------- | -------- | ----------------------- |
| body | body | [ToggleUserActiveDto](#schematoggleuseractivedto) | true     | User active status data |

<h3 id="userscontroller_toggleactiveuser-responses">Responses</h3>

| Status | Meaning                                                 | Description                | Schema |
| ------ | ------------------------------------------------------- | -------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User active status updated | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## UsersController_getOrganization

<a id="opIdUsersController_getOrganization"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /users/organizations/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /users/organizations/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/users/organizations/{id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /users/organizations/{id}`

_Retrieves organization information_

<h3 id="userscontroller_getorganization-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description       |
| ---- | ---- | ------ | -------- | ----------------- |
| id   | path | string | true     | Organization UUID |

> Example responses

> 200 Response

```json
{
  "o_id": "456e8977-e89b-12d3-a456-426614174000",
  "name": "Doe Enterprises",
  "street_name": "Main Street",
  "street_number": "100A",
  "postal_code": "A1A 1A1",
  "country": "Canada",
  "city": "Ottawa",
  "role": "admin",
  "premium": true
}
```

<h3 id="userscontroller_getorganization-responses">Responses</h3>

| Status | Meaning                                                        | Description            | Schema                              |
| ------ | -------------------------------------------------------------- | ---------------------- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Organization data      | [Organization](#schemaorganization) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Organization not found | None                                |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="marsinet-admin">Admin</h1>

## AdminController_allOrganizations

<a id="opIdAdminController_allOrganizations"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /admin/organizations \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /admin/organizations HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/admin/organizations', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /admin/organizations`

_Retrieves all organizations_

> Example responses

> 200 Response

```json
[
  {
    "o_id": "456e8977-e89b-12d3-a456-426614174000",
    "name": "Doe Enterprises",
    "street_name": "Main Street",
    "street_number": "100A",
    "postal_code": "A1A 1A1",
    "country": "Canada",
    "city": "Ottawa",
    "role": "admin",
    "premium": true
  }
]
```

<h3 id="admincontroller_allorganizations-responses">Responses</h3>

| Status | Meaning                                                 | Description           | Schema |
| ------ | ------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List of organizations | Inline |

<h3 id="admincontroller_allorganizations-responseschema">Response Schema</h3>

Status Code **200**

| Name            | Type                                  | Required | Restrictions | Description                                              |
| --------------- | ------------------------------------- | -------- | ------------ | -------------------------------------------------------- |
| _anonymous_     | [[Organization](#schemaorganization)] | false    | none         | none                                                     |
| » o_id          | string                                | true     | none         | Unique identifier for the organization                   |
| » name          | string                                | true     | none         | Name of the organization                                 |
| » street_name   | string                                | true     | none         | Street name of the organization address                  |
| » street_number | string                                | true     | none         | Street number of the organization address                |
| » postal_code   | string                                | true     | none         | Postal code of the organization address                  |
| » country       | string                                | true     | none         | Country where the organization is located                |
| » city          | string                                | true     | none         | City where the organization is located                   |
| » role          | string                                | true     | none         | Role of the organization in the context of the service   |
| » premium       | boolean                               | true     | none         | Whether the organization is subscribed to a premium plan |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_createOrganization

<a id="opIdAdminController_createOrganization"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /admin/organizations/create \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /admin/organizations/create HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name_organization": "Doe Enterprises",
  "city": "New York",
  "country": "USA",
  "role": "admin",
  "postal_code": "10001",
  "street_name": "5th Avenue",
  "street_number": "789"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/admin/organizations/create',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /admin/organizations/create`

_Creates a new organization_

> Body parameter

```json
{
  "name_organization": "Doe Enterprises",
  "city": "New York",
  "country": "USA",
  "role": "admin",
  "postal_code": "10001",
  "street_name": "5th Avenue",
  "street_number": "789"
}
```

<h3 id="admincontroller_createorganization-parameters">Parameters</h3>

| Name | In   | Type                                            | Required | Description       |
| ---- | ---- | ----------------------------------------------- | -------- | ----------------- |
| body | body | [CreateOrganization](#schemacreateorganization) | true     | Organization data |

> Example responses

> 201 Response

```json
{
  "name_organization": "Doe Enterprises",
  "city": "New York",
  "country": "USA",
  "role": "admin",
  "postal_code": "10001",
  "street_name": "5th Avenue",
  "street_number": "789"
}
```

<h3 id="admincontroller_createorganization-responses">Responses</h3>

| Status | Meaning                                                          | Description                 | Schema                                          |
| ------ | ---------------------------------------------------------------- | --------------------------- | ----------------------------------------------- |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)     | Organization created        | [CreateOrganization](#schemacreateorganization) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error creating organization | None                                            |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Organization not found      | None                                            |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_updateOrganization

<a id="opIdAdminController_updateOrganization"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /admin/organization/{organization_id}/update \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /admin/organization/{organization_id}/update HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "Doe Enterprises",
  "city": "New York",
  "country": "USA",
  "postal_code": "10001",
  "street_name": "5th Avenue",
  "street_number": "789",
  "state": "NY"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/admin/organization/{organization_id}/update',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /admin/organization/{organization_id}/update`

_Updates an organization_

> Body parameter

```json
{
  "name": "Doe Enterprises",
  "city": "New York",
  "country": "USA",
  "postal_code": "10001",
  "street_name": "5th Avenue",
  "street_number": "789",
  "state": "NY"
}
```

<h3 id="admincontroller_updateorganization-parameters">Parameters</h3>

| Name            | In   | Type                                                  | Required | Description       |
| --------------- | ---- | ----------------------------------------------------- | -------- | ----------------- |
| organization_id | path | string                                                | true     | Organization ID   |
| body            | body | [UpdateOrganizationDto](#schemaupdateorganizationdto) | true     | Organization data |

> Example responses

> 200 Response

```json
{
  "o_id": "456e8977-e89b-12d3-a456-426614174000",
  "name": "Doe Enterprises",
  "street_name": "Main Street",
  "street_number": "100A",
  "postal_code": "A1A 1A1",
  "country": "Canada",
  "city": "Ottawa",
  "role": "admin",
  "premium": true
}
```

<h3 id="admincontroller_updateorganization-responses">Responses</h3>

| Status | Meaning                                                          | Description                 | Schema                              |
| ------ | ---------------------------------------------------------------- | --------------------------- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Organization updated        | [Organization](#schemaorganization) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error updating organization | None                                |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Organization not found      | None                                |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_organizationTogglePremium

<a id="opIdAdminController_organizationTogglePremium"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /admin/organization/{organization_id}/toggle-premium \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /admin/organization/{organization_id}/toggle-premium HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/admin/organization/{organization_id}/toggle-premium', {
  method: 'POST',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`POST /admin/organization/{organization_id}/toggle-premium`

_Toggles the premium status of an organization_

<h3 id="admincontroller_organizationtogglepremium-parameters">Parameters</h3>

| Name            | In   | Type   | Required | Description     |
| --------------- | ---- | ------ | -------- | --------------- |
| organization_id | path | string | true     | Organization ID |

> Example responses

> 200 Response

```json
{
  "o_id": "456e8977-e89b-12d3-a456-426614174000",
  "name": "Doe Enterprises",
  "street_name": "Main Street",
  "street_number": "100A",
  "postal_code": "A1A 1A1",
  "country": "Canada",
  "city": "Ottawa",
  "role": "admin",
  "premium": true
}
```

<h3 id="admincontroller_organizationtogglepremium-responses">Responses</h3>

| Status | Meaning                                                          | Description                         | Schema                              |
| ------ | ---------------------------------------------------------------- | ----------------------------------- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Organization premium status toggled | [Organization](#schemaorganization) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error toggling premium status       | None                                |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Organization not found              | None                                |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_findAllDevicesOfOrganization

<a id="opIdAdminController_findAllDevicesOfOrganization"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /admin/organization/{organization_id}/devices \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /admin/organization/{organization_id}/devices HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/admin/organization/{organization_id}/devices', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /admin/organization/{organization_id}/devices`

_Retrieves all devices of an organization_

<h3 id="admincontroller_findalldevicesoforganization-parameters">Parameters</h3>

| Name            | In   | Type   | Required | Description     |
| --------------- | ---- | ------ | -------- | --------------- |
| organization_id | path | string | true     | Organization ID |

> Example responses

> 200 Response

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "type": "sensor",
    "serial": "SN-001"
  }
]
```

<h3 id="admincontroller_findalldevicesoforganization-responses">Responses</h3>

| Status | Meaning                                                          | Description                      | Schema |
| ------ | ---------------------------------------------------------------- | -------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | List of devices of organizations | Inline |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error retrieving devices         | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Organization not found           | None   |

<h3 id="admincontroller_findalldevicesoforganization-responseschema">Response Schema</h3>

Status Code **200**

| Name        | Type                                                    | Required | Restrictions | Description                         |
| ----------- | ------------------------------------------------------- | -------- | ------------ | ----------------------------------- |
| _anonymous_ | [[DevicesOfOrganization](#schemadevicesoforganization)] | false    | none         | none                                |
| » id        | string                                                  | true     | none         | Identificador único del dispositivo |
| » type      | string                                                  | true     | none         | Tipo de dispositivo                 |
| » serial    | string                                                  | true     | none         | Número de serie del dispositivo     |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_findOneOrganization

<a id="opIdAdminController_findOneOrganization"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /admin/organization/{organization_id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /admin/organization/{organization_id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/admin/organization/{organization_id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /admin/organization/{organization_id}`

_Retrieves a single organization_

<h3 id="admincontroller_findoneorganization-parameters">Parameters</h3>

| Name            | In   | Type   | Required | Description     |
| --------------- | ---- | ------ | -------- | --------------- |
| organization_id | path | string | true     | Organization ID |

> Example responses

> 200 Response

```json
{
  "o_id": "456e8977-e89b-12d3-a456-426614174000",
  "name": "Doe Enterprises",
  "street_name": "Main Street",
  "street_number": "100A",
  "postal_code": "A1A 1A1",
  "country": "Canada",
  "city": "Ottawa",
  "role": "admin",
  "premium": true
}
```

<h3 id="admincontroller_findoneorganization-responses">Responses</h3>

| Status | Meaning                                                          | Description                   | Schema                              |
| ------ | ---------------------------------------------------------------- | ----------------------------- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Organization data             | [Organization](#schemaorganization) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error retrieving organization | None                                |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Organization not found        | None                                |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_deleteOrganization

<a id="opIdAdminController_deleteOrganization"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /admin/organization/{organization_id}/delete \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE /admin/organization/{organization_id}/delete HTTP/1.1

```

```javascript
const headers = {
  Authorization: 'Bearer {access-token}',
};

fetch('/admin/organization/{organization_id}/delete', {
  method: 'DELETE',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`DELETE /admin/organization/{organization_id}/delete`

_Deletes an organization_

<h3 id="admincontroller_deleteorganization-parameters">Parameters</h3>

| Name            | In   | Type   | Required | Description     |
| --------------- | ---- | ------ | -------- | --------------- |
| organization_id | path | string | true     | Organization ID |

<h3 id="admincontroller_deleteorganization-responses">Responses</h3>

| Status | Meaning                                                          | Description                 | Schema |
| ------ | ---------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Organization deleted        | None   |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error deleting organization | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Organization not found      | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_findOneUser

<a id="opIdAdminController_findOneUser"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /admin/users/{user_id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /admin/users/{user_id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/admin/users/{user_id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /admin/users/{user_id}`

_Retrieves a single user_

<h3 id="admincontroller_findoneuser-parameters">Parameters</h3>

| Name    | In   | Type   | Required | Description |
| ------- | ---- | ------ | -------- | ----------- |
| user_id | path | string | true     | User ID     |

> Example responses

> 200 Response

```json
{
  "can_create_organization": true,
  "users": [
    {
      "u_id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John",
      "surnames": "Doe",
      "email": "john.doe@example.com",
      "o_id": "456e4577-e89b-12d3-a456-426655440000",
      "is_admin": true,
      "role": "manager",
      "active": true
    }
  ]
}
```

<h3 id="admincontroller_findoneuser-responses">Responses</h3>

| Status | Meaning                                                          | Description           | Schema                        |
| ------ | ---------------------------------------------------------------- | --------------------- | ----------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | User data             | [UsersView](#schemausersview) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error retrieving user | None                          |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | User not found        | None                          |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_updateUserData

<a id="opIdAdminController_updateUserData"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /admin/users/update/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /admin/users/update/{id} HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "can_create_organization": true,
  "users": [
    {
      "u_id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John",
      "surnames": "Doe",
      "email": "john.doe@example.com",
      "o_id": "456e4577-e89b-12d3-a456-426655440000",
      "is_admin": true,
      "role": "manager",
      "active": true
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/admin/users/update/{id}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /admin/users/update/{id}`

_Updates a user_

> Body parameter

```json
{
  "can_create_organization": true,
  "users": [
    {
      "u_id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John",
      "surnames": "Doe",
      "email": "john.doe@example.com",
      "o_id": "456e4577-e89b-12d3-a456-426655440000",
      "is_admin": true,
      "role": "manager",
      "active": true
    }
  ]
}
```

<h3 id="admincontroller_updateuserdata-parameters">Parameters</h3>

| Name | In   | Type                          | Required | Description |
| ---- | ---- | ----------------------------- | -------- | ----------- |
| id   | path | string                        | true     | User ID     |
| body | body | [UsersView](#schemausersview) | true     | User data   |

> Example responses

> 200 Response

```json
true
```

<h3 id="admincontroller_updateuserdata-responses">Responses</h3>

| Status | Meaning                                                          | Description         | Schema  |
| ------ | ---------------------------------------------------------------- | ------------------- | ------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | User data updated   | boolean |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error updating user | None    |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | User not found      | None    |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_createUser

<a id="opIdAdminController_createUser"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /admin/users/create \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /admin/users/create HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "Jane",
  "surnames": "Doe",
  "email": "jane.doe@example.com",
  "password": "SecurePassword123!",
  "phone": "+1234567890",
  "birth_date": "1990-01-01",
  "nationality": "Canadian",
  "organization_id": "123e4567-e89b-12d3-a456-426614174000"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/admin/users/create',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /admin/users/create`

_Creates a new user_

> Body parameter

```json
{
  "name": "Jane",
  "surnames": "Doe",
  "email": "jane.doe@example.com",
  "password": "SecurePassword123!",
  "phone": "+1234567890",
  "birth_date": "1990-01-01",
  "nationality": "Canadian",
  "organization_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

<h3 id="admincontroller_createuser-parameters">Parameters</h3>

| Name | In   | Type                            | Required | Description |
| ---- | ---- | ------------------------------- | -------- | ----------- |
| body | body | [CreateUser](#schemacreateuser) | true     | User data   |

> Example responses

> 201 Response

```json
true
```

<h3 id="admincontroller_createuser-responses">Responses</h3>

| Status | Meaning                                                          | Description            | Schema  |
| ------ | ---------------------------------------------------------------- | ---------------------- | ------- |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)     | User created           | boolean |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error creating user    | None    |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Organization not found | None    |
| 409    | [Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)    | User already exists    | None    |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## AdminController_deleteUser

<a id="opIdAdminController_deleteUser"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /admin/users/delete/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE /admin/users/delete/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer {access-token}',
};

fetch('/admin/users/delete/{id}', {
  method: 'DELETE',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`DELETE /admin/users/delete/{id}`

_Deletes a user_

<h3 id="admincontroller_deleteuser-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description |
| ---- | ---- | ------ | -------- | ----------- |
| id   | path | string | true     | User ID     |

> Example responses

> 200 Response

```json
true
```

<h3 id="admincontroller_deleteuser-responses">Responses</h3>

| Status | Meaning                                                          | Description         | Schema  |
| ------ | ---------------------------------------------------------------- | ------------------- | ------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | User deleted        | boolean |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Error deleting user | None    |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | User not found      | None    |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="marsinet-alarm">Alarm</h1>

## AlarmController_findAll

<a id="opIdAlarmController_findAll"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /alarm \
  -H 'Accept: application/json'

```

```http
GET /alarm HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
};

fetch('/alarm', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /alarm`

_Retrieves all alarms_

> Example responses

> 200 Response

```json
[
  {
    "event_type": "string",
    "event_id": "string",
    "value": 0,
    "timestamp": {},
    "params": {},
    "version": "string"
  }
]
```

<h3 id="alarmcontroller_findall-responses">Responses</h3>

| Status | Meaning                                                         | Description        | Schema |
| ------ | --------------------------------------------------------------- | ------------------ | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)         | List of all alarms | Inline |
| 204    | [No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5) | No alarms found    | None   |

<h3 id="alarmcontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

| Name         | Type                    | Required | Restrictions | Description |
| ------------ | ----------------------- | -------- | ------------ | ----------- |
| _anonymous_  | [[Alarm](#schemaalarm)] | false    | none         | none        |
| » event_type | string                  | true     | none         | none        |
| » event_id   | string                  | true     | none         | none        |
| » value      | number                  | true     | none         | none        |
| » timestamp  | object                  | true     | none         | none        |
| » params     | object                  | true     | none         | none        |
| » version    | string                  | true     | none         | none        |

<aside class="success">
This operation does not require authentication
</aside>

## AlarmController_createAlarm

<a id="opIdAlarmController_createAlarm"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /alarm \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /alarm HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "event_type": "string",
  "event_id": "string",
  "value": 0,
  "timestamp": {},
  "params": {},
  "version": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/alarm',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /alarm`

_Create a new alarm_

> Body parameter

```json
{
  "event_type": "string",
  "event_id": "string",
  "value": 0,
  "timestamp": {},
  "params": {},
  "version": "string"
}
```

<h3 id="alarmcontroller_createalarm-parameters">Parameters</h3>

| Name | In   | Type                  | Required | Description |
| ---- | ---- | --------------------- | -------- | ----------- |
| body | body | [Alarm](#schemaalarm) | true     | Alarm data  |

> Example responses

> 201 Response

```json
{
  "event_type": "string",
  "event_id": "string",
  "value": 0,
  "timestamp": {},
  "params": {},
  "version": "string"
}
```

<h3 id="alarmcontroller_createalarm-responses">Responses</h3>

| Status | Meaning                                                          | Description                | Schema                |
| ------ | ---------------------------------------------------------------- | -------------------------- | --------------------- |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)     | Alarm created successfully | [Alarm](#schemaalarm) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Invalid alarm data         | None                  |

<aside class="success">
This operation does not require authentication
</aside>

## AlarmController_findAllAlarmOfSession

<a id="opIdAlarmController_findAllAlarmOfSession"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /alarm/of-session/{session_id} \
  -H 'Accept: application/json'

```

```http
GET /alarm/of-session/{session_id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
};

fetch('/alarm/of-session/{session_id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /alarm/of-session/{session_id}`

_Retrieves all alarms for a specific session_

<h3 id="alarmcontroller_findallalarmofsession-parameters">Parameters</h3>

| Name       | In   | Type   | Required | Description               |
| ---------- | ---- | ------ | -------- | ------------------------- |
| session_id | path | string | true     | Unique session identifier |

> Example responses

> 200 Response

```json
[
  {
    "event_type": "string",
    "event_id": "string",
    "value": 0,
    "timestamp": {},
    "params": {},
    "version": "string"
  }
]
```

<h3 id="alarmcontroller_findallalarmofsession-responses">Responses</h3>

| Status | Meaning                                                        | Description                              | Schema |
| ------ | -------------------------------------------------------------- | ---------------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | List of alarms for the specified session | Inline |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Session not found                        | None   |

<h3 id="alarmcontroller_findallalarmofsession-responseschema">Response Schema</h3>

Status Code **200**

| Name         | Type                    | Required | Restrictions | Description |
| ------------ | ----------------------- | -------- | ------------ | ----------- |
| _anonymous_  | [[Alarm](#schemaalarm)] | false    | none         | none        |
| » event_type | string                  | true     | none         | none        |
| » event_id   | string                  | true     | none         | none        |
| » value      | number                  | true     | none         | none        |
| » timestamp  | object                  | true     | none         | none        |
| » params     | object                  | true     | none         | none        |
| » version    | string                  | true     | none         | none        |

<aside class="success">
This operation does not require authentication
</aside>

## AlarmController_findAllAlarmOfDevice

<a id="opIdAlarmController_findAllAlarmOfDevice"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /alarm/of-device/{device_id} \
  -H 'Accept: application/json'

```

```http
GET /alarm/of-device/{device_id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
};

fetch('/alarm/of-device/{device_id}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /alarm/of-device/{device_id}`

_Retrieves all alarms for a specific device_

<h3 id="alarmcontroller_findallalarmofdevice-parameters">Parameters</h3>

| Name      | In   | Type   | Required | Description              |
| --------- | ---- | ------ | -------- | ------------------------ |
| device_id | path | string | true     | Unique device identifier |

> Example responses

> 200 Response

```json
[
  {
    "event_type": "string",
    "event_id": "string",
    "value": 0,
    "timestamp": {},
    "params": {},
    "version": "string"
  }
]
```

<h3 id="alarmcontroller_findallalarmofdevice-responses">Responses</h3>

| Status | Meaning                                                        | Description                             | Schema |
| ------ | -------------------------------------------------------------- | --------------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | List of alarms for the specified device | Inline |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Device not found                        | None   |

<h3 id="alarmcontroller_findallalarmofdevice-responseschema">Response Schema</h3>

Status Code **200**

| Name         | Type                    | Required | Restrictions | Description |
| ------------ | ----------------------- | -------- | ------------ | ----------- |
| _anonymous_  | [[Alarm](#schemaalarm)] | false    | none         | none        |
| » event_type | string                  | true     | none         | none        |
| » event_id   | string                  | true     | none         | none        |
| » value      | number                  | true     | none         | none        |
| » timestamp  | object                  | true     | none         | none        |
| » params     | object                  | true     | none         | none        |
| » version    | string                  | true     | none         | none        |

<aside class="success">
This operation does not require authentication
</aside>

## AlarmController_updateAlarm

<a id="opIdAlarmController_updateAlarm"></a>

> Code samples

```shell
# You can also use wget
curl -X PATCH /alarm/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /alarm/{id} HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "event_type": "string",
  "event_id": "string",
  "value": 0,
  "timestamp": {},
  "params": {},
  "version": "string",
  "i_id": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/alarm/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /alarm/{id}`

_Update an alarm by ID_

> Body parameter

```json
{
  "event_type": "string",
  "event_id": "string",
  "value": 0,
  "timestamp": {},
  "params": {},
  "version": "string",
  "i_id": "string"
}
```

<h3 id="alarmcontroller_updatealarm-parameters">Parameters</h3>

| Name | In   | Type                              | Required | Description             |
| ---- | ---- | --------------------------------- | -------- | ----------------------- |
| id   | path | string                            | true     | Unique alarm identifier |
| body | body | [UpdateAlarm](#schemaupdatealarm) | true     | Updated alarm data      |

> Example responses

> 200 Response

```json
{
  "event_type": "string",
  "event_id": "string",
  "value": 0,
  "timestamp": {},
  "params": {},
  "version": "string"
}
```

<h3 id="alarmcontroller_updatealarm-responses">Responses</h3>

| Status | Meaning                                                          | Description                | Schema                |
| ------ | ---------------------------------------------------------------- | -------------------------- | --------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Alarm updated successfully | [Alarm](#schemaalarm) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Invalid alarm data         | None                  |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Alarm not found            | None                  |

<aside class="success">
This operation does not require authentication
</aside>

## AlarmController_deleteAlarm

<a id="opIdAlarmController_deleteAlarm"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /alarm/{id} \
  -H 'Accept: application/json'

```

```http
DELETE /alarm/{id} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
};

fetch('/alarm/{id}', {
  method: 'DELETE',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`DELETE /alarm/{id}`

_Delete an alarm by ID_

<h3 id="alarmcontroller_deletealarm-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description             |
| ---- | ---- | ------ | -------- | ----------------------- |
| id   | path | string | true     | Unique alarm identifier |

> Example responses

> 200 Response

```json
{
  "event_type": "string",
  "event_id": "string",
  "value": 0,
  "timestamp": {},
  "params": {},
  "version": "string"
}
```

<h3 id="alarmcontroller_deletealarm-responses">Responses</h3>

| Status | Meaning                                                        | Description                | Schema                |
| ------ | -------------------------------------------------------------- | -------------------------- | --------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)        | Alarm deleted successfully | [Alarm](#schemaalarm) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | Alarm not found            | None                  |

<aside class="success">
This operation does not require authentication
</aside>

## AlarmController_getAlarmsOfDeviceBetweenDates

<a id="opIdAlarmController_getAlarmsOfDeviceBetweenDates"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /alarm/{id}/device/{start}/{end} \
  -H 'Accept: application/json'

```

```http
GET /alarm/{id}/device/{start}/{end} HTTP/1.1

Accept: application/json

```

```javascript
const headers = {
  Accept: 'application/json',
};

fetch('/alarm/{id}/device/{start}/{end}', {
  method: 'GET',

  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

`GET /alarm/{id}/device/{start}/{end}`

_Get alarms of a device between two dates_

<h3 id="alarmcontroller_getalarmsofdevicebetweendates-parameters">Parameters</h3>

| Name  | In   | Type   | Required | Description              |
| ----- | ---- | ------ | -------- | ------------------------ |
| id    | path | string | true     | Unique device identifier |
| start | path | string | true     | Start date               |
| end   | path | string | true     | End date                 |

> Example responses

> 200 Response

```json
[
  {
    "event_type": "string",
    "event_id": "string",
    "value": 0,
    "timestamp": {},
    "params": {},
    "version": "string"
  }
]
```

<h3 id="alarmcontroller_getalarmsofdevicebetweendates-responses">Responses</h3>

| Status | Meaning                                                          | Description                                                         | Schema |
| ------ | ---------------------------------------------------------------- | ------------------------------------------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | List of alarms for the specified device between the specified dates | Inline |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Invalid date range                                                  | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | Device not found                                                    | None   |

<h3 id="alarmcontroller_getalarmsofdevicebetweendates-responseschema">Response Schema</h3>

Status Code **200**

| Name         | Type                    | Required | Restrictions | Description |
| ------------ | ----------------------- | -------- | ------------ | ----------- |
| _anonymous_  | [[Alarm](#schemaalarm)] | false    | none         | none        |
| » event_type | string                  | true     | none         | none        |
| » event_id   | string                  | true     | none         | none        |
| » value      | number                  | true     | none         | none        |
| » timestamp  | object                  | true     | none         | none        |
| » params     | object                  | true     | none         | none        |
| » version    | string                  | true     | none         | none        |

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_LoginDto">LoginDto</h2>
<!-- backwards compatibility -->
<a id="schemalogindto"></a>
<a id="schema_LoginDto"></a>
<a id="tocSlogindto"></a>
<a id="tocslogindto"></a>

```json
{
  "username": "string",
  "password": "string"
}
```

### Properties

| Name     | Type   | Required | Restrictions | Description |
| -------- | ------ | -------- | ------------ | ----------- |
| username | string | true     | none         | none        |
| password | string | true     | none         | none        |

<h2 id="tocS_LoginResponseDto">LoginResponseDto</h2>
<!-- backwards compatibility -->
<a id="schemaloginresponsedto"></a>
<a id="schema_LoginResponseDto"></a>
<a id="tocSloginresponsedto"></a>
<a id="tocsloginresponsedto"></a>

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

### Properties

| Name          | Type   | Required | Restrictions | Description |
| ------------- | ------ | -------- | ------------ | ----------- |
| access_token  | string | true     | none         | none        |
| refresh_token | string | true     | none         | none        |

<h2 id="tocS_RegisterDto">RegisterDto</h2>
<!-- backwards compatibility -->
<a id="schemaregisterdto"></a>
<a id="schema_RegisterDto"></a>
<a id="tocSregisterdto"></a>
<a id="tocsregisterdto"></a>

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "surnames": "string",
  "phone": "string",
  "birth_date": {},
  "nationality": "string",
  "organization_id": "string"
}
```

### Properties

| Name            | Type   | Required | Restrictions | Description |
| --------------- | ------ | -------- | ------------ | ----------- |
| email           | string | true     | none         | none        |
| password        | string | true     | none         | none        |
| name            | string | true     | none         | none        |
| surnames        | string | true     | none         | none        |
| phone           | string | true     | none         | none        |
| birth_date      | object | true     | none         | none        |
| nationality     | string | true     | none         | none        |
| organization_id | string | true     | none         | none        |

<h2 id="tocS_RegisterResponseDto">RegisterResponseDto</h2>
<!-- backwards compatibility -->
<a id="schemaregisterresponsedto"></a>
<a id="schema_RegisterResponseDto"></a>
<a id="tocSregisterresponsedto"></a>
<a id="tocsregisterresponsedto"></a>

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

### Properties

| Name          | Type   | Required | Restrictions | Description |
| ------------- | ------ | -------- | ------------ | ----------- |
| access_token  | string | true     | none         | none        |
| refresh_token | string | true     | none         | none        |

<h2 id="tocS_RequestResetPasswordDto">RequestResetPasswordDto</h2>
<!-- backwards compatibility -->
<a id="schemarequestresetpassworddto"></a>
<a id="schema_RequestResetPasswordDto"></a>
<a id="tocSrequestresetpassworddto"></a>
<a id="tocsrequestresetpassworddto"></a>

```json
{
  "username": "string"
}
```

### Properties

| Name     | Type   | Required | Restrictions | Description |
| -------- | ------ | -------- | ------------ | ----------- |
| username | string | true     | none         | none        |

<h2 id="tocS_RequestResetPasswordResponseDto">RequestResetPasswordResponseDto</h2>
<!-- backwards compatibility -->
<a id="schemarequestresetpasswordresponsedto"></a>
<a id="schema_RequestResetPasswordResponseDto"></a>
<a id="tocSrequestresetpasswordresponsedto"></a>
<a id="tocsrequestresetpasswordresponsedto"></a>

```json
{
  "success": true
}
```

### Properties

| Name    | Type    | Required | Restrictions | Description |
| ------- | ------- | -------- | ------------ | ----------- |
| success | boolean | true     | none         | none        |

<h2 id="tocS_ResetPasswordDto">ResetPasswordDto</h2>
<!-- backwards compatibility -->
<a id="schemaresetpassworddto"></a>
<a id="schema_ResetPasswordDto"></a>
<a id="tocSresetpassworddto"></a>
<a id="tocsresetpassworddto"></a>

```json
{
  "new_password": "string",
  "confirm_new_password": "string",
  "id": "string",
  "r": "string"
}
```

### Properties

| Name                 | Type   | Required | Restrictions | Description |
| -------------------- | ------ | -------- | ------------ | ----------- |
| new_password         | string | true     | none         | none        |
| confirm_new_password | string | true     | none         | none        |
| id                   | string | true     | none         | none        |
| r                    | string | true     | none         | none        |

<h2 id="tocS_ResetPasswordResponseDto">ResetPasswordResponseDto</h2>
<!-- backwards compatibility -->
<a id="schemaresetpasswordresponsedto"></a>
<a id="schema_ResetPasswordResponseDto"></a>
<a id="tocSresetpasswordresponsedto"></a>
<a id="tocsresetpasswordresponsedto"></a>

```json
{
  "success": true
}
```

### Properties

| Name    | Type    | Required | Restrictions | Description |
| ------- | ------- | -------- | ------------ | ----------- |
| success | boolean | true     | none         | none        |

<h2 id="tocS_OrganizationDto">OrganizationDto</h2>
<!-- backwards compatibility -->
<a id="schemaorganizationdto"></a>
<a id="schema_OrganizationDto"></a>
<a id="tocSorganizationdto"></a>
<a id="tocsorganizationdto"></a>

```json
{
  "name": "string",
  "o_id": "string"
}
```

### Properties

| Name | Type   | Required | Restrictions | Description |
| ---- | ------ | -------- | ------------ | ----------- |
| name | string | true     | none         | none        |
| o_id | string | true     | none         | none        |

<h2 id="tocS_Session">Session</h2>
<!-- backwards compatibility -->
<a id="schemasession"></a>
<a id="schema_Session"></a>
<a id="tocSsession"></a>
<a id="tocssession"></a>

```json
{
  "id": "a3f5ad56-2c0b-4efb-b8e9-68c2a4a96b4d",
  "steps_automatic_forward": 100,
  "steps_automatic_backward": 50,
  "steps_intention_forward": 75,
  "steps_intention_backward": 25,
  "flexos_hip": 30,
  "flexos_knee": 45,
  "flexos_ankle": 15,
  "threshold_hipL": 20,
  "threshold_kneeL": 25,
  "threshold_hipR": 20,
  "threshold_kneeR": 25,
  "therapist_dungarees": 8,
  "therapist_effort": 5,
  "d_id": "8e5ac92a-db8f-4c28-aac1-5e4d2b3c5c18",
  "date": "2024-04-26",
  "start": "2024-04-26T08:00:00Z",
  "end": "2024-04-26T09:00:00Z",
  "time_automatic_forward": 10,
  "time_automatic_backward": 5,
  "time_intentiton_forward": 15,
  "time_intention_backward": 10,
  "steps_total": 200,
  "time_total": 60,
  "cadence_automatic_forward": 2,
  "cadence_automatic_backward": 1,
  "cadence_intention_forward": 1.5,
  "cadence_intention_backward": 0.5,
  "chest": 1,
  "evaluation": 7,
  "ingestion_id": "fe338788-8b9a-4666-92b6-dd3b44c5a91d"
}
```

### Properties

| Name                       | Type   | Required | Restrictions | Description                                                                                    |
| -------------------------- | ------ | -------- | ------------ | ---------------------------------------------------------------------------------------------- |
| id                         | string | true     | none         | Unique identifier of the session.                                                              |
| steps_automatic_forward    | number | true     | none         | Number of automatic forward steps recorded in the session.                                     |
| steps_automatic_backward   | number | true     | none         | Number of automatic backward steps recorded in the session.                                    |
| steps_intention_forward    | number | true     | none         | Number of intentional forward steps recorded in the session.                                   |
| steps_intention_backward   | number | true     | none         | Number of intentional backward steps recorded in the session.                                  |
| flexos_hip                 | number | true     | none         | Degrees of hip flexion achieved during the session.                                            |
| flexos_knee                | number | true     | none         | Degrees of knee flexion achieved during the session.                                           |
| flexos_ankle               | number | true     | none         | Degrees of ankle flexion achieved during the session.                                          |
| threshold_hipL             | number | true     | none         | Left hip threshold achieved during the session.                                                |
| threshold_kneeL            | number | true     | none         | Left knee threshold achieved during the session.                                               |
| threshold_hipR             | number | true     | none         | Right hip threshold achieved during the session.                                               |
| threshold_kneeR            | number | true     | none         | Right knee threshold achieved during the session.                                              |
| therapist_dungarees        | number | true     | none         | Score given by the therapist for the use of dungarees during the session.                      |
| therapist_effort           | number | true     | none         | Effort level perceived by the therapist during the session.                                    |
| d_id                       | string | false    | none         | Device identifier associated with the session.                                                 |
| date                       | string | true     | none         | Date of the session.                                                                           |
| start                      | string | false    | none         | Start time of the session.                                                                     |
| end                        | string | true     | none         | End time of the session.                                                                       |
| time_automatic_forward     | number | true     | none         | Total time in minutes of automatic forward steps during the session.                           |
| time_automatic_backward    | number | true     | none         | Total time in minutes of automatic backward steps during the session.                          |
| time_intentiton_forward    | number | true     | none         | Total time in minutes of intentional forward steps during the session.                         |
| time_intention_backward    | number | true     | none         | Total time in minutes of intentional backward steps during the session.                        |
| steps_total                | number | true     | none         | Total number of steps taken by the patient during the session.                                 |
| time_total                 | number | true     | none         | Total session time in minutes.                                                                 |
| cadence_automatic_forward  | number | true     | none         | Step cadence of automatic forward steps per minute during the session.                         |
| cadence_automatic_backward | number | true     | none         | Step cadence of automatic backward steps per minute during the session.                        |
| cadence_intention_forward  | number | true     | none         | Step cadence of intentional forward steps per minute during the session.                       |
| cadence_intention_backward | number | true     | none         | Step cadence of intentional backward steps per minute during the session.                      |
| chest                      | number | true     | none         | Chest level achieved during the session. Can be used to assess the posture or equipment used.  |
| evaluation                 | number | true     | none         | Overall session evaluation score, possibly based on a set of metrics or therapist's judgement. |
| ingestion_id               | string | true     | none         | Identifier of the ingestion associated with the session.                                       |

<h2 id="tocS_PatientDto">PatientDto</h2>
<!-- backwards compatibility -->
<a id="schemapatientdto"></a>
<a id="schema_PatientDto"></a>
<a id="tocSpatientdto"></a>
<a id="tocspatientdto"></a>

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1
}
```

### Properties

| Name                   | Type     | Required | Restrictions | Description                                                 |
| ---------------------- | -------- | -------- | ------------ | ----------------------------------------------------------- |
| p_id                   | string   | true     | none         | Unique identifier of the patient.                           |
| o_ids                  | [string] | true     | none         | List of organization IDs associated with the patient.       |
| birth_date             | object   | true     | none         | Date of birth of the patient.                               |
| sex                    | string   | true     | none         | Sex of the patient.                                         |
| pathology              | [string] | true     | none         | List of diagnosed pathologies of the patient.               |
| affectation            | [string] | true     | none         | List of diagnosed conditions of the patient.                |
| treatment              | [string] | true     | none         | List of treatments assigned to the patient.                 |
| city                   | string   | true     | none         | City of residence of the patient.                           |
| nationality            | string   | true     | none         | Nationality of the patient.                                 |
| name                   | string   | true     | none         | First name of the patient.                                  |
| surnames               | string   | true     | none         | Surname of the patient.                                     |
| phone                  | string   | true     | none         | Phone number of the patient.                                |
| legal_guardian_email_1 | string   | true     | none         | Email of the first legal guardian of the patient.           |
| legal_guardian_email_2 | string   | false    | none         | Email of the second legal guardian of the patient.          |
| legal_guardian_name_1  | string   | false    | none         | First name of the first legal guardian of the patient.      |
| legal_guardian_name_2  | string   | false    | none         | First name of the second legal guardian of the patient.     |
| weight                 | number   | true     | none         | Weight of the patient in kilograms.                         |
| height                 | number   | true     | none         | Height of the patient in centimeters.                       |
| shoe_size              | number   | true     | none         | Shoe size of the patient.                                   |
| femur_len_r            | number   | true     | none         | Length of the right femur in centimeters.                   |
| femur_len_l            | number   | true     | none         | Length of the left femur in centimeters.                    |
| tibia_len_r            | number   | true     | none         | Length of the right tibia in centimeters.                   |
| tibia_len_l            | number   | true     | none         | Length of the left tibia in centimeters.                    |
| walker_len             | number   | true     | none         | Length of the walker in meters, adjustable between 1 and 4. |
| hip_width              | number   | true     | none         | Hip width in centimeters.                                   |
| chest_size             | string   | true     | none         | Chest size of the patient, either 'M' or 'L'.               |
| flexos_hip             | number   | true     | none         | Hip flexion in degrees.                                     |
| flexos_knee            | number   | true     | none         | Knee flexion in degrees.                                    |
| abd                    | boolean  | true     | none         | Indicates whether the patient has a pronounced abdomen.     |
| version                | number   | true     | none         | Version of the record for optimistic concurrency control.   |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| sex         | M     |
| sex         | F     |
| nationality | AD    |
| nationality | AE    |
| nationality | AF    |
| nationality | AG    |
| nationality | AI    |
| nationality | AL    |
| nationality | AM    |
| nationality | AN    |
| nationality | AO    |
| nationality | AQ    |
| nationality | AR    |
| nationality | AS    |
| nationality | AU    |
| nationality | AS    |
| nationality | AW    |
| nationality | AZ    |
| nationality | BA    |
| nationality | BB    |
| nationality | BD    |
| nationality | BE    |
| nationality | BF    |
| nationality | BH    |
| nationality | BI    |
| nationality | BJ    |
| nationality | BM    |
| nationality | BO    |
| nationality | BR    |
| nationality | BS    |
| nationality | BT    |
| nationality | BU    |
| nationality | BV    |
| nationality | BW    |
| nationality | BX    |
| nationality | BY    |
| nationality | BZ    |
| nationality | CA    |
| nationality | CC    |
| nationality | CF    |
| nationality | CG    |
| nationality | CH    |
| nationality | CI    |
| nationality | CK    |
| nationality | CL    |
| nationality | CM    |
| nationality | CN    |
| nationality | CO    |
| nationality | CR    |
| nationality | CU    |
| nationality | CV    |
| nationality | CX    |
| nationality | CY    |
| nationality | CZ    |
| nationality | DE    |
| nationality | DJ    |
| nationality | DK    |
| nationality | DM    |
| nationality | DO    |
| nationality | DZ    |
| nationality | EC    |
| nationality | EE    |
| nationality | EG    |
| nationality | EH    |
| nationality | ER    |
| nationality | ES    |
| nationality | ET    |
| nationality | FI    |
| nationality | FJ    |
| nationality | FK    |
| nationality | FM    |
| nationality | FO    |
| nationality | FR    |
| nationality | GA    |
| nationality | GB    |
| nationality | GD    |
| nationality | GE    |
| nationality | GF    |
| nationality | GH    |
| nationality | GI    |
| nationality | GL    |
| nationality | GM    |
| nationality | GN    |
| nationality | GP    |
| nationality | GQ    |
| nationality | GR    |
| nationality | GS    |
| nationality | GT    |
| nationality | GU    |
| nationality | GW    |
| nationality | GY    |
| nationality | HK    |
| nationality | HM    |
| nationality | HN    |
| nationality | HR    |
| nationality | HT    |
| nationality | HU    |
| nationality | ID    |
| nationality | IE    |
| nationality | IL    |
| nationality | IN    |
| nationality | IO    |
| nationality | IQ    |
| nationality | IR    |
| nationality | IS    |
| nationality | IT    |
| nationality | JM    |
| nationality | JO    |
| nationality | JP    |
| nationality | KE    |
| nationality | KG    |
| nationality | KH    |
| nationality | KI    |
| nationality | KM    |
| nationality | KN    |
| nationality | KP    |
| nationality | KR    |
| nationality | KW    |
| nationality | KY    |
| nationality | KZ    |
| nationality | LA    |
| nationality | LB    |
| nationality | LC    |
| nationality | LI    |
| nationality | LK    |
| nationality | LR    |
| nationality | LS    |
| nationality | LT    |
| nationality | LU    |
| nationality | LV    |
| nationality | LY    |
| nationality | MA    |
| nationality | MC    |
| nationality | MD    |
| nationality | MG    |
| nationality | MH    |
| nationality | MK    |
| nationality | ML    |
| nationality | MM    |
| nationality | MN    |
| nationality | MO    |
| nationality | MP    |
| nationality | MQ    |
| nationality | MR    |
| nationality | MS    |
| nationality | MT    |
| nationality | MU    |
| nationality | MV    |
| nationality | MW    |
| nationality | MX    |
| nationality | MY    |
| nationality | MZ    |
| nationality | NA    |
| nationality | NC    |
| nationality | NE    |
| nationality | NF    |
| nationality | NG    |
| nationality | NI    |
| nationality | NE    |
| nationality | NO    |
| nationality | NP    |
| nationality | NR    |
| nationality | NU    |
| nationality | NZ    |
| nationality | OM    |
| nationality | PA    |
| nationality | PE    |
| nationality | PF    |
| nationality | PG    |
| nationality | PH    |
| nationality | PK    |
| nationality | PO    |
| nationality | PM    |
| nationality | PN    |
| nationality | PR    |
| nationality | PT    |
| nationality | PW    |
| nationality | PY    |
| nationality | QA    |
| nationality | RE    |
| nationality | RO    |
| nationality | RU    |
| nationality | RW    |
| nationality | SA    |
| nationality | SB    |
| nationality | SC    |
| nationality | SD    |
| nationality | SE    |
| nationality | SG    |
| nationality | SH    |
| nationality | SI    |
| nationality | SJ    |
| nationality | SK    |
| nationality | SL    |
| nationality | SM    |
| nationality | SN    |
| nationality | SO    |
| nationality | SR    |
| nationality | ST    |
| nationality | SV    |
| nationality | SY    |
| nationality | SZ    |
| nationality | TC    |
| nationality | TD    |
| nationality | TF    |
| nationality | TG    |
| nationality | TH    |
| nationality | TI    |
| nationality | TK    |
| nationality | TM    |
| nationality | TN    |
| nationality | TO    |
| nationality | TP    |
| nationality | TR    |
| nationality | TT    |
| nationality | TV    |
| nationality | TW    |
| nationality | TZ    |
| nationality | UA    |
| nationality | UG    |
| nationality | UK    |
| nationality | UM    |
| nationality | US    |
| nationality | UY    |
| nationality | UZ    |
| nationality | VA    |
| nationality | VC    |
| nationality | VE    |
| nationality | VG    |
| nationality | VN    |
| nationality | VU    |
| nationality | WF    |
| nationality | WS    |
| nationality | YE    |
| nationality | YT    |
| nationality | YU    |
| nationality | ZA    |
| nationality | ZM    |
| nationality | ZR    |
| nationality | ZW    |
| chest_size  | M     |
| chest_size  | L     |

<h2 id="tocS_UpdatePatientDto">UpdatePatientDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatepatientdto"></a>
<a id="schema_UpdatePatientDto"></a>
<a id="tocSupdatepatientdto"></a>
<a id="tocsupdatepatientdto"></a>

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1
}
```

### Properties

| Name                   | Type     | Required | Restrictions | Description                                                 |
| ---------------------- | -------- | -------- | ------------ | ----------------------------------------------------------- |
| p_id                   | string   | false    | none         | Unique identifier of the patient.                           |
| o_ids                  | [string] | false    | none         | List of organization IDs associated with the patient.       |
| birth_date             | object   | false    | none         | Date of birth of the patient.                               |
| sex                    | string   | false    | none         | Sex of the patient.                                         |
| pathology              | [string] | false    | none         | List of diagnosed pathologies of the patient.               |
| affectation            | [string] | false    | none         | List of diagnosed conditions of the patient.                |
| treatment              | [string] | false    | none         | List of treatments assigned to the patient.                 |
| city                   | string   | false    | none         | City of residence of the patient.                           |
| nationality            | string   | false    | none         | Nationality of the patient.                                 |
| name                   | string   | false    | none         | First name of the patient.                                  |
| surnames               | string   | false    | none         | Surname of the patient.                                     |
| phone                  | string   | false    | none         | Phone number of the patient.                                |
| legal_guardian_email_1 | string   | false    | none         | Email of the first legal guardian of the patient.           |
| legal_guardian_email_2 | string   | false    | none         | Email of the second legal guardian of the patient.          |
| legal_guardian_name_1  | string   | false    | none         | First name of the first legal guardian of the patient.      |
| legal_guardian_name_2  | string   | false    | none         | First name of the second legal guardian of the patient.     |
| weight                 | number   | false    | none         | Weight of the patient in kilograms.                         |
| height                 | number   | false    | none         | Height of the patient in centimeters.                       |
| shoe_size              | number   | false    | none         | Shoe size of the patient.                                   |
| femur_len_r            | number   | false    | none         | Length of the right femur in centimeters.                   |
| femur_len_l            | number   | false    | none         | Length of the left femur in centimeters.                    |
| tibia_len_r            | number   | false    | none         | Length of the right tibia in centimeters.                   |
| tibia_len_l            | number   | false    | none         | Length of the left tibia in centimeters.                    |
| walker_len             | number   | false    | none         | Length of the walker in meters, adjustable between 1 and 4. |
| hip_width              | number   | false    | none         | Hip width in centimeters.                                   |
| chest_size             | string   | false    | none         | Chest size of the patient, either 'M' or 'L'.               |
| flexos_hip             | number   | false    | none         | Hip flexion in degrees.                                     |
| flexos_knee            | number   | false    | none         | Knee flexion in degrees.                                    |
| abd                    | boolean  | false    | none         | Indicates whether the patient has a pronounced abdomen.     |
| version                | number   | false    | none         | Version of the record for optimistic concurrency control.   |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| sex         | M     |
| sex         | F     |
| nationality | AD    |
| nationality | AE    |
| nationality | AF    |
| nationality | AG    |
| nationality | AI    |
| nationality | AL    |
| nationality | AM    |
| nationality | AN    |
| nationality | AO    |
| nationality | AQ    |
| nationality | AR    |
| nationality | AS    |
| nationality | AU    |
| nationality | AS    |
| nationality | AW    |
| nationality | AZ    |
| nationality | BA    |
| nationality | BB    |
| nationality | BD    |
| nationality | BE    |
| nationality | BF    |
| nationality | BH    |
| nationality | BI    |
| nationality | BJ    |
| nationality | BM    |
| nationality | BO    |
| nationality | BR    |
| nationality | BS    |
| nationality | BT    |
| nationality | BU    |
| nationality | BV    |
| nationality | BW    |
| nationality | BX    |
| nationality | BY    |
| nationality | BZ    |
| nationality | CA    |
| nationality | CC    |
| nationality | CF    |
| nationality | CG    |
| nationality | CH    |
| nationality | CI    |
| nationality | CK    |
| nationality | CL    |
| nationality | CM    |
| nationality | CN    |
| nationality | CO    |
| nationality | CR    |
| nationality | CU    |
| nationality | CV    |
| nationality | CX    |
| nationality | CY    |
| nationality | CZ    |
| nationality | DE    |
| nationality | DJ    |
| nationality | DK    |
| nationality | DM    |
| nationality | DO    |
| nationality | DZ    |
| nationality | EC    |
| nationality | EE    |
| nationality | EG    |
| nationality | EH    |
| nationality | ER    |
| nationality | ES    |
| nationality | ET    |
| nationality | FI    |
| nationality | FJ    |
| nationality | FK    |
| nationality | FM    |
| nationality | FO    |
| nationality | FR    |
| nationality | GA    |
| nationality | GB    |
| nationality | GD    |
| nationality | GE    |
| nationality | GF    |
| nationality | GH    |
| nationality | GI    |
| nationality | GL    |
| nationality | GM    |
| nationality | GN    |
| nationality | GP    |
| nationality | GQ    |
| nationality | GR    |
| nationality | GS    |
| nationality | GT    |
| nationality | GU    |
| nationality | GW    |
| nationality | GY    |
| nationality | HK    |
| nationality | HM    |
| nationality | HN    |
| nationality | HR    |
| nationality | HT    |
| nationality | HU    |
| nationality | ID    |
| nationality | IE    |
| nationality | IL    |
| nationality | IN    |
| nationality | IO    |
| nationality | IQ    |
| nationality | IR    |
| nationality | IS    |
| nationality | IT    |
| nationality | JM    |
| nationality | JO    |
| nationality | JP    |
| nationality | KE    |
| nationality | KG    |
| nationality | KH    |
| nationality | KI    |
| nationality | KM    |
| nationality | KN    |
| nationality | KP    |
| nationality | KR    |
| nationality | KW    |
| nationality | KY    |
| nationality | KZ    |
| nationality | LA    |
| nationality | LB    |
| nationality | LC    |
| nationality | LI    |
| nationality | LK    |
| nationality | LR    |
| nationality | LS    |
| nationality | LT    |
| nationality | LU    |
| nationality | LV    |
| nationality | LY    |
| nationality | MA    |
| nationality | MC    |
| nationality | MD    |
| nationality | MG    |
| nationality | MH    |
| nationality | MK    |
| nationality | ML    |
| nationality | MM    |
| nationality | MN    |
| nationality | MO    |
| nationality | MP    |
| nationality | MQ    |
| nationality | MR    |
| nationality | MS    |
| nationality | MT    |
| nationality | MU    |
| nationality | MV    |
| nationality | MW    |
| nationality | MX    |
| nationality | MY    |
| nationality | MZ    |
| nationality | NA    |
| nationality | NC    |
| nationality | NE    |
| nationality | NF    |
| nationality | NG    |
| nationality | NI    |
| nationality | NE    |
| nationality | NO    |
| nationality | NP    |
| nationality | NR    |
| nationality | NU    |
| nationality | NZ    |
| nationality | OM    |
| nationality | PA    |
| nationality | PE    |
| nationality | PF    |
| nationality | PG    |
| nationality | PH    |
| nationality | PK    |
| nationality | PO    |
| nationality | PM    |
| nationality | PN    |
| nationality | PR    |
| nationality | PT    |
| nationality | PW    |
| nationality | PY    |
| nationality | QA    |
| nationality | RE    |
| nationality | RO    |
| nationality | RU    |
| nationality | RW    |
| nationality | SA    |
| nationality | SB    |
| nationality | SC    |
| nationality | SD    |
| nationality | SE    |
| nationality | SG    |
| nationality | SH    |
| nationality | SI    |
| nationality | SJ    |
| nationality | SK    |
| nationality | SL    |
| nationality | SM    |
| nationality | SN    |
| nationality | SO    |
| nationality | SR    |
| nationality | ST    |
| nationality | SV    |
| nationality | SY    |
| nationality | SZ    |
| nationality | TC    |
| nationality | TD    |
| nationality | TF    |
| nationality | TG    |
| nationality | TH    |
| nationality | TI    |
| nationality | TK    |
| nationality | TM    |
| nationality | TN    |
| nationality | TO    |
| nationality | TP    |
| nationality | TR    |
| nationality | TT    |
| nationality | TV    |
| nationality | TW    |
| nationality | TZ    |
| nationality | UA    |
| nationality | UG    |
| nationality | UK    |
| nationality | UM    |
| nationality | US    |
| nationality | UY    |
| nationality | UZ    |
| nationality | VA    |
| nationality | VC    |
| nationality | VE    |
| nationality | VG    |
| nationality | VN    |
| nationality | VU    |
| nationality | WF    |
| nationality | WS    |
| nationality | YE    |
| nationality | YT    |
| nationality | YU    |
| nationality | ZA    |
| nationality | ZM    |
| nationality | ZR    |
| nationality | ZW    |
| chest_size  | M     |
| chest_size  | L     |

<h2 id="tocS_PatientTable">PatientTable</h2>
<!-- backwards compatibility -->
<a id="schemapatienttable"></a>
<a id="schema_PatientTable"></a>
<a id="tocSpatienttable"></a>
<a id="tocspatienttable"></a>

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John",
  "surnames": "Doe",
  "institutions": ["Institution 1", "Institution 2"],
  "total_session": 20,
  "last_session": "2023-01-15",
  "total_steps": 5000
}
```

### Properties

| Name          | Type              | Required | Restrictions | Description                                        |
| ------------- | ----------------- | -------- | ------------ | -------------------------------------------------- |
| p_id          | string            | true     | none         | Unique identifier of the patient.                  |
| name          | string            | true     | none         | First name of the patient.                         |
| surnames      | string            | true     | none         | Surname of the patient.                            |
| institutions  | [string]          | true     | none         | List of institutions associated with the patient.  |
| total_session | number            | true     | none         | Total number of sessions the patient has attended. |
| last_session  | string(date-time) | false    | none         | Date of the last session attended by the patient.  |
| total_steps   | number            | true     | none         | Total number of steps taken by the patient.        |

<h2 id="tocS_PatientView">PatientView</h2>
<!-- backwards compatibility -->
<a id="schemapatientview"></a>
<a id="schema_PatientView"></a>
<a id="tocSpatientview"></a>
<a id="tocspatientview"></a>

```json
{
  "p_id": "123e4567-e89b-12d3-a456-426614174000",
  "o_ids": ["123e4567-e89b-12d3-a456-426614174000"],
  "birth_date": "1980-01-01",
  "sex": "M",
  "pathology": ["Diabetes", "Hypertension"],
  "affectation": ["Arthritis"],
  "treatment": ["Insulin", "Metformin"],
  "city": "New York",
  "nationality": "USA",
  "name": "John",
  "surnames": "Doe",
  "phone": "+11234567890",
  "legal_guardian_email_1": "guardian1@example.com",
  "legal_guardian_email_2": "guardian2@example.com",
  "legal_guardian_name_1": "Jane",
  "legal_guardian_name_2": "Jack",
  "weight": 70,
  "height": 175,
  "shoe_size": 42,
  "femur_len_r": 25,
  "femur_len_l": 25,
  "tibia_len_r": 30,
  "tibia_len_l": 30,
  "walker_len": 2,
  "hip_width": 30,
  "chest_size": "M",
  "flexos_hip": 10,
  "flexos_knee": 15,
  "abd": true,
  "version": 1,
  "weight_unit": "string",
  "height_unit": "string",
  "sessions": [
    {
      "id": "a3f5ad56-2c0b-4efb-b8e9-68c2a4a96b4d",
      "steps_automatic_forward": 100,
      "steps_automatic_backward": 50,
      "steps_intention_forward": 75,
      "steps_intention_backward": 25,
      "flexos_hip": 30,
      "flexos_knee": 45,
      "flexos_ankle": 15,
      "threshold_hipL": 20,
      "threshold_kneeL": 25,
      "threshold_hipR": 20,
      "threshold_kneeR": 25,
      "therapist_dungarees": 8,
      "therapist_effort": 5,
      "d_id": "8e5ac92a-db8f-4c28-aac1-5e4d2b3c5c18",
      "date": "2024-04-26",
      "start": "2024-04-26T08:00:00Z",
      "end": "2024-04-26T09:00:00Z",
      "time_automatic_forward": 10,
      "time_automatic_backward": 5,
      "time_intentiton_forward": 15,
      "time_intention_backward": 10,
      "steps_total": 200,
      "time_total": 60,
      "cadence_automatic_forward": 2,
      "cadence_automatic_backward": 1,
      "cadence_intention_forward": 1.5,
      "cadence_intention_backward": 0.5,
      "chest": 1,
      "evaluation": 7,
      "ingestion_id": "fe338788-8b9a-4666-92b6-dd3b44c5a91d"
    }
  ]
}
```

### Properties

| Name                   | Type                        | Required | Restrictions | Description                                                    |
| ---------------------- | --------------------------- | -------- | ------------ | -------------------------------------------------------------- |
| p_id                   | string                      | false    | none         | Unique identifier of the patient.                              |
| o_ids                  | [string]                    | false    | none         | List of organization IDs associated with the patient.          |
| birth_date             | object                      | false    | none         | Date of birth of the patient.                                  |
| sex                    | string                      | false    | none         | Sex of the patient.                                            |
| pathology              | [string]                    | false    | none         | List of diagnosed pathologies of the patient.                  |
| affectation            | [string]                    | false    | none         | List of diagnosed conditions of the patient.                   |
| treatment              | [string]                    | false    | none         | List of treatments assigned to the patient.                    |
| city                   | string                      | false    | none         | City of residence of the patient.                              |
| nationality            | string                      | false    | none         | Nationality of the patient.                                    |
| name                   | string                      | false    | none         | First name of the patient.                                     |
| surnames               | string                      | false    | none         | Surname of the patient.                                        |
| phone                  | string                      | false    | none         | Phone number of the patient.                                   |
| legal_guardian_email_1 | string                      | false    | none         | Email of the first legal guardian of the patient.              |
| legal_guardian_email_2 | string                      | false    | none         | Email of the second legal guardian of the patient.             |
| legal_guardian_name_1  | string                      | false    | none         | First name of the first legal guardian of the patient.         |
| legal_guardian_name_2  | string                      | false    | none         | First name of the second legal guardian of the patient.        |
| weight                 | number                      | false    | none         | Weight of the patient in kilograms.                            |
| height                 | number                      | false    | none         | Height of the patient in centimeters.                          |
| shoe_size              | number                      | false    | none         | Shoe size of the patient.                                      |
| femur_len_r            | number                      | false    | none         | Length of the right femur in centimeters.                      |
| femur_len_l            | number                      | false    | none         | Length of the left femur in centimeters.                       |
| tibia_len_r            | number                      | false    | none         | Length of the right tibia in centimeters.                      |
| tibia_len_l            | number                      | false    | none         | Length of the left tibia in centimeters.                       |
| walker_len             | number                      | false    | none         | Length of the walker in meters, adjustable between 1 and 4.    |
| hip_width              | number                      | false    | none         | Hip width in centimeters.                                      |
| chest_size             | string                      | false    | none         | Chest size of the patient, either 'M' or 'L'.                  |
| flexos_hip             | number                      | false    | none         | Hip flexion in degrees.                                        |
| flexos_knee            | number                      | false    | none         | Knee flexion in degrees.                                       |
| abd                    | boolean                     | false    | none         | Indicates whether the patient has a pronounced abdomen.        |
| version                | number                      | false    | none         | Version of the record for optimistic concurrency control.      |
| weight_unit            | string                      | true     | none         | Unit of measurement for the patient's weight, e.g., kg or lbs. |
| height_unit            | string                      | true     | none         | Unit of measurement for the patient's height, e.g., cm or in.  |
| sessions               | [[Session](#schemasession)] | true     | none         | Sessions associated with the patient.                          |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| sex         | M     |
| sex         | F     |
| nationality | AD    |
| nationality | AE    |
| nationality | AF    |
| nationality | AG    |
| nationality | AI    |
| nationality | AL    |
| nationality | AM    |
| nationality | AN    |
| nationality | AO    |
| nationality | AQ    |
| nationality | AR    |
| nationality | AS    |
| nationality | AU    |
| nationality | AS    |
| nationality | AW    |
| nationality | AZ    |
| nationality | BA    |
| nationality | BB    |
| nationality | BD    |
| nationality | BE    |
| nationality | BF    |
| nationality | BH    |
| nationality | BI    |
| nationality | BJ    |
| nationality | BM    |
| nationality | BO    |
| nationality | BR    |
| nationality | BS    |
| nationality | BT    |
| nationality | BU    |
| nationality | BV    |
| nationality | BW    |
| nationality | BX    |
| nationality | BY    |
| nationality | BZ    |
| nationality | CA    |
| nationality | CC    |
| nationality | CF    |
| nationality | CG    |
| nationality | CH    |
| nationality | CI    |
| nationality | CK    |
| nationality | CL    |
| nationality | CM    |
| nationality | CN    |
| nationality | CO    |
| nationality | CR    |
| nationality | CU    |
| nationality | CV    |
| nationality | CX    |
| nationality | CY    |
| nationality | CZ    |
| nationality | DE    |
| nationality | DJ    |
| nationality | DK    |
| nationality | DM    |
| nationality | DO    |
| nationality | DZ    |
| nationality | EC    |
| nationality | EE    |
| nationality | EG    |
| nationality | EH    |
| nationality | ER    |
| nationality | ES    |
| nationality | ET    |
| nationality | FI    |
| nationality | FJ    |
| nationality | FK    |
| nationality | FM    |
| nationality | FO    |
| nationality | FR    |
| nationality | GA    |
| nationality | GB    |
| nationality | GD    |
| nationality | GE    |
| nationality | GF    |
| nationality | GH    |
| nationality | GI    |
| nationality | GL    |
| nationality | GM    |
| nationality | GN    |
| nationality | GP    |
| nationality | GQ    |
| nationality | GR    |
| nationality | GS    |
| nationality | GT    |
| nationality | GU    |
| nationality | GW    |
| nationality | GY    |
| nationality | HK    |
| nationality | HM    |
| nationality | HN    |
| nationality | HR    |
| nationality | HT    |
| nationality | HU    |
| nationality | ID    |
| nationality | IE    |
| nationality | IL    |
| nationality | IN    |
| nationality | IO    |
| nationality | IQ    |
| nationality | IR    |
| nationality | IS    |
| nationality | IT    |
| nationality | JM    |
| nationality | JO    |
| nationality | JP    |
| nationality | KE    |
| nationality | KG    |
| nationality | KH    |
| nationality | KI    |
| nationality | KM    |
| nationality | KN    |
| nationality | KP    |
| nationality | KR    |
| nationality | KW    |
| nationality | KY    |
| nationality | KZ    |
| nationality | LA    |
| nationality | LB    |
| nationality | LC    |
| nationality | LI    |
| nationality | LK    |
| nationality | LR    |
| nationality | LS    |
| nationality | LT    |
| nationality | LU    |
| nationality | LV    |
| nationality | LY    |
| nationality | MA    |
| nationality | MC    |
| nationality | MD    |
| nationality | MG    |
| nationality | MH    |
| nationality | MK    |
| nationality | ML    |
| nationality | MM    |
| nationality | MN    |
| nationality | MO    |
| nationality | MP    |
| nationality | MQ    |
| nationality | MR    |
| nationality | MS    |
| nationality | MT    |
| nationality | MU    |
| nationality | MV    |
| nationality | MW    |
| nationality | MX    |
| nationality | MY    |
| nationality | MZ    |
| nationality | NA    |
| nationality | NC    |
| nationality | NE    |
| nationality | NF    |
| nationality | NG    |
| nationality | NI    |
| nationality | NE    |
| nationality | NO    |
| nationality | NP    |
| nationality | NR    |
| nationality | NU    |
| nationality | NZ    |
| nationality | OM    |
| nationality | PA    |
| nationality | PE    |
| nationality | PF    |
| nationality | PG    |
| nationality | PH    |
| nationality | PK    |
| nationality | PO    |
| nationality | PM    |
| nationality | PN    |
| nationality | PR    |
| nationality | PT    |
| nationality | PW    |
| nationality | PY    |
| nationality | QA    |
| nationality | RE    |
| nationality | RO    |
| nationality | RU    |
| nationality | RW    |
| nationality | SA    |
| nationality | SB    |
| nationality | SC    |
| nationality | SD    |
| nationality | SE    |
| nationality | SG    |
| nationality | SH    |
| nationality | SI    |
| nationality | SJ    |
| nationality | SK    |
| nationality | SL    |
| nationality | SM    |
| nationality | SN    |
| nationality | SO    |
| nationality | SR    |
| nationality | ST    |
| nationality | SV    |
| nationality | SY    |
| nationality | SZ    |
| nationality | TC    |
| nationality | TD    |
| nationality | TF    |
| nationality | TG    |
| nationality | TH    |
| nationality | TI    |
| nationality | TK    |
| nationality | TM    |
| nationality | TN    |
| nationality | TO    |
| nationality | TP    |
| nationality | TR    |
| nationality | TT    |
| nationality | TV    |
| nationality | TW    |
| nationality | TZ    |
| nationality | UA    |
| nationality | UG    |
| nationality | UK    |
| nationality | UM    |
| nationality | US    |
| nationality | UY    |
| nationality | UZ    |
| nationality | VA    |
| nationality | VC    |
| nationality | VE    |
| nationality | VG    |
| nationality | VN    |
| nationality | VU    |
| nationality | WF    |
| nationality | WS    |
| nationality | YE    |
| nationality | YT    |
| nationality | YU    |
| nationality | ZA    |
| nationality | ZM    |
| nationality | ZR    |
| nationality | ZW    |
| chest_size  | M     |
| chest_size  | L     |

<h2 id="tocS_UserData">UserData</h2>
<!-- backwards compatibility -->
<a id="schemauserdata"></a>
<a id="schema_UserData"></a>
<a id="tocSuserdata"></a>
<a id="tocsuserdata"></a>

```json
{
  "name": "string",
  "surnames": "string",
  "birth_date": "1990-01-01",
  "nationality": "string",
  "phone": "+1234567890"
}
```

### Properties

| Name        | Type   | Required | Restrictions | Description          |
| ----------- | ------ | -------- | ------------ | -------------------- |
| name        | string | true     | none         | User's first name    |
| surnames    | string | true     | none         | User's last name     |
| birth_date  | object | true     | none         | User's date of birth |
| nationality | string | true     | none         | User's nationality   |
| phone       | string | true     | none         | User's phone number  |

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "email": "user@example.com",
  "user_data": {
    "name": "string",
    "surnames": "string",
    "birth_date": "1990-01-01",
    "nationality": "string",
    "phone": "+1234567890"
  }
}
```

### Properties

| Name      | Type                        | Required | Restrictions | Description          |
| --------- | --------------------------- | -------- | ------------ | -------------------- |
| email     | string                      | true     | none         | User's email address |
| user_data | [UserData](#schemauserdata) | true     | none         | Detailed user data   |

<h2 id="tocS_MyAccount">MyAccount</h2>
<!-- backwards compatibility -->
<a id="schemamyaccount"></a>
<a id="schema_MyAccount"></a>
<a id="tocSmyaccount"></a>
<a id="tocsmyaccount"></a>

```json
{
  "user": {
    "email": "user@example.com",
    "user_data": {
      "name": "string",
      "surnames": "string",
      "birth_date": "1990-01-01",
      "nationality": "string",
      "phone": "+1234567890"
    }
  },
  "organization": {},
  "can_edit": true
}
```

### Properties

| Name         | Type                | Required | Restrictions | Description                                  |
| ------------ | ------------------- | -------- | ------------ | -------------------------------------------- |
| user         | [User](#schemauser) | true     | none         | User's profile                               |
| organization | object              | true     | none         | User's organization details                  |
| can_edit     | boolean             | true     | none         | Indicates if the user can edit their profile |

<h2 id="tocS_UserUpdateDto">UserUpdateDto</h2>
<!-- backwards compatibility -->
<a id="schemauserupdatedto"></a>
<a id="schema_UserUpdateDto"></a>
<a id="tocSuserupdatedto"></a>
<a id="tocsuserupdatedto"></a>

```json
{
  "name": "string",
  "surnames": "string",
  "birth_date": "1990-01-01",
  "nationality": "string",
  "phone": "+1234567890"
}
```

### Properties

| Name        | Type   | Required | Restrictions | Description          |
| ----------- | ------ | -------- | ------------ | -------------------- |
| name        | string | true     | none         | User's first name    |
| surnames    | string | true     | none         | User's last name     |
| birth_date  | object | true     | none         | User's date of birth |
| nationality | string | true     | none         | User's nationality   |
| phone       | string | true     | none         | User's phone number  |

<h2 id="tocS_Menu">Menu</h2>
<!-- backwards compatibility -->
<a id="schemamenu"></a>
<a id="schema_Menu"></a>
<a id="tocSmenu"></a>
<a id="tocsmenu"></a>

```json
{
  "i_class_name": "string",
  "to": "string",
  "translation": "string"
}
```

### Properties

| Name         | Type   | Required | Restrictions | Description                        |
| ------------ | ------ | -------- | ------------ | ---------------------------------- |
| i_class_name | string | true     | none         | CSS class name for the menu icon   |
| to           | string | true     | none         | Router link path for navigation    |
| translation  | string | true     | none         | Translation key for the menu label |

<h2 id="tocS_GetMenuInfo">GetMenuInfo</h2>
<!-- backwards compatibility -->
<a id="schemagetmenuinfo"></a>
<a id="schema_GetMenuInfo"></a>
<a id="tocSgetmenuinfo"></a>
<a id="tocsgetmenuinfo"></a>

```json
{
  "menu": [
    {
      "i_class_name": "string",
      "to": "string",
      "translation": "string"
    }
  ],
  "is_active": true,
  "premium": false
}
```

### Properties

| Name      | Type                  | Required | Restrictions | Description                                   |
| --------- | --------------------- | -------- | ------------ | --------------------------------------------- |
| menu      | [[Menu](#schemamenu)] | true     | none         | List of menu items                            |
| is_active | boolean               | true     | none         | Indicates whether the menu is active          |
| premium   | boolean               | true     | none         | Indicates whether the user has premium status |

<h2 id="tocS_MyDevices">MyDevices</h2>
<!-- backwards compatibility -->
<a id="schemamydevices"></a>
<a id="schema_MyDevices"></a>
<a id="tocSmydevices"></a>
<a id="tocsmydevices"></a>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "model": "Model X",
  "serial": "SN123456789",
  "active": true
}
```

### Properties

| Name   | Type    | Required | Restrictions | Description                       |
| ------ | ------- | -------- | ------------ | --------------------------------- |
| id     | string  | true     | none         | Device ID                         |
| model  | string  | true     | none         | Device model                      |
| serial | string  | true     | none         | Device serial number              |
| active | boolean | true     | none         | Indicates if the device is active |

<h2 id="tocS_OrganizationUpdateDto">OrganizationUpdateDto</h2>
<!-- backwards compatibility -->
<a id="schemaorganizationupdatedto"></a>
<a id="schema_OrganizationUpdateDto"></a>
<a id="tocSorganizationupdatedto"></a>
<a id="tocsorganizationupdatedto"></a>

```json
{
  "name": "string",
  "street_name": "string",
  "street_number": "string",
  "postal_code": "string",
  "country": "string",
  "state": "string",
  "city": "string"
}
```

### Properties

| Name          | Type   | Required | Restrictions | Description                                       |
| ------------- | ------ | -------- | ------------ | ------------------------------------------------- |
| name          | string | true     | none         | Name of the organization                          |
| street_name   | string | true     | none         | Street name of the organization address           |
| street_number | string | true     | none         | Street number of the organization address         |
| postal_code   | string | true     | none         | Postal code of the organization                   |
| country       | string | true     | none         | Country where the organization is located         |
| state         | string | true     | none         | State or region where the organization is located |
| city          | string | true     | none         | City where the organization is located            |

<h2 id="tocS_CreateDeviceDto">CreateDeviceDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatedevicedto"></a>
<a id="schema_CreateDeviceDto"></a>
<a id="tocScreatedevicedto"></a>
<a id="tocscreatedevicedto"></a>

```json
{
  "model": "Model X Pro",
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!",
  "o_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Properties

| Name              | Type   | Required | Restrictions | Description                                                                                           |
| ----------------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| model             | string | false    | none         | Optional model of the device.                                                                         |
| serial            | string | false    | none         | Optional serial number of the device.                                                                 |
| structure_version | string | false    | none         | Optional version of the device structure, indicating the device`s hardware or software configuration. |
| password          | string | false    | none         | Optional password for device access or configuration, if applicable.                                  |
| o_id              | string | false    | none         | Optional identifier of the organization that owns the device.                                         |

<h2 id="tocS_DeviceTable">DeviceTable</h2>
<!-- backwards compatibility -->
<a id="schemadevicetable"></a>
<a id="schema_DeviceTable"></a>
<a id="tocSdevicetable"></a>
<a id="tocsdevicetable"></a>

```json
{
  "d_id": "123e4567-e89b-12d3-a456-426614174000",
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "P@ssw0rd!"
}
```

### Properties

| Name              | Type    | Required | Restrictions | Description                                                                      |
| ----------------- | ------- | -------- | ------------ | -------------------------------------------------------------------------------- |
| d_id              | string  | true     | none         | Unique identifier of the device.                                                 |
| active            | boolean | true     | none         | Indicates whether the device is currently active.                                |
| serial            | string  | true     | none         | Serial number of the device.                                                     |
| structure_version | string  | true     | none         | Version of the device structure, indicating hardware or software configurations. |
| password          | string  | true     | none         | Password for the device, used for configurations or access.                      |

<h2 id="tocS_UpdateActiveDeviceDto">UpdateActiveDeviceDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdateactivedevicedto"></a>
<a id="schema_UpdateActiveDeviceDto"></a>
<a id="tocSupdateactivedevicedto"></a>
<a id="tocsupdateactivedevicedto"></a>

```json
{
  "active": true
}
```

### Properties

| Name   | Type    | Required | Restrictions | Description                                   |
| ------ | ------- | -------- | ------------ | --------------------------------------------- |
| active | boolean | true     | none         | Indicates the new active status of the device |

<h2 id="tocS_UpdateDeviceDto">UpdateDeviceDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatedevicedto"></a>
<a id="schema_UpdateDeviceDto"></a>
<a id="tocSupdatedevicedto"></a>
<a id="tocsupdatedevicedto"></a>

```json
{
  "active": true,
  "serial": "SN123456789",
  "structure_version": "v1.0.0",
  "password": "p@ssw0rd",
  "model": "ModelXPro"
}
```

### Properties

| Name              | Type    | Required | Restrictions | Description                            |
| ----------------- | ------- | -------- | ------------ | -------------------------------------- |
| active            | boolean | false    | none         | Indicates whether the device is active |
| serial            | string  | false    | none         | Serial number of the device            |
| structure_version | string  | false    | none         | Version of the device structure        |
| password          | string  | false    | none         | Password for the device, if applicable |
| model             | string  | false    | none         | Model of the device                    |

<h2 id="tocS_UserTable">UserTable</h2>
<!-- backwards compatibility -->
<a id="schemausertable"></a>
<a id="schema_UserTable"></a>
<a id="tocSusertable"></a>
<a id="tocsusertable"></a>

```json
{
  "u_id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John",
  "surnames": "Doe",
  "email": "john.doe@example.com",
  "o_id": "456e4577-e89b-12d3-a456-426655440000",
  "is_admin": true,
  "role": "manager",
  "active": true
}
```

### Properties

| Name     | Type    | Required | Restrictions | Description                                           |
| -------- | ------- | -------- | ------------ | ----------------------------------------------------- |
| u_id     | string  | true     | none         | The UUID of the user                                  |
| name     | string  | true     | none         | The first name of the user                            |
| surnames | string  | true     | none         | The surname or last name of the user                  |
| email    | string  | true     | none         | The email address of the user                         |
| o_id     | string  | true     | none         | The UUID of the organization associated with the user |
| is_admin | boolean | true     | none         | Indicates if the user is an administrator             |
| role     | string  | true     | none         | The role of the user within the system                |
| active   | boolean | true     | none         | Indicates if the user account is active               |

<h2 id="tocS_UsersView">UsersView</h2>
<!-- backwards compatibility -->
<a id="schemausersview"></a>
<a id="schema_UsersView"></a>
<a id="tocSusersview"></a>
<a id="tocsusersview"></a>

```json
{
  "can_create_organization": true,
  "users": [
    {
      "u_id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John",
      "surnames": "Doe",
      "email": "john.doe@example.com",
      "o_id": "456e4577-e89b-12d3-a456-426655440000",
      "is_admin": true,
      "role": "manager",
      "active": true
    }
  ]
}
```

### Properties

| Name                    | Type                            | Required | Restrictions | Description                                          |
| ----------------------- | ------------------------------- | -------- | ------------ | ---------------------------------------------------- |
| can_create_organization | boolean                         | true     | none         | Flag indicating if the user can create organizations |
| users                   | [[UserTable](#schemausertable)] | true     | none         | List of user details                                 |

<h2 id="tocS_ToggleUserActiveDto">ToggleUserActiveDto</h2>
<!-- backwards compatibility -->
<a id="schematoggleuseractivedto"></a>
<a id="schema_ToggleUserActiveDto"></a>
<a id="tocStoggleuseractivedto"></a>
<a id="tocstoggleuseractivedto"></a>

```json
{
  "u_id": "10689150-8feb-43c7-b67a-b1742f9ba6a9",
  "active": true,
  "o_id": "771da566-6a45-46f4-aab5-a21ecd7d3226"
}
```

### Properties

| Name   | Type         | Required | Restrictions | Description                                       |
| ------ | ------------ | -------- | ------------ | ------------------------------------------------- |
| u_id   | string(uuid) | true     | none         | The unique identifier for the user                |
| active | boolean      | true     | none         | Flag indicating whether the user is active or not |
| o_id   | string(uuid) | true     | none         | The unique identifier for the organization        |

<h2 id="tocS_Organization">Organization</h2>
<!-- backwards compatibility -->
<a id="schemaorganization"></a>
<a id="schema_Organization"></a>
<a id="tocSorganization"></a>
<a id="tocsorganization"></a>

```json
{
  "o_id": "456e8977-e89b-12d3-a456-426614174000",
  "name": "Doe Enterprises",
  "street_name": "Main Street",
  "street_number": "100A",
  "postal_code": "A1A 1A1",
  "country": "Canada",
  "city": "Ottawa",
  "role": "admin",
  "premium": true
}
```

### Properties

| Name          | Type    | Required | Restrictions | Description                                              |
| ------------- | ------- | -------- | ------------ | -------------------------------------------------------- |
| o_id          | string  | true     | none         | Unique identifier for the organization                   |
| name          | string  | true     | none         | Name of the organization                                 |
| street_name   | string  | true     | none         | Street name of the organization address                  |
| street_number | string  | true     | none         | Street number of the organization address                |
| postal_code   | string  | true     | none         | Postal code of the organization address                  |
| country       | string  | true     | none         | Country where the organization is located                |
| city          | string  | true     | none         | City where the organization is located                   |
| role          | string  | true     | none         | Role of the organization in the context of the service   |
| premium       | boolean | true     | none         | Whether the organization is subscribed to a premium plan |

<h2 id="tocS_CreateOrganization">CreateOrganization</h2>
<!-- backwards compatibility -->
<a id="schemacreateorganization"></a>
<a id="schema_CreateOrganization"></a>
<a id="tocScreateorganization"></a>
<a id="tocscreateorganization"></a>

```json
{
  "name_organization": "Doe Enterprises",
  "city": "New York",
  "country": "USA",
  "role": "admin",
  "postal_code": "10001",
  "street_name": "5th Avenue",
  "street_number": "789"
}
```

### Properties

| Name              | Type   | Required | Restrictions | Description                                                 |
| ----------------- | ------ | -------- | ------------ | ----------------------------------------------------------- |
| name_organization | string | true     | none         | The name of the new organization                            |
| city              | string | true     | none         | The city where the new organization will be located         |
| country           | string | true     | none         | The country code where the new organization will be located |
| role              | string | true     | none         | The initial role of the admin user in the organization      |
| postal_code       | string | true     | none         | The postal code for the new organization's address          |
| street_name       | string | true     | none         | The street name for the new organization's address          |
| street_number     | string | true     | none         | The street number for the new organization's address        |

#### Enumerated Values

| Property | Value |
| -------- | ----- |
| country  | AD    |
| country  | AE    |
| country  | AF    |
| country  | AG    |
| country  | AI    |
| country  | AL    |
| country  | AM    |
| country  | AN    |
| country  | AO    |
| country  | AQ    |
| country  | AR    |
| country  | AS    |
| country  | AU    |
| country  | AS    |
| country  | AW    |
| country  | AZ    |
| country  | BA    |
| country  | BB    |
| country  | BD    |
| country  | BE    |
| country  | BF    |
| country  | BH    |
| country  | BI    |
| country  | BJ    |
| country  | BM    |
| country  | BO    |
| country  | BR    |
| country  | BS    |
| country  | BT    |
| country  | BU    |
| country  | BV    |
| country  | BW    |
| country  | BX    |
| country  | BY    |
| country  | BZ    |
| country  | CA    |
| country  | CC    |
| country  | CF    |
| country  | CG    |
| country  | CH    |
| country  | CI    |
| country  | CK    |
| country  | CL    |
| country  | CM    |
| country  | CN    |
| country  | CO    |
| country  | CR    |
| country  | CU    |
| country  | CV    |
| country  | CX    |
| country  | CY    |
| country  | CZ    |
| country  | DE    |
| country  | DJ    |
| country  | DK    |
| country  | DM    |
| country  | DO    |
| country  | DZ    |
| country  | EC    |
| country  | EE    |
| country  | EG    |
| country  | EH    |
| country  | ER    |
| country  | ES    |
| country  | ET    |
| country  | FI    |
| country  | FJ    |
| country  | FK    |
| country  | FM    |
| country  | FO    |
| country  | FR    |
| country  | GA    |
| country  | GB    |
| country  | GD    |
| country  | GE    |
| country  | GF    |
| country  | GH    |
| country  | GI    |
| country  | GL    |
| country  | GM    |
| country  | GN    |
| country  | GP    |
| country  | GQ    |
| country  | GR    |
| country  | GS    |
| country  | GT    |
| country  | GU    |
| country  | GW    |
| country  | GY    |
| country  | HK    |
| country  | HM    |
| country  | HN    |
| country  | HR    |
| country  | HT    |
| country  | HU    |
| country  | ID    |
| country  | IE    |
| country  | IL    |
| country  | IN    |
| country  | IO    |
| country  | IQ    |
| country  | IR    |
| country  | IS    |
| country  | IT    |
| country  | JM    |
| country  | JO    |
| country  | JP    |
| country  | KE    |
| country  | KG    |
| country  | KH    |
| country  | KI    |
| country  | KM    |
| country  | KN    |
| country  | KP    |
| country  | KR    |
| country  | KW    |
| country  | KY    |
| country  | KZ    |
| country  | LA    |
| country  | LB    |
| country  | LC    |
| country  | LI    |
| country  | LK    |
| country  | LR    |
| country  | LS    |
| country  | LT    |
| country  | LU    |
| country  | LV    |
| country  | LY    |
| country  | MA    |
| country  | MC    |
| country  | MD    |
| country  | MG    |
| country  | MH    |
| country  | MK    |
| country  | ML    |
| country  | MM    |
| country  | MN    |
| country  | MO    |
| country  | MP    |
| country  | MQ    |
| country  | MR    |
| country  | MS    |
| country  | MT    |
| country  | MU    |
| country  | MV    |
| country  | MW    |
| country  | MX    |
| country  | MY    |
| country  | MZ    |
| country  | NA    |
| country  | NC    |
| country  | NE    |
| country  | NF    |
| country  | NG    |
| country  | NI    |
| country  | NE    |
| country  | NO    |
| country  | NP    |
| country  | NR    |
| country  | NU    |
| country  | NZ    |
| country  | OM    |
| country  | PA    |
| country  | PE    |
| country  | PF    |
| country  | PG    |
| country  | PH    |
| country  | PK    |
| country  | PO    |
| country  | PM    |
| country  | PN    |
| country  | PR    |
| country  | PT    |
| country  | PW    |
| country  | PY    |
| country  | QA    |
| country  | RE    |
| country  | RO    |
| country  | RU    |
| country  | RW    |
| country  | SA    |
| country  | SB    |
| country  | SC    |
| country  | SD    |
| country  | SE    |
| country  | SG    |
| country  | SH    |
| country  | SI    |
| country  | SJ    |
| country  | SK    |
| country  | SL    |
| country  | SM    |
| country  | SN    |
| country  | SO    |
| country  | SR    |
| country  | ST    |
| country  | SV    |
| country  | SY    |
| country  | SZ    |
| country  | TC    |
| country  | TD    |
| country  | TF    |
| country  | TG    |
| country  | TH    |
| country  | TI    |
| country  | TK    |
| country  | TM    |
| country  | TN    |
| country  | TO    |
| country  | TP    |
| country  | TR    |
| country  | TT    |
| country  | TV    |
| country  | TW    |
| country  | TZ    |
| country  | UA    |
| country  | UG    |
| country  | UK    |
| country  | UM    |
| country  | US    |
| country  | UY    |
| country  | UZ    |
| country  | VA    |
| country  | VC    |
| country  | VE    |
| country  | VG    |
| country  | VN    |
| country  | VU    |
| country  | WF    |
| country  | WS    |
| country  | YE    |
| country  | YT    |
| country  | YU    |
| country  | ZA    |
| country  | ZM    |
| country  | ZR    |
| country  | ZW    |

<h2 id="tocS_UpdateOrganizationDto">UpdateOrganizationDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdateorganizationdto"></a>
<a id="schema_UpdateOrganizationDto"></a>
<a id="tocSupdateorganizationdto"></a>
<a id="tocsupdateorganizationdto"></a>

```json
{
  "name": "Doe Enterprises",
  "city": "New York",
  "country": "USA",
  "postal_code": "10001",
  "street_name": "5th Avenue",
  "street_number": "789",
  "state": "NY"
}
```

### Properties

| Name          | Type   | Required | Restrictions | Description                                           |
| ------------- | ------ | -------- | ------------ | ----------------------------------------------------- |
| name          | string | false    | none         | The name of the organization                          |
| city          | string | false    | none         | The city where the organization is located            |
| country       | string | false    | none         | The country where the organization is located         |
| postal_code   | string | false    | none         | The postal code of the organization's address         |
| street_name   | string | false    | none         | The street name of the organization's address         |
| street_number | string | false    | none         | The street number of the organization's address       |
| state         | string | false    | none         | The state or region where the organization is located |

<h2 id="tocS_DevicesOfOrganization">DevicesOfOrganization</h2>
<!-- backwards compatibility -->
<a id="schemadevicesoforganization"></a>
<a id="schema_DevicesOfOrganization"></a>
<a id="tocSdevicesoforganization"></a>
<a id="tocsdevicesoforganization"></a>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "type": "sensor",
  "serial": "SN-001"
}
```

### Properties

| Name   | Type   | Required | Restrictions | Description                         |
| ------ | ------ | -------- | ------------ | ----------------------------------- |
| id     | string | true     | none         | Identificador único del dispositivo |
| type   | string | true     | none         | Tipo de dispositivo                 |
| serial | string | true     | none         | Número de serie del dispositivo     |

<h2 id="tocS_CreateUser">CreateUser</h2>
<!-- backwards compatibility -->
<a id="schemacreateuser"></a>
<a id="schema_CreateUser"></a>
<a id="tocScreateuser"></a>
<a id="tocscreateuser"></a>

```json
{
  "name": "Jane",
  "surnames": "Doe",
  "email": "jane.doe@example.com",
  "password": "SecurePassword123!",
  "phone": "+1234567890",
  "birth_date": "1990-01-01",
  "nationality": "Canadian",
  "organization_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Properties

| Name            | Type   | Required | Restrictions | Description                               |
| --------------- | ------ | -------- | ------------ | ----------------------------------------- |
| name            | string | true     | none         | First name of the user                    |
| surnames        | string | true     | none         | Last name of the user                     |
| email           | string | true     | none         | Email address of the user                 |
| password        | string | true     | none         | Password of the user                      |
| phone           | string | true     | none         | Phone number of the user                  |
| birth_date      | string | true     | none         | Birth date of the user                    |
| nationality     | string | true     | none         | Nationality of the user                   |
| organization_id | string | true     | none         | Organization ID to which the user belongs |

<h2 id="tocS_Alarm">Alarm</h2>
<!-- backwards compatibility -->
<a id="schemaalarm"></a>
<a id="schema_Alarm"></a>
<a id="tocSalarm"></a>
<a id="tocsalarm"></a>

```json
{
  "event_type": "string",
  "event_id": "string",
  "value": 0,
  "timestamp": {},
  "params": {},
  "version": "string"
}
```

### Properties

| Name       | Type   | Required | Restrictions | Description |
| ---------- | ------ | -------- | ------------ | ----------- |
| event_type | string | true     | none         | none        |
| event_id   | string | true     | none         | none        |
| value      | number | true     | none         | none        |
| timestamp  | object | true     | none         | none        |
| params     | object | true     | none         | none        |
| version    | string | true     | none         | none        |

<h2 id="tocS_UpdateAlarm">UpdateAlarm</h2>
<!-- backwards compatibility -->
<a id="schemaupdatealarm"></a>
<a id="schema_UpdateAlarm"></a>
<a id="tocSupdatealarm"></a>
<a id="tocsupdatealarm"></a>

```json
{
  "event_type": "string",
  "event_id": "string",
  "value": 0,
  "timestamp": {},
  "params": {},
  "version": "string",
  "i_id": "string"
}
```

### Properties

| Name       | Type   | Required | Restrictions | Description |
| ---------- | ------ | -------- | ------------ | ----------- |
| event_type | string | false    | none         | none        |
| event_id   | string | false    | none         | none        |
| value      | number | false    | none         | none        |
| timestamp  | object | false    | none         | none        |
| params     | object | false    | none         | none        |
| version    | string | false    | none         | none        |
| i_id       | string | false    | none         | none        |
