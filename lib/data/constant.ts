import { UserRole } from "../type";

export const roleData =[
  {  role:UserRole.ADMIN,viewPage:true,route:'/admin', icon:'FcBusinessman' },
  {  role:UserRole.TEACHER,viewPage:false,route:'/teacher',icon:'FcBusinessman' },
  {  role:UserRole.STUDENT,viewPage:false,route:'/student',icon:'FcBusinessman' },
    
]