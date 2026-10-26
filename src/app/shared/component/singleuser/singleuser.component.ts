import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { Iuser } from '../../interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GetConformComponent } from '../get-conform/get-conform.component';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.scss']
})
export class SingleuserComponent implements OnInit {

  constructor( private _routes:ActivatedRoute,
    private _route:Router,
    private service : UserServiceService,
    private dialog : MatDialog 
  ) { }

  ngOnInit(): void {
    this.getUserById()
  }
  user!:Iuser
  userId!: string

  getUserById(){
    this.userId =  this._routes.snapshot.paramMap.get('Uid')||'';
    this.service.fetchProductById(this.userId)
        .subscribe({
          next:res=>{
            this.user = res
          },
          error:err=>{
            console.log(err);
          }
        })
  }

  editUser(){
    this._route.navigate(['/users', this.userId, 'edit']);

  }
 
  onRemove(){
   const dialogref = this.dialog.open(GetConformComponent,{
    width:'350px',
    data:{message:`Are you sure you want ot delete this with id:${this.userId}`}
   });
   dialogref.afterClosed().subscribe((result:boolean)=>{
    if(result){
      this.service.removeUser1(this.user.id)
      .subscribe({
        next:res=>{
          this._route.navigate(['users'])
        },error:err=>{
          console.log(err)
        }
      })
    }
   })
      
    }

  }


