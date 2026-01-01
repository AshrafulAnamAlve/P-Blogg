import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { blogg, user } from '../Model/blogg';
import { Navbar } from '../share/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [Navbar,CommonModule,RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit{

  http = inject(HttpClient);
  router = inject(Router)
  blog:blogg[]=[];
  private cdr = inject(ChangeDetectorRef)
  user: user | null =null;
ngOnInit(): void {
  const id = localStorage.getItem("userid");
  if(id){
    this.getUser(+id);
    this.getUserBlogg(+id);
  }

}

getUser(id:number){
  this.http.get<user>(`https://blogg-api.runasp.net/api/Blogg/getUserDetls/${id}`).subscribe({
    next:(res)=>{
      this.user=res;
      this.cdr.detectChanges();
      console.log(res)
    },
    error:(err)=>{
      alert(err.error);
    }
  })
}

getUserBlogg(id:number){
  this.http.get<blogg[]>(`https://blogg-api.runasp.net/api/Blogg/getUserBloggs/${id}`).subscribe({
    next:(res:blogg[])=>{
      this.blog=res;
      console.log("User Blogg featch");
      this.cdr.detectChanges();
    },
    error:(err)=>{
      alert(err.error);
    }
  })
}

onDelete(id:number){
  const ok = confirm("Are you sure you want to delete this blog?");
  if(!ok)return;
  this.http.delete(`https://blogg-api.runasp.net/api/Blogg/deleteBlogg/${id}`,{responseType:"text"}).subscribe({
    next:(res:any)=>{
      if(res=="Blog Deleted Successfull"){
        alert(res);
        window.location.reload();
      }
    },
    error:(err)=>{
      alert(err.error);
    }
  })
}

}
