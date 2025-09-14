import { Component, OnInit } from '@angular/core';
import { PartnerService } from '../Services/partner.service';


@Component({
  selector: 'app-partner',
  templateUrl: './Partner.component.html',
  styleUrls: ['./Partner.component.css'],
 
})
export class PartnerComponent implements OnInit{

brandlogo : any[] = []

constructor(
  private partnerSer : PartnerService
){}


ngOnInit(): void {
    this.partnerSer.getPartner().subscribe((res) =>{
      this.brandlogo = res
      
    })
}






}




