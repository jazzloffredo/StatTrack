import { FormGroup } from '@angular/forms';

export class RegistrationValidator {
    static validate(registrationFormGroup: FormGroup) {
        const password: string = registrationFormGroup.get('password').value;
        const confirmPassword: string = registrationFormGroup.get('confirmPassword').value;

        if (!confirmPassword === null && confirmPassword.length <= 0) {
            return null;
        }

        if (confirmPassword !== password) {
            return {
                matchesPassword: true
            };
        }

        return null;
    }
}
