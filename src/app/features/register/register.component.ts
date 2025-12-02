import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  loading = signal(false);

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]],
    },
    {
      validators: (group) =>
        group.get('password')?.value === group.get('passwordConfirm')?.value
          ? null
          : { passwordMismatch: true },
    },
  );

  async submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    const { nombre, apellido, email, password } = this.form.getRawValue();
    try {
      await this.auth.register({ nombre, apellido, email, password });
      this.messageService.add({
        severity: 'success',
        summary: 'Cuenta creada',
        detail: 'Ya podés iniciar sesión',
      });
      await this.router.navigate(['/login']);
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al registrar',
        detail: err?.error?.message || 'No se pudo crear la cuenta',
      });
    } finally {
      this.loading.set(false);
    }
  }
}
