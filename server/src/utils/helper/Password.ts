import bcryptjs from 'bcryptjs';

export class PasswordManager {
    async hash(password: string){
        const saltRounds = 10;
        return await bcryptjs.hash(password, saltRounds);
    };
      
    async compare(password:string, hash: string){
        return await bcryptjs.compare(password, hash);
    };
}