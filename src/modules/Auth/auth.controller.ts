import { Controller, Get } from "@nestjs/common"
import { AuthService } from "./auth.service"

@Controller('/auth')
export class AuthController{
    constructor(private readonly authservice : AuthService){}

    @Get()
    testFunction(){
        return this.authservice.testFunction("Ahmad")
    }
    
}