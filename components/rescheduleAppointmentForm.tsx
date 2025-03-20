"use client";
import React, {useActionState, useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import Form from 'next/form';
import updateAppointmentAction from '@/components/updateAppointmentAction';
import fetchDoctorName from '@/components/fetchDoctorName';
import toast, { Toaster } from 'react-hot-toast';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';
import prisma from '@/lib/prisma';
 


const RescheduleAppointmentForm = ({dname, username, doctorlist, cn, date, symp, id} : { id : number | undefined ,dname : string | undefined, username : string | undefined, cn : string | undefined, date : Date | undefined, symp : string | undefined , doctorlist : { name: string }[] }) => {
    const router = useRouter();

  const [state, formAction , isPending] = useActionState(updateAppointmentAction, "" );
 
  const [doctorName, setDoctorName] = useState<string>(dname ?? "");
  const [patientName, setPatientName] = useState<string | undefined>(username);
  const [contactNumber, setContactNumber] = useState<string | undefined>(cn);
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(date);
  const [symptom, setSymptom] = useState<string | undefined>(symp);
  
  const [error, setError] = useState<string>("");

  useEffect(()=> {
    setError("");

    switch(state) {
      case "Appointment updated successfully" : {
        toast.success('Appointment updated successfully!',{duration:1000});
        setTimeout(()=> {
          router.push('/userview')
        }, 1000);
        break;
      }
      default : {
        setError(state);
        break;
      }


    }
  }, [state, isPending]);

  return (
    <>
    <Toaster />
    <Form action={formAction}>
      <legend><p className='text-3xl font-black'>Make Appointment</p></legend>
    { error && <div className='justify-center items-center'><p className='text-2xl text-red-500 flex justify-center items-center'>{error}</p></div>}
      <div className='grid grid-rows-6 grid-cols-2 gap-2 w-[50%] h-[30%]' >
        <div className='row-start-1 row-end-2 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='doctorName'>Doctor Name : </label>
        </div>
        <div className='row-start-1 row-end-2 col-start-2 col-end-3 text-xl justify-self-start self-center'>
          {/* <input className="p-[3px] border-[2px] rounded-md" id='doctorName' name="doctorName" type="text" placeholder='Doctor Name' value={doctorName || ""} onChange={(event:React.FormEvent<HTMLInputElement>)=> setDoctorName(event.currentTarget.value)} /> */}
          <select className="p-[3px] border-[2px] rounded-md" id="doctorName" name="doctorName" value={doctorName} onChange={e => setDoctorName(e.target.value)}>
          {doctorlist && doctorlist.map((doctor:{name:string}, index:number) => (
            <option key={index} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
          </select>
        </div>
        <div className='row-start-2 row-end-3 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='patientName'>Patience Name : </label>
        </div>
        <div className='row-start-2 row-end-3 col-start-2 col-end-3 text-xl justify-self-start self-center' >
          <input className="p-[3px] border-[2px] rounded-md" id='patientName' name="patientName" type="text" placeholder='Patient Name' value={patientName || ""} onChange={(event:React.FormEvent<HTMLInputElement>)=> setPatientName(event.currentTarget.value)} />
        </div>
        <div className='row-start-3 row-end-4 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='contactNumber'>Contact Number : </label>
        </div>
        <div className='row-start-3 row-end-4 col-start-2 col-end-3 text-xl justify-self-start self-center'>
          <input className="p-[3px] border-[2px] rounded-md" id='contactNumber' name="contactNumber" type="text" placeholder='Contact Number' value={contactNumber || ""} onChange={(event:React.FormEvent<HTMLInputElement>)=> setContactNumber(event.currentTarget.value)} />
        </div>
        <div className='row-start-4 row-end-5 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='appointmentDate'>Appointment Date : </label>
        </div>
        <div className='row-start-4 row-end-5 col-start-2 col-end-3 text-xl justify-self-start self-center'>
          <DatePicker selected={appointmentDate} onChange={(date) => date && setAppointmentDate(date)} />
            <input type="hidden" name="appointmentDate" value={appointmentDate && appointmentDate.toISOString().split("T")[0]} />
            <input type="hidden" name="id" value={id} />
        </div>
        <div className='row-start-5 row-end-6 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='symptom'>Symptoms : </label>
        </div>
        <div className='row-start-5 row-end-6 col-start-2 col-end-3 text-xl justify-self-start self-center'>
          <textarea className="p-[3px] border-[2px] rounded-md" id='symptom' name="symptom" rows={3} cols={50} placeholder='State your symptom' value={symptom || ""} onChange={(event:React.FormEvent<HTMLTextAreaElement>)=> setSymptom(event.currentTarget.value)} />
        </div>
        <div className='row-start-6 row-end-7 col-start-1 col-end-3 justify-self-center self-center' >
            <button className='bg-sky-500 p-[10px] rounded-xl w-[100px] h-[50px] text-white font-bold hover:bg-sky-700'>{isPending ? <p>Updating</p> : <p>Update</p>}</button>
        </div>
        
      </div>
    </Form>
    </>
  )
}

export default RescheduleAppointmentForm