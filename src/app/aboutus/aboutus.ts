import { Component, inject } from '@angular/core';
import { Navbar } from '../share/navbar/navbar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgValidationError } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aboutus',
  imports: [Navbar,ReactiveFormsModule],
  templateUrl: './aboutus.html',
  styleUrl: './aboutus.css',
})
export class Aboutus {
   http = inject(HttpClient);
  contuctForm= new FormGroup({
    name: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
    message: new FormControl("",Validators.required),
  });

  onSubmit(){
    if(this.contuctForm.invalid)return alert("please fill all field");

    this.http.post("https://blogg-api.runasp.net/api/Blogg/sendEmail",this.contuctForm.value,{responseType:"text"}).subscribe({
      next:(res:any)=>{
        if(res=="Email sent successfully"){
          alert("Thank you for your message");
        }
        this.contuctForm.reset();
      },
      error:(err)=>{
        alert(err.error)
      }
    });
  }

}
