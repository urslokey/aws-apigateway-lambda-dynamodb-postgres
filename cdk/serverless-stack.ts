import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';


export class ServerlessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dynamoDdb = new Table(this,'DataStackTable',{
      partitionKey: {
          name : 'id',
          type : AttributeType.STRING
      },
      tableName : 'architecture'
    });

    const myLambda = new NodejsFunction(this,'myRdsLambda',{
      runtime : Runtime.NODEJS_18_X,
      handler : 'handler',
      entry : join(__dirname,'..','src','handler','index.ts'),
      memorySize : 256
    });

    const api = new RestApi(this,'myRestApi');
    const employeeResource = api.root.addResource('seniorEmployees');
    const architectResource = api.root.addResource('architects');
    const employeesResource = api.root.addResource('employees');
    employeeResource.addMethod('GET',new LambdaIntegration(myLambda));
    employeeResource.addMethod('POST',new LambdaIntegration(myLambda));
    architectResource.addMethod('GET',new LambdaIntegration(myLambda));
    architectResource.addMethod('POST',new LambdaIntegration(myLambda));
    employeesResource.addMethod('GET',new LambdaIntegration(myLambda));

    myLambda.addToRolePolicy(new PolicyStatement({
      effect : Effect.ALLOW,
      resources : [ dynamoDdb.tableArn ],
      actions: [
        'dynamodb:*'
      ]
    }))

  }
}
