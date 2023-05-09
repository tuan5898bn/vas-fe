export class ErrorMess {
   static readonly REQUIRE = "This field is require";
   static readonly EMPLOYEE_ID_MAXLENGTH = "This field is less than 36 character";
   static readonly EMPLOYEE_NAME_MAXLENGTH = "This field is less than 100 character";
   static readonly EMPLOYEE_EMAIL_PARTTEN = "Wrong email";
   static readonly EMPLOYEE_PHONE_PARTTEN = "Please enter a valid phone";
   static readonly EMPLOYEE_ADDRESS_MAXLENGTH = "Address is less than 100 character";
   static readonly EMPLOYEE_USERNAME_MINLENGTH = "Username is more than 6 character";
   static readonly EMPLOYEE_PASSWORD_MINLENGTH = "Password is more than 6 character";

   static readonly VACCINE_ID_LENGTH = "This field is 10 characters";
   static readonly VACCINE_NAME_MAXLENGTH = "This field is less than 50 characters";
   static readonly NUMBER_OF_INJECTION_LENGTH = "This field is less than 15 characters";
   static readonly NUMBER_PATTERN = "This field is number"
   static readonly MAXLENGTH_200 = "This field is less than 200 characters";
   static readonly DATE_PATTERN = "This field must dd/mm/yyyy"
   static readonly ORIGIN_MAXLENTGH = "This field is less than 50 characters";

   static readonly VACCINE_TYPE_NAME_MAXLENGTH = "This fiel is less than 50 character";
   static readonly VACCINE_TYPE_DESCRIPTION_MAXLENGTH = "This fiel is less than 200 character";
   static readonly EMPLOYEE_BIRTH_INVALID = "The age is not valid, please check date of birth!";
   static readonly CREATE_EMPLOYEE = "CREATE EMPLOYEE FAIL";
   static readonly UPDATE_EMPLOYEE = "UPDATE EMPLOYEE FAIL";
   static readonly ACCESS_DENIED = "You no have role to access this function";
  }


