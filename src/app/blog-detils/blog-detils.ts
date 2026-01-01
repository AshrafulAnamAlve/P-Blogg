import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-detils',
  imports: [CommonModule,RouterLink],
  templateUrl: './blog-detils.html',
  styleUrl: './blog-detils.css',
})
export class BlogDetils implements OnInit{
  private cdr = inject(ChangeDetectorRef);
blog:any
  route = inject(ActivatedRoute)
http=inject(HttpClient)
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if(id){
      this.getblog(+id);
    }
    
  }

  getblog(id:number){
    this.http.get(`http://blogg-api.runasp.net/api/Blogg/getBlogbyid/${id}`).subscribe({
      next:(res:any)=>{
        this.blog=res;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        alert("no blog found");
      }
    })
  }


}
