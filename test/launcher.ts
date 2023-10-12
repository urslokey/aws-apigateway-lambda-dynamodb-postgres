import { handler } from "../src/handler";

handler({
    path : '/architects',
    httpMethod : 'GET',
    // queryStringParameters : {
    //     experience:"2"
    // },
    // body : {
    //     name:"test-6",
    //     experience:"6"
    // }
 
} as any).then(result=>{
    console.log("result",result);
});