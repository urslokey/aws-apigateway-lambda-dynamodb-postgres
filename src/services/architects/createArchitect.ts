import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { parseJSON, randomIdString, validateFields } from "../../utils/validator";
import { marshall } from "@aws-sdk/util-dynamodb";

async function createArchitect(event:APIGatewayProxyEvent,ddbClient:DynamoDBClient){
    const randomId = randomIdString();

    try{
        let item = parseJSON(event.body as any);
        item.id = randomId;
        validateFields(item);
    
        await ddbClient.send(new PutItemCommand({
            TableName : 'architecture',
            Item : marshall(item)
        }));
    }catch(error){
        return {
            statusCode: 500,
            body : JSON.stringify(error)
          };
    }
    return {
        statusCode: 201,
        body : JSON.stringify({ id: randomId})
      };
}

export { createArchitect };


