import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Dashbord } from './dashbord/dashbord';
import { authGuard } from './auth-guard';
import { Blog } from './blog/blog';
import { BlogDetils } from './blog-detils/blog-detils';
import { Profile } from './profile/profile';
import { Edit } from './edit/edit';
import { Aboutus } from './aboutus/aboutus';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path: 'login', component:Login},
    {path: 'register', component:Register},
    {path:"dashbord", component:Dashbord, canActivate:[authGuard]},
    {path:"blog",component:Blog,canActivate:[authGuard]},
    {path:"blog-detils/:id",component:BlogDetils,canActivate:[authGuard]},
    {path:"profile",component:Profile,canActivate:[authGuard]},
    {path:"edit/:id",component:Edit,canActivate:[authGuard]},
    {path:"aboutus",component:Aboutus,canActivate:[authGuard]}

];
