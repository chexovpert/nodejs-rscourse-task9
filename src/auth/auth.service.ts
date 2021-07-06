import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService
        ) {}
    async login(createUserDto: CreateUserDto) {
        const {login, password} = createUserDto
        const validatedUser = await this.validateUser(login, password)
        console.log(validatedUser);
        
        if (validatedUser) {
            const token = this.generateToken(validatedUser)
            console.log(token)
            return token;
        } else {
            return undefined;
          }
    }
    private async generateToken(user: User) {
        const { id, login } = user;
        const payload = {id, login}
        console.log(payload)
        //console.log(process.env.JWT_SECRET_KEY);
        
        return  {token: this.jwtService.sign(payload) }
    }
    private async validateUser(login: string,
        password: string) {
            const user = await this.userService.findOneByLogin(login)
            console.log(user)
            if (user){
            const { password: hashedPassword } = user;
            const comparisonRes = await bcrypt.compare(password, hashedPassword);
            if (user && comparisonRes) {
                return user
            }
        }
            return undefined
        }


}
