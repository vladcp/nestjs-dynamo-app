## Local testing using Docker compose and DynamoDB local
1. Build nestjs app Docker image: 

`docker build -t nestjs-dynamo-app .`

2. Run `docker compose up`

3. First time: Create a new 'book' DynamoDB table using the test route `PUT /book/createTable` with empty body.

4. Test the `GET /book`, `GET /book/:bookId`, `PUT /book`, `PATCH/book/:bookId` requests via Postman on `http://localhost:3000`