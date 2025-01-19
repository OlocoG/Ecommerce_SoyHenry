import { ApiHideProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator"
import { MatchPassword } from "src/Decorators/match_password.decorator";

export class CreateUserDto  {
    /** @example Oloco */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    /** @example santillanfrancisco075@gmail.com */
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    /** @example Password123! */
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    })
    password: string;

    /** @example Password123! */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password']) //custom validator
    confirmPassword: string;

    /** @example 123 Main St */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    /** @example 3884630512 */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /** @example Cordoba */
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country?: string | undefined;

    /** @example Cordoba */
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city?: string | undefined;

    @IsString()
    apodo?: string;
    
}

export class LoginUserDto {
   /** @example santillanfrancisco075@gmail.com */
  @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    /** @example Password123! */
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    })
    password: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}