"use client";
import React,{useState, useActionState, useRef, useEffect} from 'react';
import updateInfoAction from '@/components/updateInfoAction';
import { useRouter } from 'next/navigation';
import Form from 'next/form';
import prisma from '@/lib/prisma';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';

const MyInfo = () => {

    const searchParams = useSearchParams();
    const roleFromSearchParams = searchParams.get('role');
    const nameFromSearchParams = searchParams.get('name');

    const router = useRouter();

    const [ signUpName, setSignUpName] = useState<string>("") ;
    const [ signUpPassword, setSignUpPassword] = useState<string>("") ;
    const [ role, setRole] = useState<string | "Doctor" | "Patient">("") ;
    const [ sex, setSex] = useState<"Male" | "Female" | string>("");
    const [ age, setAge] = useState<number | undefined>(undefined);
    const [ doctorinfoID, setDoctorinfoID] = useState< "" | string>("");

    const [allowEdit, setAllowEdit] = useState(false);

    const [ errorMessage , setErrorMessage] = useState('') ;

    const myForm = useRef<HTMLFormElement>(null);

    const [ state, formAction, isPending] = useActionState(updateInfoAction,"");

    useEffect(()=> {
        async function fetchInfo() {
            if (roleFromSearchParams === null ) {
                console.log("Role is unavailable, something is wrong");
                router.push("/userview");
            }
            else {
                setRole(roleFromSearchParams);
            }
            if (nameFromSearchParams === null ) {
                console.log("Name is unavailable, something is wrong");
                router.push("/userview");
            }
            else {
                setSignUpName(nameFromSearchParams);
            }

            if ( roleFromSearchParams === "Patient") {
                
                const userInfo = await prisma.user.findFirst({
                    where : {
                        username : nameFromSearchParams ?? ""
                    }
                });

                if (userInfo) {
                    setSignUpPassword(userInfo.password);
                    setRole(userInfo.role);
                    setSex(userInfo.sex);
                    setAge(userInfo.age);
                }
                else {
                    console.log("User is unavailable, something is wrong");
                    router.push("/userview");
                }
            }
            else if ( roleFromSearchParams === "Doctor") { 
                const doctorInfo = await prisma.doctor.findFirst({
                    where : {
                        username : nameFromSearchParams ?? ""
                    }
                });

                if (doctorInfo) {
                    setSignUpPassword(doctorInfo.password);
                    setRole(doctorInfo.role);
                    setSex(doctorInfo.sex);
                    setAge(doctorInfo.age);
                }
                else {
                    console.log("Doctor is unavailable, something is wrong");
                    router.push("/userview");
                }
            }
        };

        fetchInfo();
    },[]);

    
    
    useEffect(()=> {
        setErrorMessage("");
        switch(state) {
            case "Password must be more than 2 characters" : {
                setErrorMessage("Password must be more than 2 characters");
                break;
            }
            case "Password is required" : {
                setErrorMessage("Password is required");
                break;
            }
            case "Age is required" : {
                setErrorMessage("Age is required");
                break;
            }
            case "Age must be a number" : {
                setErrorMessage("Age must be a number");
                break;
            }
            case "Must select either Male or Female" : {
                setErrorMessage("Must select either Male or Female");
                break;
            }
            case "Must select either Patient or Doctor" : {
                setErrorMessage("Must select either Patient or Doctor");
                break;
            }
            case "Username already in use." : {
                setErrorMessage("Username already in use.");
                break;
            }
            case "User updated successfully." : {
                setErrorMessage("");
                router.push('/userview');
                break;
            }
            case "Doctor updated successfully." : {
                setErrorMessage("");
                router.push('/userview');
                break;
            }
            default : {
                setErrorMessage(state);
                break;
            }
        }

    },[state, isPending]);

    const toggleEdit = () => {
        setAllowEdit(!allowEdit);
    };

  return (
    <Form action={formAction} ref={myForm} id="myForm" className='w-full h-full flex justify-center items-center gap-[5px]'>
            <fieldset className='flex justify-center items-center'>
            { errorMessage && <p style={{ color:'red', fontSize:"30px"}}>{errorMessage}</p> }
                <legend><p className='text-[30px]'>My Account</p></legend>
                <div className="flex justify-center items-center" >
                    <div className="flex flex-col justify-center items-center gap-[5px]">
                        <div><button onClick={toggleEdit} className={clsx('p-[10px] rounded-xl ', allowEdit ? "bg-orange-500 hover:bg-orange-700" : "bg-red-500 hover:bg-red-700")}>{ allowEdit ? <span>Disable Edit</span> : <span>Allow Edit</span>}</button></div>
                        <div>
                            <label htmlFor="username" className='text-[20px]'>
                                <span>Username : </span>
                            </label>
                            <input className="p-[3px] border-[2px] rounded-md w-full disabled:opacity-30" disabled={ allowEdit ? false : true } id="username" type="text" placeholder="Please key in your user name" name="signup_username" value={ signUpName } onChange = {(event) => { setSignUpName(event.target.value) ; myForm.current?.classList.remove("formerror"); setErrorMessage("");}} data-testid="testlogin_username" required />
                            
                        </div>
                        <div>
                            <label htmlFor="password" className='text-[20px]'>
                            <span>Password : </span>
                            </label>
                            <input className="p-[3px] border-[2px] rounded-md w-full disabled:opacity-30" disabled={ allowEdit ? false : true } id="password" type="password" placeholder="Password" name="signup_password" value={ signUpPassword } onChange = {(event) => { setSignUpPassword(event.target.value) ;  myForm.current?.classList.remove("formerror");setErrorMessage("");}} data-testid="testlogin_password" required />
                        </div>
                        <div>
                            <label htmlFor="age" className='text-[20px]'>
                            <span>Age : </span>
                            </label>
                            <input className="p-[3px] border-[2px] rounded-md w-full disabled:opacity-30" disabled={ allowEdit ? false : true } id="age" type="number" placeholder="Age" name="age" value={ age } onChange = {(event) => { setAge(Number(event.target.value)) ;  myForm.current?.classList.remove("formerror");setErrorMessage("");}} data-testid="testlogin_password" required />
                        </div>
                        <div>
                            <label htmlFor="male" >
                                <input className="disabled:opacity-30" disabled={ allowEdit ? false : true } id="male" type="radio" name="sex" value="Male"  checked={ sex === "Male" } onChange={ (e) => {setSex && setSex("Male"); setErrorMessage(""); }}/>
                                <span className='text-[20px]'> Male </span>
                            </label>
                            <label htmlFor="female" >
                                <input className='disabled:opacity-30' disabled={ allowEdit ? false : true } id="female" type="radio" name="sex" value="Female" checked={ sex === "Female" } onChange={ (e) => {setSex && setSex("Female"); setErrorMessage(""); }}/>
                                <span className='text-[20px]'> Female </span>
                            </label>
                        </div>
                        <div>
                            <input id="role" type="hidden" name="role" value={role } />
                        </div> 

                        {role === "Doctor" && (
                            <div>
                                {/* Add any additional fields or content for doctors here */}
                                <label htmlFor="doctorinfoID" className='text-[20px]'>
                                    <span>Doctor Info ID: </span>
                                </label>
                                <input className="p-[3px] border-[2px] rounded-md w-full disabled:opacity-30" disabled={ allowEdit ? false : true } id="doctorinfoID" type="text" placeholder="Enter your Doctor Info ID" name="doctorinfoID" value={doctorinfoID} onChange={(event) => setDoctorinfoID(event.target.value)} />
                            </div>
                        )}                      
                        <div>
                            <button className='p-[10px] bg-sky-500 rounded-xl hover:bg-sky-700 disabled:opacity-30' disabled={ (signUpName && signUpPassword ) ? false : true }>{isPending ? "Edting..." : "Edit"}</button>
                        </div>
                    </div>
                    
                </div>
                
            </fieldset>
        </Form>
  )
}

export default MyInfo