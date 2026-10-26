import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../user-service.service';
import { Address, Iuser } from '../../interface';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userId!: string | null

  constructor( private router : Router,
    private routes: ActivatedRoute,
    private service:UserServiceService) { }
   UserForm!:FormGroup

   ngOnInit(): void {
    this.createForm();
    this.onAddSkill();
    this.getValue();
    this.patchCurrent();

     this.userId = this.routes.snapshot.paramMap.get('Uid'); 
    if(this.userId){ 
      this.isInEditMode = true ;
        this.service.fetchProductById(this.userId)
         .subscribe({ 
            next:res=>{  
                this.onPatchValues(res)
            }
         })
    } 
          
    
  }
  isInEditMode:boolean=false;
  editedUser!:Iuser;
  private previousPermanentAddress: Address | null = null;

  createForm(){
  this.UserForm =  new FormGroup({
    name: new FormControl(),
    role: new FormControl(),
    description: new FormControl(),
    imageUrl: new FormControl(),
    experience: new FormControl(),
    status: new FormControl(),
   
      currentAddress: new FormGroup({
        country: new FormControl(null,[Validators.required]),
        state: new FormControl(null,[Validators.required]),
        city: new FormControl(null,[Validators.required]),
        zipcode: new FormControl(null,[Validators.required])
      }),
      permantAddress: new FormGroup({
        country: new FormControl(null,[Validators.required]),
        state: new FormControl(null,[Validators.required]),
        city: new FormControl(null,[Validators.required]),
        zipcode: new FormControl(null,[Validators.required])
      }),

    checkbox :  new FormControl({value:false,disabled:true}),
    skills: new FormArray([])
  })
  }
 

  onPatchValues(User:Iuser){ 
      this.skills.clear() ;
       for(const skill of  User.skills){ 
            this.skills.push(new  FormControl(skill, Validators.required))
       } 
          this.UserForm.patchValue({
            ...User,
            permantAddress: User.permanentAddress
          });
          console.log(User.permanentAddress);
  }

  getValue(){
    this.UserForm.get('currentAddress')?.valueChanges
    .subscribe(res=>{
      console.log(res)
      let currentVal = this.UserForm.get('currentAddress')?.valid
      if(currentVal){
        this.UserForm.get('checkbox')?.enable();
      }else{
        this.UserForm.get('checkbox')?.reset();
        this.UserForm.get('checkbox')?.disable();
      }
    })
  }

  patchCurrent(){
    this.UserForm.get('checkbox')?.valueChanges
    .subscribe(res=>{
      if(res){
        this.previousPermanentAddress = this.UserForm.get('permantAddress')?.getRawValue();
        const currAdd = this.UserForm.get('currentAddress')?.getRawValue();
        this.UserForm.get('permantAddress')?.patchValue(currAdd);
        this.UserForm.get('permantAddress')?.disable();
      }else{
        if(this.previousPermanentAddress){
          this.UserForm.get('permantAddress')?.patchValue(this.previousPermanentAddress);
          this.previousPermanentAddress = null;
        }
        this.UserForm.get('permantAddress')?.enable();
      }
    })

    this.UserForm.get('currentAddress')?.valueChanges.subscribe(value=>{
      if(this.UserForm.get('checkbox')?.value){
        this.UserForm.get('permantAddress')?.patchValue(value);
      }
    });
  }
 

 patchUserSkill(){  
   this.skills.clear()
      for (const skill in this.skills) {
        this.skills.push(new FormControl(skill,[Validators.required]))  
      }
 } 

  get f(){
    return this.UserForm.controls
  }
  get skills(){
    return this.UserForm.get('skills') as FormArray
  }
  onRemove(i:number){
    this.skills.removeAt(i)

  }
  onAddSkill(){
    if(this.skills.length < 5){
      this.skills.push(new FormControl(null,[Validators.required]));
    }
  }
  

  
onUserAdd(){
  if (this.UserForm.invalid) {
    this.UserForm.markAllAsTouched();
  }else{
    const formValue = this.UserForm.getRawValue();
    const id = Date.now();
    const newUser={
      ...formValue,
      Uid: id.toString(),
      id,
      permanentAddress: formValue.permantAddress
    }
    console.log(newUser);
    this.service.createUser(newUser)
    .subscribe({
      next:res=>{
       this.router.navigate(['users'])
      }
    })
  }
}
  
onUpdate(){
  const updateObj: Iuser = {
    ...this.UserForm.getRawValue(),
    Uid: this.userId,
  };
  console.log(updateObj);
  this.service.onUpdateUser(updateObj)
  .subscribe(res=>{
    this.router.navigate(['users'])
  })
}
}


