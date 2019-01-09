import { Component, OnInit,ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {} from '@types/googlemaps';
declare var sweetAlert: any;

// loader 

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
   categoryArr:any;
   totalDeals1 = [];
   userdetails=[];
  crdDeals = [{
    avlPlace:{
      latitude:'',
      longitude:''
    },
    accountId:''
  }];
  mapDeals=[];
  activeUsers=[]
  userName = {};
  errMsg = "";
  lat:any
  long:any
  lat1:any
  long1:any
  latd:any
  longd:any
  crdDeals1 = []
  queryString:any;
  p:any;
  getlat:any
  getlng:any
  getSearchDeals=[]
  querydetails:any;
  submitted:any;
  panTo:any;

  constructor(private _dealsService:DealsService,private route:Router,public loadingCtrl: NgxSpinnerService){
   
  }

  ngOnInit() {
    
    this.loadingCtrl.show();
   this._dealsService.getDeals()
      .subscribe(
        res =>{ 
          this.loadingCtrl.hide();
          this.crdDeals = res
          
    if (this.crdDeals.length == 0){
        this.loadingCtrl.hide();
        this.errMsg = "Currently no deals available"
        document.getElementById('hidePagination').style.display="none";
        document.getElementById('hideSearchDiv').style.display="none";
        document.getElementById('hideFilterButton').style.display="none";
      }

        },
        err =>{
          this.loadingCtrl.hide();
          console.log(err)
        } 
      )

      this._dealsService.getDetails()
      .subscribe(
        res =>{
          this.activeUsers = res
          //console.log(this.activeUsers)
      
      let k =0;
      for(let i=0;i<this.activeUsers.length;i++){
        for(let j=0;j<this.crdDeals.length;j++){
        if(this.activeUsers[i]._id == this.crdDeals[j].accountId) {
            if(this.activeUsers[i].status == 'ACTIVE'){
              this.crdDeals1[k] = this.crdDeals[j]
              k++;
            }
        }
      }
      }
      console.log( this.crdDeals1)
        },
        err=>{}
      )
     
       var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

      // tracking location 
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((position) => {
          this.showPosition(position);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
  }

  getCategory(){
 //   alert('1')
    this._dealsService.getCategory()
    .subscribe(
        res => {
          this.categoryArr = res;
          console.log(this.categoryArr)
        },
    
        err => {
            this.categoryArr = [];
        });
  }

  filterDeal(){
    // alert("2")
    this.loadingCtrl.show();
    this.totalDeals1 = [];
    this.getSearchDeals = this.crdDeals
    console.log(this.userdetails)
    this.querydetails = this.userdetails
    this.refreshGrid();
    this.loadingCtrl.hide();
  
  }
  refreshGrid(){
    //alert("2")
    //this.loadingCtrl.show();
    let j =0;
    console.log(this.getSearchDeals)
    for(let i=0; i < this.getSearchDeals.length; i++){
     // alert("3")
    
      console.log(this.getSearchDeals[i].quantity)
    if(this.querydetails.searchCategory == this.getSearchDeals[i].categoryId || this.querydetails.searchmainquantity <= this.getSearchDeals[i].quantity ||  this.querydetails.searchqnty == this.getSearchDeals[i].qnty || this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||  (this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price) || this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price))){
    
      //alert("4")
      this.loadingCtrl.hide();
      
      console.log(this.getSearchDeals[i])
      this.totalDeals1[j] = this.getSearchDeals[i]
      console.log(this.totalDeals1[j])
      j++;
      
    
    }
     
    
 
   this.loadingCtrl.hide();
  }
  if(this.totalDeals1.length == 0){
    console.log('no deals')
    sweetAlert("Currently no product available")
    this.userdetails = [];
  }
 
  this.userdetails = [];
  
  }

  findMe(){
  //   setTimeout( function(){
  //     location.reload()
  // }, 2000 );

  document.getElementById('hideButton').style.display='block';
  document.getElementById('showButton').style.display='block';
  // this.route.navigate[('/post')]
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      
       
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    console.log(this.currentLat)
    console.log(this.currentLong)
    localStorage.setItem('googleLat', JSON.stringify(this.currentLat));
    localStorage.setItem('googleLong', JSON.stringify(this.currentLong));

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }
}
