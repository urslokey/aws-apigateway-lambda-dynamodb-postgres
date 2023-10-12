# Welcome to your CDK TypeScript project

This project developed by using sql(**Postgres**) & nosql(**Dynamodb**) databases.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

# REST API

The REST API to the example app is described below.

## Get list of Employees

### Request

`GET /employees`

    curl -i -H 'Accept: application/json' http://your_project_url/employees

### Response

    HTTP/1.1 200 OK
    Date: Thu, 12 Oct 2023 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [ {"id": 1,"name":1,"position":"Foo" }]

## Get list of Senior Employees

### Request

`GET /seniorEmployees`

    curl -i -H 'Accept: application/json' http://your_project_url/seniorEmployees

### Response

    HTTP/1.1 200 OK
    Date: Thu, 12 Oct 2023 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [ {"id": 1,"name":1,"experience":4 }]

## Get senior exployees based on experience

### Request

`GET /seniorEmployees?experience=2`

    curl -i -H 'Accept: application/json' http://your_project_url/seniorEmployees?experience=2

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    [ {"id": 1,"name":1,"experience":2 }]

## Create a new senior employee

### Request

`POST /seniorEmployees`

    curl -i -H 'Accept: application/json' -d 'name=test&experience=4' http://http://your_project_url/seniorEmployees

### Response

    HTTP/1.1 200 Created
    Date: Thu, 12 Oct 2023 12:36:30 GMT
    Status: 200 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

## Get list of Architects

### Request

`GET /architects`

    curl -i -H 'Accept: application/json' http://your_project_url/architects

### Response

    HTTP/1.1 200 OK
    Date: Thu, 12 Oct 2023 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [ {"id": 1,"name":1,"experience":4 }]

## Get architects based on experience

### Request

`GET /architects?experience=2`

    curl -i -H 'Accept: application/json' http://your_project_url/architects?experience=2

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    [ {"id": 1,"name":1,"experience":2 }]

## Create a new architect

### Request

`POST /architects`

    curl -i -H 'Accept: application/json' -d 'name=test&experience=4' http://http://your_project_url/architects

### Response

    HTTP/1.1 200 Created
    Date: Thu, 12 Oct 2023 12:36:30 GMT
    Status: 200 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36
