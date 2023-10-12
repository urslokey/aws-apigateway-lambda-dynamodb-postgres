
import { Employee } from "../../entity/employee.entity";
import { AppDataSource } from "../../utils/db";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { parseJSON, validateFields } from "../../utils/validator";

async function createSeniorEmployees(event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult>{

  const employee:any = parseJSON(event.body as any);
  validateFields(employee)
  await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Employee)
      .values(employee)
      .execute()

  return {
        statusCode: 201,
        body: JSON.stringify("Created successfullty"),
    };
}

export { createSeniorEmployees };