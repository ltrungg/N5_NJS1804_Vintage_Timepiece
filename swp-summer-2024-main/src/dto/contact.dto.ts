import { IsEmail, IsNotEmpty } from "class-validator";

export class ContactDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    message: string;
}