import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Name ko được để trống" })
    name: string;
    @IsNotEmpty({ message: "Email không được để trống" })
    @IsEmail({}, { message: "Email không đúng định dạng" })
    email: string;
    @IsNotEmpty({ message: "PassWord không được để trống" })
    password: string;

    phone: string;
    address: string;
    image: string;

}
