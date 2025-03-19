'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/dist/server/api-utils';

 
export async function authenticate(prevState: string | undefined, formData: FormData,) {
  try {
    //await signIn('credentials', {...formData, redirect: false},);
    await signIn('credentials', {
      "signinUsername": formData.get("signinUsername"),
      "signinPassword":formData.get("signinPassword"),
      "role": formData.get("role"), 
      redirect: false},);

    return "Sign in successfully";
  } 
  catch (error) {
    console.log(`Before AuthError, error is ${error}`);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}