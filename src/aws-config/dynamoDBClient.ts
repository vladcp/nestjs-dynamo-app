import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import 'dotenv/config'

const {ENDPOINT_URL, REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;

export const dynamoDBClient = new DynamoDBClient({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: REGION,
  endpoint: ENDPOINT_URL
})

export const docClient = DynamoDBDocumentClient.from(dynamoDBClient)

export const main = async () => {
  const command = new ListTablesCommand({});
  
  const response = await dynamoDBClient.send(command)
  console.log(response.TableNames.join("\n"))
  return response;
}