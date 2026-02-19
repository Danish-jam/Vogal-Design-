import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './userAccounts.component.html',
  styleUrls: ['./userAccounts.component.css'],
})
export class UserAccountsComponent  implements OnInit{

users : any

constructor( 
  private authSer : AuthService
){

}


ngOnInit(): void {
  this.authSer.getUsersFormFirebase().subscribe((res) =>{
     this.users = res
     console.log(res);
     
  })

  
}


deleteUser(id : number){
  this.authSer.deleteUser(id).subscribe((res) =>{
    console.log(res); 
  })
}

}
