import { APIGatewayProxyEvent } from "aws-lambda";
import { AppDataSource } from "../../utils/db";
import { Employee } from "../../entity/employee.entity";

async function fetchSeniorEmployees(event:APIGatewayProxyEvent){
  let employees :any = {};
  if(event.queryStringParameters && ('experience' in event.queryStringParameters)){
    const experience = event.queryStringParameters['experience'];
    employees = await AppDataSource.getRepository(Employee).find({ where : { experience : experience } });
  }else{
    employees = await AppDataSource.getRepository(Employee).find();
  }
 
    return {
        statusCode: 200,
        body: JSON.stringify(employees),
      };
}

export { fetchSeniorEmployees };