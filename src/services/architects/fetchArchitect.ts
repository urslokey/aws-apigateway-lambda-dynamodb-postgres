import {  BatchGetItemCommand, DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

async function fetchArchitect(event:APIGatewayProxyEvent,ddbClient:DynamoDBClient): Promise<APIGatewayProxyResult>{

    if(event.queryStringParameters){
      if('experience' in event.queryStringParameters){
    
        const experience:any = event.queryStringParameters['experience'];

        let params = {
            TableName : 'architecture',
            FilterExpression: "contains(#experience, :experience)",
            ExpressionAttributeNames: {
                "#experience": "experience",
            },
            ExpressionAttributeValues: {
                ":experience": { S: experience },
            }       
        };
      

      const result = await ddbClient.send(new ScanCommand(params));
      const unmarshelledItems = result.Items?.map(item=>unmarshall(item))
      return {
          statusCode: 200,
          body: JSON.stringify(unmarshelledItems),
        };

      }else{
        return {
          statusCode: 400,
          body : JSON.stringify('experience required')
      }
      }
    
    }

      const result = await ddbClient.send(new ScanCommand({
          TableName : 'architecture'
      }));
      const unmarshelledItems = result.Items?.map(item=>unmarshall(item))


    return {
        statusCode: 200,
        body: JSON.stringify(unmarshelledItems),
      };
}

export { fetchArchitect };