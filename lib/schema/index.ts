import * as z from 'zod'


const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;


export const LoginSchema =z.object({
    email: z.string().email({message:'Email is required'}),
    password:z.string().min(1,{message:'Password is requird'})
})


export const RegisterSchema =z.object({
    email: z.string().email({message:'Email is required'}),
    password:z.string().min(6,{message:'Minimum 6 characters is requird'}),
    username:z.string().min(1,{message:"User Name is required"}),
    firstName:z.string().min(1,{message:"First Name is required"}),
    lastName:z.string().min(1,{message:"Last Name is required"}),
    contactNo: z.string().regex(phoneNumberRegex, "Invalid phone number format"),
})



