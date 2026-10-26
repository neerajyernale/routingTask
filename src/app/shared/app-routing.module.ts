import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./component/home/home.component";
import { FairsComponent } from "./component/fairs/fairs.component";
import { ProductsComponent } from "./component/products/products.component";
import { UsersComponent } from "./component/users/users.component";
import { SingleuserComponent } from "./component/singleuser/singleuser.component";
import { FormComponent } from "./component/form/form.component";

const routes: Routes=[
    
    {
        path:'',
        component:HomeComponent
    },
    
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'fairs',
        component:FairsComponent
    },
    {
        path:'products',
        component:ProductsComponent
    },
    {
        path:'users',
        component:UsersComponent
    },
    {
        path:'users/Add',
        component:FormComponent

    },
    {
        path:'users/:Uid',
        component:SingleuserComponent
    },
    {
        path:'users/:Uid/edit',
        component:FormComponent

    }
   
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]

})
export class AppRoutingModule{


}