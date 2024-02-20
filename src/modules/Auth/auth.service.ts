import { Injectable } from "@nestjs/common"

@Injectable()
export class AuthService{

    constructor(){}

    testFunction(param): string{
        return `test method using the param ${param}`
    }
}