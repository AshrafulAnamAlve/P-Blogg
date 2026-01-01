import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../share/navbar/navbar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { blogg } from '../Model/blogg';

@Component({
  selector: 'app-edit',
  imports: [Navbar,ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit implements OnInit{

  route =inject(ActivatedRoute)
  http = inject(HttpClient)
  router = inject(Router);
  
  blogEdit: FormGroup = new FormGroup({
    title: new FormControl("",Validators.required),
    category: new FormControl("",Validators.required),
    description: new FormControl("",Validators.required)
  })
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if(id){
      this.loadBlog(+id);
    }
  }
  
  loadBlog(id:number){
    this.http.get<blogg>(`https://blogg-api.runasp.net/api/Blogg/getBlogbyid/${id}`).subscribe({
      next:(res:blogg)=>{
        this.blogEdit.patchValue(res);
      },
      error:(err)=>{
        alert(err.error);
      }
    })
  }

  onEdit(){
    const id = this.route.snapshot.paramMap.get("id");
    const value = this.blogEdit.value;
    this.http.put(`https://blogg-api.runasp.net/api/Blogg/editBlogg/${id}`,value,{responseType:"text"}).subscribe({
      next:(res:any)=>{
        if(res=="Blog Edit Successfull"){
          alert(res);
          this.router.navigateByUrl("/profile")
        }
      },
      error:(err)=>{
        alert(err.error);
      }
    })
  }


}
