import { Injectable } from '@angular/core';
import { Location } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  websiteLoader:boolean = false
  constructor(private location: Location) { }

  showToast(type: string, title: string, message: string) {
    // if (type == "success") {
    //   this.toastr.success(title, message)
    // }
    // if (type == "error") {
    //   this.toastr.error(title, message)
    // }
    // if (type == "info") {
    //   this.toastr.info(title, message)
    // }
    // if (type == "warning") {
    //   this.toastr.warning(title, message)
    // }
  }
  showLoader() {
    // this.loader.start();
  }
  stopLoader() {
    // this.loader.stop()
  }

  processImages(files: []) {
    let images = []
    if (files.length === 0)
      return;
    files.forEach((file: any) => {
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        // this.showToast("danger", "Invalid File", "Only Images are supported")
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        //this.imgURL = reader.result; 
        //this.image=files[0];
        images.push(reader.result)
      }
    })
  }

  startThemeLoader() {
    this.websiteLoader = true
    // document.getElementsByTagName("body").style.overflow = ""
  }

  stopThemeLoader() {
    this.websiteLoader = false
  }

  back(): void {
    this.location.back()
  }
  
}
