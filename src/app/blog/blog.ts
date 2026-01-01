import { Component, inject } from '@angular/core';
import { Navbar } from '../share/navbar/navbar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { required } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  imports: [Navbar,ReactiveFormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  http = inject(HttpClient)
  selectedFile: File | null = null;

  bloggForm: FormGroup=new FormGroup({
  title: new FormControl("",Validators.required),
  category: new FormControl("",Validators.required),
  description: new FormControl("", Validators.required),
  imageUrl: new FormControl(""),
  userid: new FormControl(localStorage.getItem("userid"))
});

onFileSelect(event:any){
  this.selectedFile = event.target.files[0];
}

onSubmit(){
  if(!this.selectedFile){
    alert("Please select an image first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", this.selectedFile);

  // 1️⃣ প্রথমে image upload
  this.http.post("http://blogg-api.runasp.net/api/Blogg/upload", formData)
  .subscribe({
    next:(res:any)=>{
      // 2️⃣ Upload শেষে URL form এ বসানো
      this.bloggForm.patchValue({ imageUrl: res.imageUrl });

      // 3️⃣ এবার blog save করা হবে
      const value = this.bloggForm.value;
      this.http.post("http://blogg-api.runasp.net/api/Blogg/AddBlogg", value, { responseType: "text" })
      .subscribe({
        next:(msg)=>{
          if(msg == "Blogg added successfully"){
            alert("Blog created with image successfully!");
            this.bloggForm.reset();
            this.selectedFile = null;
            // userid আবার বসাতে হবে, reset এর পর
            this.bloggForm.patchValue({ userid: localStorage.getItem("userid") });
          }
        },
        error:(err)=> alert(err.error)
      });

    },
    error:(err)=> alert("Image upload failed!")
  });
}



 
}
