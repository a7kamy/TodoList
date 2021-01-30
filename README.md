# Udacity ToDos Serverless capstone project

- create todo , list all todos , update and also delete
- attach an image to a todo item

## Project Components

- Restful API (Lambda Functions, API Gateway and DynamoDb)
- Client (React)

## How to run the application

### Deploy Backend

To deploy an application run the following commands:

```bash
cd backend
npm install
sls deploy -v
```

### Update frontend configuration

```js
const apiId = 'e1cepbmjm0'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-bkz5p8-g.us.auth0.com', // Auth0 domain
  clientId: 'IuxhKspQ3fo8rJDACiYeCO7EaDTXz9OC', // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
```

### Frontend

```bash
cd client
npm install
npm run start
```

## Current Deplyment details

API Endpoint

```
https://2z9sdic1hj.execute-api.us-east-1.amazonaws.com/dev/todos
```

Postman Collection

```
Udacity Cloud developer capstone.postman_collection.json
```
