import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import {ActivatedRoute} from '@angular/router';
import {Router, ParamMap} from '@angular/router';
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-deactive-deals',
  templateUrl: './deactive-deals.component.html',
  styleUrls: ['./deactive-deals.component.css']
})
export class DeactiveDealsComponent implements OnInit {
  crdDeals = [];
  userName = {};
  userDeals = [];
  id:any;

  errMsg : any
  success:any
  queryString:any;
  p:any;
  constructor(private  _dealsService:DealsService,private route:ActivatedRoute,private router:Router,public loadingCtrl: NgxSpinnerService) { 
    for(let i=1;i<=1; i++){
      this.userDeals.push('Angular ${i}.0');
      }
    }

    ngOnInit() {

      this.userName = JSON.parse(localStorage.getItem('currentUser'));
      this.loadingCtrl.show();
      this._dealsService.getDeals()
        .subscribe(
          res =>{
            this.loadingCtrl.hide();
            let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
            let j = 0;
            
            this.crdDeals = res
            let CurrentDate = new Date().toISOString();
            for(let i=0 ; i < this.crdDeals.length ; i++){
              if((acntID == this.crdDeals[i].accountId) && (this.crdDeals[i].validityTime < CurrentDate)){
                this.userDeals[j] = this.crdDeals[i];
            j++;
              }
             
              
            }
            for(let j=0;j<this.userDeals.length;j++){
            if (this.userDeals[j].category == undefined){
              this.loadingCtrl.show();
              this.errMsg = "No expired products found"
              document.getElementById('search_box').style.display='none';
              document.getElementById('hide').style.display='none';
              document.getElementById('hideTable').style.display='none';
              document.getElementById('hidePagination').style.display='none';
             
              this.loadingCtrl.hide();
            }
          }
          
       
          },
          err =>{
            this.loadingCtrl.hide();
            console.log(err)
          } 
        )
    }

    deleteuser(){
      this.id = this.route.snapshot.params['id']
      this._dealsService.deletedeal(this.id)
      .subscribe(
         res=>{ console.log(res)
       
          this.success = "Deleted successfully!"
  
          setTimeout(() => {
            // swal.close();
            this.loadingCtrl.show();
            this.router.navigate(['/user-deals']);
            this.loadingCtrl.hide();
        }, 2000);
         },
         err=>{ console.log(err);
        },
      
      )
     }
  
  
}


 