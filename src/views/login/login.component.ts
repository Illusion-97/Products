import {Component, inject} from '@angular/core';
import {AbstractFormGroupComponent} from "../../tools/abstract-form-group-component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends AbstractFormGroupComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl("yadekalom@gmail.com", {validators: [Validators.email, Validators.required]}),
    password: new FormControl("Password", {validators: [Validators.minLength(6), Validators.required]}),
  })


  private service : AuthService = inject(AuthService)
  private router: Router = inject(Router)

  onSubmit$(): void {
    this.service.login(this.form.value).subscribe(() => this.router.navigate(['/']))
  }
}
