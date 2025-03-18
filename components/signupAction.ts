"use server";
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from "bcrypt";

const signupAction = async (prevState : string, formData:FormData ): Promise<string> => {
  
    const signupUsername = formData.get('signup_username');
    const signupPassword = formData.get('signup_password');
    const sex = formData.get('sex');
    const role = formData.get('role');

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
    });

    const signupValidationResult = signupZodSchema.safeParse({signupUsername,signupPassword,sex, role});

    if (signupValidationResult.success){
        const { signupUsername, signupPassword, sex, role } =  signupValidationResult.data ;

        if (role === "Patient") {
            const existingUser = await prisma.user.findUnique({
                where : {
                    username : signupUsername
                }
            });
    
            if (existingUser) {
                console.log("Username already in use.")
                return "Username already in use." ;
            }
            else {
                
                bcrypt.hash(signupPassword, 10, async function(err, hash) {
                    if (err) {
                        console.log(err);
                        return "Hashing Error";
                    }
                    
                    const newUser = await prisma.user.create({
                        data: {
                          username: signupUsername,
                          password: hash,
                          role : role,
                          sex : sex,
                        },
                    });
                    if (newUser) {
                        console.log("User created successfully.");
                        return "User created successfully.";
                    }
                });
                
            }
        }
        else if ( role === "Doctor") {
            const doctorInfoID = Number(formData.get('doctorInfoID')) ;
            const zodDoctorInfoID = z.number();
            const doctorInfoIDValidation = await zodDoctorInfoID.safeParseAsync(doctorInfoID);

            if (!doctorInfoIDValidation.success) {
                const issuesArray = doctorInfoIDValidation.error.issues;
                console.log(issuesArray[0].message);
                return issuesArray[0].message ;
            }
            else {
                const existingDoctor = await prisma.doctor.findUnique({
                    where : {
                        username : signupUsername
                    }
                });
        
                if (existingDoctor) {
                    console.log("Username already in use.")
                    return "Username already in use." ;
                }
                else {
                    const newUser = await prisma.doctor.create({
                        data: {
                          username: signupUsername,
                          password: signupPassword,
                          role : role,
                          sex : sex,
                        },
                        
                    });
                    if (newUser) {
                        console.log("Doctor created successfully.");
                        const connectwithDoctorInfo = await prisma.doctor.update({
                            where: {
                                username: signupUsername
                            },
                            data : {
                                info:  {
                                    connect : {
                                        id : doctorInfoIDValidation.data,
                                    }
                                }
                            }
                        });
    
                        if (connectwithDoctorInfo) {
                            console.log("Doctor connected with DoctorInfo successfully.");
                            return "Doctor created successfully.";
                        }
                    }
                    console.log("Doctor failed to create.");
                    return "Doctor failed to create." ;
                    
                }
            }
            
        }
        
    }
    console.log("signupValidationResult failed");
    console.log(signupValidationResult.error?.issues[0]?.message);
    return signupValidationResult.error?.issues[0]?.message || "signupValidationResult failed";
}

export default signupAction