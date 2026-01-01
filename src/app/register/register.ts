import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email, validate } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  http = inject(HttpClient);
  router = inject(Router)
  RegForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  })

  onRegister(){
    debugger
    const value = this.RegForm.value;
    this.http.post("http://blogg-api.runasp.net/api/Blogg/Register",value,{responseType: 'text'}).subscribe({
      next:(res:any)=>{
        debugger
        if(res=="User registered successfully"){
          alert(res);
          this.RegForm.reset();
          this.router.navigateByUrl("/login")
        }
      },
      error:(error)=>{
        debugger
        alert(error.error);
      }
    });
  }
}
