import { Component, OnInit,ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import {} from '@types/googlemaps';
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})

export class DealsComponent implements OnInit {

  //for location 
  @ViewChild('gmap')gmapElement: any;
  map: google.maps.Map;
  currentLat: any;
  currentLong: any;
  marker: google.maps.Marker;
   isTracking = false;
   status:any;
  //-------
  crdDeals = [];
  userName = {};
  errMsg = "";
  constructor(private _dealsService:DealsService,private route:Router,public loadingCtrl: NgxSpinnerService){}

  ngOnInit() {
   this.loadingCtrl.show();
    this._dealsService.getDeals()
      .subscribe(
        res =>{  this.loadingCtrl.hide();
          this.crdDeals = res
        },
        err => console.log(err)
      )
     
      if (this.crdDeals == null){
        this.errMsg = "Still you didn't post any deals"
        document.getElementById('search_box').style.display='none';
        console.log(this.errMsg)
      }


    //    var mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

      //tracking location 
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     this.showPosition(position);
      //   });
      // } else {
      //   alert("Geolocation is not supported by this browser.");
      // }
  }


  // viewMore(){
  //   this.router.navigate[('/viewmore')]
  // }

  // findMe(){
   
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.showPosition(position);
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }

  // showPosition(position) {
  //   this.currentLat = position.coords.latitude;
  //   this.currentLong = position.coords.longitude;

  //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //   this.map.panTo(location);

  //   if (!this.marker) {
  //     this.marker = new google.maps.Marker({
  //       position: location,
  //       map: this.map,
  //       title: 'Got you!'
  //     });
  //   }
  //   else {
  //     this.marker.setPosition(location);
  //   }
  // }
}
