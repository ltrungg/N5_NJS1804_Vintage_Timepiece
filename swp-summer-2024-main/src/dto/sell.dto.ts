import { IsNotEmpty,IsEmail,IsNumber } from "class-validator";

export class CreateSellDto {
  @IsNotEmpty()
  watchName: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  imagePath: string;
  }