import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../share/navbar/navbar';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashbord',
  imports: [ CommonModule,FormsModule,Navbar,RouterLink],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord {
 blogs: any[]=[];
  http = inject(HttpClient)
   private cdr = inject(ChangeDetectorRef);
 scroll(){
    document.getElementById('blog')?.scrollIntoView({behavior:'smooth'})
  }
constructor(){
  this.getallblog();
}
//  ngOnInit(): void {
//   this.getallblog();
//  }

 getallblog(){
     this.http.get("https://blogg-api.runasp.net/api/Blogg/getAllblogg").subscribe({
    next:(res: any)=>{
      this.blogs=res;
      console.log("blog fatch successfull")
      this.cdr.detectChanges();
    },
    error:(err)=>{
      alert("Blog not updated");
    }
   })
 }

}
