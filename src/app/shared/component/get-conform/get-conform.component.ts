import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-conform',
  templateUrl: './get-conform.component.html',
  styleUrls: ['./get-conform.component.scss']
})
export class GetConformComponent implements OnInit {

  constructor(public dialogREf:MatDialogRef<GetConformComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{message:string}
  ) { }

  ngOnInit(): void {
  }
  onCancle():void{
this.dialogREf.close(false)
  }
  onConform(){
    this.dialogREf.close(true)
  }

}
