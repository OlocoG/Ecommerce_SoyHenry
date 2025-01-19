import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface{
    validate(passsword: string, args: ValidationArguments){
        if (passsword !== args.object[args.constraints[0]]) return false;
        return true;
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Password does not match'
    }
}