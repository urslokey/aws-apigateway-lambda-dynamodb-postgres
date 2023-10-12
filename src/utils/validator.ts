import { randomUUID } from "crypto";
import { Entry } from "./model";

export class MissingfieldError extends Error{
    constructor(missingField:string){
        super(`Value for ${missingField}  expected!`)
    }
}


export class JsonError extends Error {}

export function parseJSON(arg:string){
    try{
        return JSON.parse(arg);
    }catch(error:any){
        throw new JsonError(error)
    }
}

export function validateFields(arg:any){
    
    if((arg as Entry).name == undefined){
        throw new MissingfieldError('name')
    }
    if((arg as Entry).experience == undefined){
        throw new MissingfieldError('experience')
    }
}

export function randomIdString(){
    return randomUUID();
}