"use server";
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

const signupAction = async (prevState : string, formData:FormData ): Promise<string> => {
  
    const signinUsername = formData.get('signinUsername');
    const signinPassword = formData.get('signinPassword');
    const role = formData.get('role');

    const signinZodSchema = z.object({
        signinUsername : z.string().min(1, {message:"Please provide username"}),
        signinPassword : z.string().min(1, {message:"Please provide password"}),
        role : z.enum(["Patient", "Doctor"], { message:"Must select either Patient or Doctor"}),
    });

    const signinValidation = await signinZodSchema.safeParseAsync({signinUsername, signinPassword,role});

    if (signinValidation.success){
        const { signinUsername, signinPassword, role } =  signinValidation.data ;
        if ( role === "Doctor") {
            const doctor = await prisma.doctor.findUnique({
                where : {
                    username : signinUsername,
                }
            });

            const hashpassword = doctor?.password;

            if (hashpassword === undefined) {
                return "Invalid User for Password";
            }
            try {
    
                bcrypt.compare(signinPassword, hashpassword , function(err, result) {
                    if (err) {
                        console.log("Inside passwordCompared callback function Error");
                        throw err;
                    }
                    if (result) {
                        return "Signin successfully";
                    }
                });
            }
            catch(error) {
                console.log(error);
                // throw error;
            }
        }
        else if ( role === "Patient") {
            const user = await prisma.user.findUnique({
                where : {
                    username : signinUsername,
                }
            });

            const hashpassword = user?.password;

            if (hashpassword === undefined) {
                return "Invalid User for Password";
            }
            try {
    
                bcrypt.compare(signinPassword, hashpassword , function(err, result) {
                    if (err) {
                        console.log("Inside passwordCompared callback function Error");
                        throw err;
                    }
                    if (result) {
                        return "Signin successfully";
                    }
                });
            }
            catch(error) {
                console.log(error);
                // throw error;
            }
        }
    }
    else {
        console.log(signinValidation.error?.issues[0]?.message);
        return signinValidation.error?.issues[0]?.message || "signupValidationResult failed";
    }

    

    

    return "";

    
}

export default signupAction