import { z } from "zod"
 
export const signInZodSchema = z.object({
    signinUsername: z.string({ required_error: "Username is required" })
        .min(2, "Username must be longer than 2"),
    signinPassword: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(2, "Password must be more than 2 characters")
        .max(32, "Password must be less than 32 characters"),
    role : z.enum(["Patient", "Doctor"], { message:"Must select either Patient or Doctor"}),
})
