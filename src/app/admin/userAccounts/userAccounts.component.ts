import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-allusers',
  templateUrl: './userAccounts.component.html',
  styleUrls: ['./userAccounts.component.css'],
})
export class UserAccountsComponent implements OnInit {


  users: any

  constructor(
    private authSer: AuthService,
    private firestore: AngularFirestore,
  ) {

  }


  ngOnInit(): void {
    this.authSer.getUsers().subscribe((res) => {
      this.users = res
      console.log(res);

    })


  }


  deleteUser(id: number) {
    this.authSer.deleteUser(id).subscribe((res) => {
      console.log(res);
    })
  }



  removeAdmin(user: any) {
    const userId = user.id;
    this.firestore.collection('users').doc(userId).update({ role: 'user' })
      .then(() => {
        console.log(`User ${userId} role updated to user`);
      })
      .catch((error) => {
        console.error('Error updating user role: ', error);
      });
  }

  makeAdmin(user: any) {
    const userId = user.id;
    this.firestore.collection('users').doc(userId).update({ role: 'admin' })
      .then(() => {
        console.log(`User ${userId} role updated to admin`);
      })
      .catch((error) => {
        console.error('Error updating user role: ', error);
      });
  }


}
