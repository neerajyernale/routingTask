import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { Iuser } from '../../interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserServiceService) { }
  userArr!:Iuser[]
  ngOnInit(): void {
this.getAllProducts();
  }
  getAllProducts(){
   this.userService.fetProduct()
   .subscribe({
    next:res=>{
      console.log(res);
      this.userArr = res
    },
    error:err=>{

    }
   })
  }
  onAddUser(){
    
  }

}
