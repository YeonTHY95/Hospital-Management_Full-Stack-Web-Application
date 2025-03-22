"use server";
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from "bcrypt";

const updateInfoAction = async (prevState : string, formData:FormData ): Promise<string> => {
  
    const signupUsername = formData.get('signup_username');
    const signupPassword = formData.get('signup_password');
    const sex = formData.get('sex');
    const role = formData.get('role');
    const age = formData.get('age');

    const signupZodSchema = z.object({
        signupUsername: 
            z.string().min(1),
        signupPassword: z.string({ required_error: "Password is required" })
            .min(1, "Password is required")
            .min(2, "Password must be more than 2 characters")
            .max(32, "Password must be less than 32 characters"),
            // .min(8, { message: "Be at least 8 characters long" })
            // .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
            // .regex(/[0-9]/, { message: "Contain at least one number." })
            // .regex(/[^a-zA-Z0-9]/, {
            // message: "Contain at least one special character.",
            // })
            // .trim(),
        sex: z.enum(["Male", "Female"], { message:"Must select either Male or Female"}),
        role: z.enum(["Patient", "Doctor"], { message:"Must select either Patient or Doctor"}),
        age: z.number({
            required_error: "Age is required",
            invalid_type_error: "Age must be a number",}).int(),
        });

    const signupValidationResult = signupZodSchema.safeParse({signupUsername,signupPassword,sex, role, age});

    if (signupValidationResult.success){
        const { signupUsername, signupPassword, sex, role, age} =  signupValidationResult.data ;

        const hash = await bcrypt.hash(signupPassword, 10) ;

        if (hash) {
            if (role === "Patient") {
                const existingUser = await prisma.user.update({
                    where : {
                        username : signupUsername
                    },
                    data : {
                        username : signupUsername,
                        password : hash,
                        sex ,
                        age
                    }
                });

                if (existingUser) {
                    console.log("User updated successfully.")
                    return "User updated successfully." ;
                }
                else {
                    return "User not available";
                }
                    
            }
            else if ( role === "Doctor") {

                const doctorInfoID = Number(formData.get('doctorinfoID')) ;
                const zodDoctorInfoID = z.number();
                const doctorInfoIDValidation = await zodDoctorInfoID.safeParseAsync(doctorInfoID);

                if (!doctorInfoIDValidation.success) {
                    const issuesArray = doctorInfoIDValidation.error.issues;
                    console.log(issuesArray[0].message);
                    return issuesArray[0].message ;
                }
                else {
                    const existingDoctor = await prisma.doctor.update({
                        where : {
                            username : signupUsername
                        },
                        data : {
                            username : signupUsername,
                            password : hash,
                            sex ,
                            age,
                            info : {
                                connect : {
                                    id : doctorInfoIDValidation.data,
                                }
                            }
                        }
                    });

                    if (existingDoctor) {
                        console.log("Doctor updated successfully.")
                        return "Doctor updated successfully." ;
                    }
                    else {
                        return "Doctor not available";
                    }
                } 
            }
        }
    }
    else {
        console.log("signupValidationResult failed");
        console.log(signupValidationResult.error?.issues[0]?.message);
        return signupValidationResult.error?.issues[0]?.message || "signupValidationResult failed";

    }

    return "Unknown Issue";
}

export default updateInfoAction