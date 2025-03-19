"use server";
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/session';
import {redirect} from "next/navigation";

const signupAction = async (prevState : string, formData:FormData ) : Promise<string> => {
  
    const signinUsername = formData.get('signinUsername');
    const signinPassword = formData.get('signinPassword');
    const role = formData.get('role');

    const signinZodSchema = z.object({
        signinUsername : z.string().min(1, {message:"Please provide username"}),
        signinPassword : z.string().min(1, {message:"Please provide password"}),
        //role : z.enum(["Patient", "Doctor"], { message:"Must select either Patient or Doctor"}),
    });
    
    const parsedCredentials = await signinZodSchema.safeParseAsync({signinUsername,signinPassword }) ;

    if (parsedCredentials.success) {
        const { signinUsername, signinPassword} = parsedCredentials.data;

        console.log(`Successful parsedCredentials is ${JSON.stringify(parsedCredentials)}`);

        var user =  await prisma.user.findUnique({
            where: {
              username: signinUsername,
            },
        });
        console.log("After user");
        console.log(`User is ${JSON.stringify(user)}`);
        if (!user) {
            const doctor = await prisma.doctor.findUnique({
                where: {
                  username: signinUsername,
                },
            });

            if (doctor) {
                
                const passwordsMatch = await bcrypt.compare(signinPassword, doctor.password);
                if (passwordsMatch) {
                console.log("It's a Doctor");
                console.log("Password Matched for Authentication ", passwordsMatch);
                console.log(`user is ${JSON.stringify(user)}`);

                await createSession(doctor.username);
                redirect("/userview");
                //return "Sign in successfully";
                }
            }
            else {
                console.log(`User cannot be found in Database`);
                return "User cannot be found in Database";
            }

        }
        else {
            // Continue with Patient 
            console.log("Before user password matches");
            const passwordsMatch = await bcrypt.compare(signinPassword, user.password);
            if (passwordsMatch) {
            console.log("It's a Patient");
            console.log("Password Matched for Authentication ", passwordsMatch);
            console.log(`user is ${JSON.stringify(user)}`);

            await createSession(user.username);
            redirect("/userview");
            }
            else {
                console.log("Wrong patient password");
                return "Wrong user password";
            }
        }
    }
    else {
        console.log(`parsedCredentials is ${JSON.stringify(parsedCredentials)}`);
        console.log(parsedCredentials.error?.issues[0]?.message);
        return parsedCredentials.error?.issues[0]?.message;
    }

    console.log("Something is wrong");

    return ""
}
export default signupAction