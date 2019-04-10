import { FormGroup } from '@angular/forms';

export class RegistrationValidator {
    static validate(registrationFormGroup: FormGroup) {
        const password = registrationFormGroup.get('password').value;
        const confirmPassword = registrationFormGroup.get('confirmPassword').value;

        if (confirmPassword.length <= 0) {
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
