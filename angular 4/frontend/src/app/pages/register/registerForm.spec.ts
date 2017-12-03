import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';

describe('RegisterFormComponent', () => {
  let component: RegisterComponent;

  beforeEach(() => {
    component = new RegisterComponent(null, new FormBuilder());
    component.ngOnInit();
  });

  it('Should create a form with 5 controls', () => {
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('firstName')).toBeTruthy();
    expect(component.registerForm.contains('lastName')).toBeTruthy();
    expect(component.registerForm.contains('password')).toBeTruthy();
    expect(component.registerForm.contains('passwordCheck')).toBeTruthy();
  });

  it('Should test the email control for required and the pattern', () => {
    const control = component.registerForm.get('email');

    // check required
    control.setValue('');

    expect(control.valid).toBeFalsy();

    // 2nd test
    control.setValue('nivek');

    expect(control.valid).toBeFalsy();

    // 3rd test
    control.setValue('nivek');

    expect(control.valid).toBeFalsy();

    // 4th test which should be correct
    control.setValue('pieter@gmail.com');

    expect(control.valid).toBeTruthy();
  });

  it('Should test the password control for required and minimum length of 4', () => {
    const control = component.registerForm.get('password');

    // check required
    control.setValue('');

    expect(control.valid).toBeFalsy();

    // 2nd test check length
    control.setValue('123');

    expect(control.valid).toBeFalsy();

    // 3rd test check length
    control.setValue('nivek');

    expect(control.valid).toBeTruthy();
  });

  it('Should test the passwordCheck control for required and equal to password', () => {
    const controlPassword = component.registerForm.get('password');
    const controlPasswordCheck = component.registerForm.get('passwordCheck');

    // check required
    controlPasswordCheck.setValue('');

    expect(controlPasswordCheck.valid).toBeFalsy();

    // 2nd test check if the same and password minlength 4
    controlPassword.setValue('123');
    controlPasswordCheck.setValue('123');

    expect(controlPassword.valid).toBeFalsy();
    expect(controlPasswordCheck.valid).toBeTruthy();

    // 3rd test check if the same and password minlength 4
    controlPassword.setValue('1234');
    controlPasswordCheck.setValue('123abc');

    expect(controlPassword.valid).toBeTruthy();
    expect(controlPasswordCheck.valid).toBeFalsy();

    // 4th test check if the same and password minlength 4
    controlPassword.setValue('1234');
    controlPasswordCheck.setValue('1234');

    expect(controlPassword.valid).toBeTruthy();
    expect(controlPasswordCheck.valid).toBeTruthy();
  });

});
