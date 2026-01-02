import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { user } from '../Model/blogg';

@Component({
  selector: 'app-blog-detils',
  imports: [CommonModule,RouterLink],
  templateUrl: './blog-detils.html',
  styleUrl: './blog-detils.css',
})
export class BlogDetils implements OnInit{
  private cdr = inject(ChangeDetectorRef);
blog:any
user: user |null = null;
  route = inject(ActivatedRoute)
http=inject(HttpClient)
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if(id){
      this.getblog(+id);
      
    }
    
  }
  getUserBlogg(userId:number){
    this.http.get<user>(`https://blogg-api.runasp.net/api/Blogg/getUserByBlogg/${userId}`).subscribe({
      next:(res)=>{
        this.user = res;
        console.log("user of this blog" ,res)
        this.cdr.detectChanges();
      },
      error:(err)=>{
        alert(err.error);
      }
    });
  }

  getblog(id:number){
    this.http.get(`https://blogg-api.runasp.net/api/Blogg/getBlogbyid/${id}`).subscribe({
      next:(res:any)=>{
        this.blog=res;
        this.cdr.detectChanges();

        if(this.blog.userId){
          this.getUserBlogg(this.blog.userId);
        }
      },
      error:(err)=>{
        alert("no blog found");
      }
    })
  }


}
