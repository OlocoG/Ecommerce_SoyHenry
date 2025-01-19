import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from "class-validator"

export class RegisterProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number;

    @IsNotEmpty()
    @IsUrl()
    imgUrl: string;
}
export class updateProductDto extends PartialType(RegisterProductDto) {}