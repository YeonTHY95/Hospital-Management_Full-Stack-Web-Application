"use client";
import React, {useState, useRef, useActionState, useEffect} from 'react';
import signinAction from '@/components/signinAction';
import Form from 'next/form';
import { authenticate } from '@/components/authenticate';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const SignInPage = () => {

    const [invalidMessage, setInvalidMessage] = useState<string | null>(null);

    const [ signinName, setsigninName] = useState<string>('') ;
    const [ signinPassword, setsigninPassword] = useState<string>('') ;
    const [ role, setRole] = useState<string | "Doctor" | "Patient">("") ;

    const signinFormRef = useRef<HTMLFormElement>(null);

    const [ state, formAction, isPending] = useActionState(signinAction,"");

    useEffect(()=> {
        switch(state) {
            case "Invalid credentials." :{
                setInvalidMessage('Invalid credentials.');
                break;
            }
            case "Something went wrong." : {
                setInvalidMessage("Something went wrong.");
                break;
            }
            case "Wrong user password" : {
                setInvalidMessage("Wrong user password");
                break;
            }
            case "User cannot be found in Database" : {
                setInvalidMessage("User cannot be found in Database");
                break;
            }
            case "Sign in successfully" : {
                console.log("Sign in successfully");
                redirect('/userview');
                break;
            }
        }
    },[state, isPending]);

  return (
    <Form action={formAction}  id="signinForm" ref={signinFormRef} className='w-full h-[50vh] flex justify-center items-center gap-[5px] m-[10px]'>
            <fieldset className='p-[10px] flex flex-col justify-center items-center' >
                <div className='text-[30px] flex justify-center items-center'><p className='text-center'>Sign In</p></div>
                {
                    invalidMessage && <h3 className='text-red-300'> {invalidMessage}</h3>
                }
                <div className="relative border-[2px] rounded-md p-[20px]">
                    <div className='flex flex-col justify-center gap-[5px]'>
                        <div>
                            <label htmlFor="username" className='text-[20px]'>
                                Username :
                            </label>
                            <input className="p-[3px] border-[2px] rounded-md w-full" id="username" type="text" placeholder="Please key in your user name" name="signinUsername" value= {signinName} onChange = { event => {setsigninName(event.target.value ) ; setInvalidMessage(""); signinFormRef.current?.classList.remove("formerror"); }}  />
                        </div>
                        <div>
                            <label htmlFor="password" className='text-[20px]'>
                                Password :
                            </label>
                            <input className="p-[3px] border-[2px] rounded-md w-full" id="password" type="password" placeholder="Password" name="signinPassword" value= {signinPassword} onChange = { event => {setsigninPassword(event.target.value ); setInvalidMessage(""); signinFormRef.current?.classList.remove("formerror");}} />    
                        </div>
                        {/* <div className='flex flex-col m-[5px]'>
                            <div>
                                <label htmlFor="patient" >
                                    <input id="patient" type="radio" name="role" value="Patient" defaultChecked= {true}  onChange={ (e) => { setRole && setRole("Patient");  }}/>
                                    <span> Patient </span>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="doctor" >
                                    <input id="doctor" type="radio" name="role" value="Doctor" checked={ role === "Doctor" } onChange={ (e) => {setRole && setRole("Doctor"); }}/>
                                    <span> Doctor </span>
                                </label>
                            </div>
                        </div>     */}
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className='p-[10px] bg-sky-500 rounded-xl hover:bg-sky-700 disabled:opacity-30 m-[10px]' disabled={(signinName && signinPassword) ? false : true }>{ isPending? "Submitting" :"Submit" }</button>
                    </div>
                    <div className='relative bottom-[-15px] text-center w-full flex justify-center items-center'>
                        <Link href="/signup"><p className='text-[13px]'>Create New Account</p></Link>
                    </div>
                </div>
                
            </fieldset>
        </Form>
  )
}

export default SignInPage