import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // map vars start
  latitude = 0;
  longitude = 0;
  center;
  markerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [{ lat: this.latitude, lng: this.longitude }];
  zoom = 8;
  display?: google.maps.LatLngLiteral;
  // map vars end

  constructor(
    public _themeService: ThemesManagerService
  ) { }

  ngOnInit(): void {
    this.latitude = parseFloat(this._themeService?.data?.address?.latitude)
    this.longitude = parseFloat(this._themeService?.data?.address?.longitude) //check
    this.markerPositions = [{ lat: this.latitude, lng: this.longitude }]
    this.center = { lat: this.latitude, lng: this.longitude };
  }

  contactForm = new FormGroup({
    fullName: new FormControl(''),
    mobileNumber: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });

  onSubmit() {
    try {
      console.log("Contact Form is", this.contactForm.value)
      if(this.contactForm.value.fullName && this.contactForm.value.mobileNumber && this.contactForm.value.message){
        this._themeService.makeEnquiry(this.contactForm.value.fullName, this.contactForm.value.mobileNumber, this.contactForm.value.message, this.contactForm.value.email)
        Swal.fire('Thanks for being awesome!', 'We have received your message and would like to thank you for writing to us. If your inquiry is urgent, please use the telephone number listed below to talk to one of our staff members. Otherwise, we will reply by email as soon as possible.', 'success')
        this.contactForm.reset()
      }
      else{
        Swal.fire(
          'Please fill all the fields properly',
          'Your message not submitted :(',
          'error'
        )
      }
      
    } catch{
      Swal.fire(
        'Something Went Wrong',
        'Your message not submitted :(',
        'error'
      )
    }
  }

  getCover() {
    if (this._themeService?.data?.themeCover) {
      return "url('" + this._themeService?.data?.themeCover + "')"
    }
    else {
      return "url('../../../../../assets/Images/default_product_cover_background.jpg')";
    }
  }

}
