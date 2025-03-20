"use client";
import React ,{useActionState, useState, useEffect} from 'react';
import Form from 'next/form';
import prisma from '@/lib/prisma';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import cancelAppointmentAction from '@/components/cancelAppointmentAction';
import completeAppointmentAction from '@/components/completeAppointmentAction';
import confirmAppointmentAction from '@/components/confirmAppointmentAction';

const DoctorAppointmentComponent = ({ patientName, contactNumber, appointmentDate, symptom, status, appointmentID, reportDetails} : {
        patientName : string,
        contactNumber : string,
        appointmentDate : string,
        symptom : string,
        status : string,
        appointmentID : number,
        reportDetails : string | null
}) => {

    const [details, setDetails] = useState<string | null>(reportDetails);
    const [editable, setEditable] = useState<boolean>(false);
    const router = useRouter();

    const [cancelState, cancelAction, isCancelPending] = useActionState(cancelAppointmentAction,"") ;
    const [completeState, completeAction, isCompletePending] = useActionState(completeAppointmentAction,"") ;
    const [confirmState, confirmAction, isConfirmPending] = useActionState(confirmAppointmentAction,"") ;

    const [error, setError] = useState<string>("");

    useEffect (()=> {
        setError("");
        switch(cancelState) {
            case "Appointment cancelled successfully!" : {
                toast.success('Appointment created successfully!',{duration:1000});
                setTimeout(()=> {
                  router.push('/userview')
                }, 1000);
                break;
              }
              default : {
                setError(cancelState);
                break;
              }  
            
        }
    },[cancelState,isCancelPending]);

    useEffect (()=> {
        setError("");
        switch(completeState) {
            case "Appointment completed successfully!" : {
                toast.success('Appointment completed successfully!',{duration:1000});
                setTimeout(()=> {
                  router.push('/userview')
                }, 1000);
                break;
              }
              default : {
                setError(completeState);
                break;
              }  
            
        }
    },[completeState,isCompletePending]);

    useEffect (()=> {
        setError("");
        switch(confirmState) {
            case "Appointment confirmed successfully!" : {
                toast.success('Appointment confirmed successfully!',{duration:1000});
                setTimeout(()=> {
                  router.push('/userview')
                }, 1000);
                break;
              }
              default : {
                setError(confirmState);
                break;
              }  
            
        }
    },[confirmState,isConfirmPending]);

  return (
    <div className='border-1 rounded-xl m-[5px] max-w-fit max-h-[50%] p-[5px]'>
        <Toaster />
        { error && <div className='flex justify-center items-center'><p className='text-2xl text-red-500'>{error}</p></div>}
        <div className='grid grid-rows-5 grid-cols-[2fr_2fr_3fr] gap-2 w-[100%] h-[30%]' >
            <div className='row-start-1 row-end-2 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
              <p>Patient Name : </p>
            </div>
            <div className='row-start-1 row-end-2 col-start-2 col-end-3 text-xl justify-self-start self-center'>
              <p className="p-[3px]" >
                {patientName}
              </p>
            </div>
            <div className='row-start-2 row-end-3 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
              <p >Contact Number : </p>
            </div>
            <div className='row-start-2 row-end-3 col-start-2 col-end-3 text-xl justify-self-start self-center' >
               { contactNumber}
            </div>
            <div className='row-start-3 row-end-4 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
              <p>Appointment Date : </p>
            </div>
            <div className='row-start-3 row-end-4 col-start-2 col-end-3 text-xl justify-self-start self-center'>
               {appointmentDate}
            </div>
            <div className='row-start-4 row-end-5 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
              <p>Symptom : </p>
            </div>
            <div className='row-start-4 row-end-5 col-start-2 col-end-3 text-xl justify-self-start self-center'>
                { symptom}
            </div>
            <div className='row-start-5 row-end-6 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
              <p>Status : </p>
            </div>
            <div className='row-start-5 row-end-6 col-start-2 col-end-3 text-xl justify-self-start self-center'>
              { status }
            </div>

            {
                (status === "Cancelled" || status === "Completed") ? <></>: (<><div className='row-start-1 row-end-2 col-start-3 col-end-4 text-xl justify-self-start self-center'>
                    <form action={ cancelAction}>
                        <input type="hidden" name="appointmentID" value = {appointmentID} />
                        <button className='p-[10-px] bg-red-500 rounded-md text-white font-bold p-[10px] font-bold hover:bg-red-300 hover:cursor-pointer'>{ isCancelPending ? <span>Cancelling</span>: <span>Cancel Appointment</span>}</button>
                    </form>
                    </div>
                    <div className='row-start-2 row-end-3 col-start-3 col-end-4 text-xl justify-self-start self-center'>
                        <Form action={ confirmAction } >
                        <input type="hidden" name="appointmentID" value = {appointmentID} />
                        <button className='p-[10-px] bg-cyan-500 rounded-md text-black p-[10px] font-bold hover:bg-cyan-300 hover:cursor-pointer'>{ isConfirmPending ? <span>Confirming</span>: <span>Confirm Appointment</span>}</button>
                        </Form>
                        
                    </div>
                    </>)
            }
                    <div className='row-start-3 row-end-4 col-start-3 col-end-4 text-xl justify-self-start self-center'>
                        {
                            (status === "Completed") 
                            ?   <div>
                                <button className='p-[10px] bg-green-300 rounded-md text-black font-bold font-bold p-[10px] hover:bg-green-200 hover:cursor-pointer m-[5px]' onClick={ ()=> setEditable(!editable)}>{ !editable ? <span>Allow Edit</span> : <span>Disallow Edit</span>}</button>
                                    <Form action={ completeAction} >
                                        <input type="hidden" name="appointmentID" value = {appointmentID} />
                                        <div className='flex flex-col items-start justify-center gap-2'>
                                            <textarea disabled={ !editable } className="resize-none p-[3px] border-[2px] rounded-md disabled:opacity-[30%] disabled:cursor-not-allowed" id='detail' name="detail" rows={3} cols={30} placeholder='Detail Report' value={details || ""} onChange={(event:React.FormEvent<HTMLTextAreaElement>)=> setDetails(event.currentTarget.value)} />
                                            <button disabled={ !editable } className='bg-orange-300 rounded-md text-black font-bold p-[10px] hover:bg-orange-200 hover:cursor-pointer disabled:opacity-[30%] disabled:cursor-not-allowed' >{ isCompletePending ? <span>Editing</span>: <span>Edit</span>}</button>
                                        </div>
                                    </Form>
                                    
                                </div>
                                :   (status !== "Cancelled") && <Form action={ completeAction} >
                                        <input type="hidden" name="appointmentID" value = {appointmentID} />
                                        <div className='flex flex-col items-start justify-center gap-2'>
                                            <textarea className="resize-none p-[3px] border-[2px] rounded-md disabled:opacity-[30%] disabled:cursor-not-allowed" id='detail' name="detail" rows={3} cols={30} placeholder='Detail Report' value={details || ""} onChange={(event:React.FormEvent<HTMLTextAreaElement>)=> setDetails(event.currentTarget.value)} />
                                            <button className='p-[10-px] bg-orange-300 rounded-md text-black font-bold p-[10px] hover:bg-orange-200 hover:cursor-pointer disabled:opacity-[30%] disabled:cursor-not-allowed' >{ isCompletePending ? <span>Completing</span>: <span>Complete Appointment</span>}</button>
                                        </div>
                                    </Form>
                        }
                        
                    </div>
                    
            
        </div>
        
        
        
    </div>
  )
}

export default DoctorAppointmentComponent