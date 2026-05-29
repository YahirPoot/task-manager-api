import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '../generated/prisma/models';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get("user/:id")
    async getUserById(@Param("id") id: string): Promise<UserModel | null> {
        return this.userService.user({ id: id})
    }

    @Get("get-users")
    async getUsers(): Promise<UserModel[] | null> {
        return this.userService.users({});
    }

    @Post("create-user")
    async registerUser(@Body() userData: {
        name: string; email: string; password: string;
    }): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @Delete("delete")
    async deleteUser(@Param("id") id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: id });
    }

}
