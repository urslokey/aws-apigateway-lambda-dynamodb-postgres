import "reflect-metadata";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { employeeList } from "../services/employees/employeeStaticData";
import { AppDataSource } from "../utils/db";
import { createSeniorEmployees } from "../services/employees/createSeniorEmployees";
import { fetchSeniorEmployees } from "../services/employees/fetchSeniorEmployees";
import { createArchitect } from "../services/architects/createArchitect";
import { fetchArchitect } from "../services/architects/fetchArchitect";
import { JsonError, MissingfieldError } from "../utils/validator";


const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  let message: string = "";
  try {
      if(!AppDataSource.isInitialized){
          await AppDataSource.initialize().then(()=>{
            console.log("Conneted To database");
          }).catch((error)=>{
            console.log("Not Conneted To database",error);
            return {
              statusCode: 500,
              body: JSON.stringify(error),
            };
          })
      }

    if(event.path == '/architects'){ /** DynamoDb */
      switch (event.httpMethod) {
        case 'GET':
          const farcRes = await fetchArchitect(event,ddbClient);
          return farcRes;
          break;
        case 'POST':
          const carcRes = await createArchitect(event,ddbClient);
          return carcRes;
          break;
        default:
          break;
      }
    }else if(event.path == '/seniorEmployees'){ /** PostgreSql */

      switch (event.httpMethod) {
        case 'GET':
          const fsempRes = await fetchSeniorEmployees(event);
          return fsempRes;
          break;
        case 'POST':
          const csempRes = await createSeniorEmployees(event);
          return csempRes;
          break;
        default:
          break;
      }
    }else{
      const employeesResponse = await employeeList();
      return employeesResponse;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(message),
    };
  } catch (error) {

    if(error instanceof MissingfieldError){
      return {
        statusCode: 400,
        body: JSON.stringify(error.message),
      };
    }

    if(error instanceof JsonError){
      return {
        statusCode: 400,
        body: JSON.stringify(error.message),
      };
    }


    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}

export { handler };
