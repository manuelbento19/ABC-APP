import jwt from "jsonwebtoken";
import { configuration } from "../../config";

export class TokenManager {
    
    private secretKey: string;

    constructor(){
        this.secretKey = configuration.secret.key
    }

    generate(payload: string){
        return jwt.sign(payload, this.secretKey);
    }

    verify(token:string){
        return jwt.verify(token, this.secretKey) as string;
    }
}
