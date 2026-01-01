import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup= new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
  http = inject(HttpClient)
  router = inject(Router)
  
  onLogin(){
    const val = this.loginForm.value;
    debugger
    this.http.post("http://blogg-api.runasp.net/api/Blogg/Login",val).subscribe({
      next:(res: any)=>{
        if(res.message=="Login Seccusfull"){
          localStorage.setItem("isLoggedin","token");
          localStorage.setItem("userid",res.userid);
          this.router.navigateByUrl('/dashbord');
        }
      },
      error:(err)=>{
        alert("incurrect credintial");
      }
    })
  }
}
