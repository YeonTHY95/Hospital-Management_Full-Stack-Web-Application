"use client";
import React ,{useState, useActionState} from 'react';
import Form from 'next/form';
import prisma from '@/lib/prisma';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import cancelAppointmentAction from '@/components/cancelAppointmentAction';

const PatientAppointmentComponent = ({ doctorName, appointmentDate, symptom, status, appointmentID} : {
        doctorName : string,
        contactNumber : string,
        appointmentDate : string,
        symptom : string,
        status : string,
        appointmentID : number
}) => {

    const router = useRouter();
    const [cancelState, cancelAction, isCancelPending] = useActionState(cancelAppointmentAction,"") ;

  return (
    <div className='border-1 rounded-md m-[5px]'>
        <Toaster />
        <div className='grid grid-cols-[1fr_2fr_1fr] grid-rows-4 gap-1'>
            <div className='row-start-1 row-end-6 col-start-1 col-end-2 justify-self-center self-center' >
                <Image src='/doctoricon.svg' height={500} width={300} alt='Doctor Profile Picture'/>
            </div>
            <div className='row-start-1 row-end-2 col-start-2 col-end-3'>
                <p className='text-3xl font-bold'>Appointment ID : {appointmentID}</p>
                <p className='text-xl font-bold'>Doctor Name : {doctorName}</p>
            </div>
            <div className='row-start-2 row-end-3 col-start-2 col-end-3 text-xl self-center'>
                <p>Appointment Date : {appointmentDate}</p>
            </div>
            <div className='row-start-3 row-end-4 col-start-2 col-end-3 text-xl self-center'>
                <p>Status : { status === "Cancelled" ? (<span className='font-bold text-red-300'>{status}</span>) : (<span className='font-bold'>{status}</span>)}</p>
            </div>
            <div className='row-start-4 row-end-5 col-start-2 col-end-3 text-xl self-center'>
                <p>Symptom : <span className='font-bold text-xl'>{symptom}</span> </p>
            </div>
            {
            ( status === "Cancelled" || status =="Completed") ? <></> :
            (<><div className='row-start-1 row-end-2 col-start-3 col-end-4 self-center'>
                <Form action={ cancelAction} >
                    <button disabled={ (status === "Completed" )|| (status === "Cancelled" )} className='ml-[10px] mt-[10px] p-[10px] bg-red-500 rounded-md text-white font-bold hover:cursor-pointer hover:bg-red-700'>{ isCancelPending ? <span>Cancelling</span>: <span>Cancel Appointment</span>}</button>
                    </Form>
            </div>
            <div className='row-start-2 row-end-3 col-start-3 col-end-4 self-center'>
                <button disabled={ (status === "Completed" )|| (status === "Cancelled" )} className='ml-[10px] p-[10px] bg-orange-500 rounded-md text-black font-bold hover:cursor-pointer hover:bg-orange-700'><Link href={`/userview/myappointment/${appointmentID}`}>Reschedule Appointment</Link></button>
            </div>
            </>)
            }
        </div>
        
    </div>
  )
}

export default PatientAppointmentComponent
