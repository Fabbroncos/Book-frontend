import { HttpClient } from '@angular/common/http'
import { Component, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { environment } from 'src/environments/environment.prod'

@Component({
  selector: 'app-password-recovery-component',
  templateUrl: './password-recovery.component.html',
})
export class PasswordRecoveryComponent {
  emailSend: boolean = false
  showError: boolean = false
  errorMessage: string = ''
  email: string = ''
  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showError = true
      this.errorMessage = 'Inserisci un email valida'
      return
    }

    this.email = form.value['email']
    console.log(form.value['email'])
    this.onSend()
  }
  onSend() {
    this.http.post(`${environment.apiUrl}//v1/auth/password-recovery`, { email: this.email }).subscribe(
      (success) => {
        this.emailSend = true
      },
      (error) => {
        this.emailSend = false
        if (error.error.errorMessage === 'Not Found') {
          this.errorMessage = 'Nessun account trovato per questa email'
        } else if (error.error.errorMessage === 'New Password Recovery') {
          this.errorMessage = 'Un email è gia stata inviata, aspetta 30 minuti prima di richiederne un altra'
        } else {
          this.errorMessage = error.error.errorValidation[0].email
        }
        console.log(error)

        this.showError = true
      },
    )
  }
}
