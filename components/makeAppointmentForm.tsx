"use client";
import React, {useActionState, useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import Form from 'next/form';
import makeAppointmentAction from '@/components/makeAppointmentAction';
import fetchDoctorName from '@/components/fetchDoctorName';
import toast, { Toaster } from 'react-hot-toast';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation'
 


const MakeAppointmentForm = ({dname, username, doctorlist} : { dname : string | null, username : string | null, doctorlist : { name: string }[] }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

  const [state, formAction , isPending] = useActionState(makeAppointmentAction, "");
 
  const [doctorName, setDoctorName] = useState<string>(dname ?? "");
  const [patientName, setPatientName] = useState<string | null>(username);
  const [contactNumber, setContactNumber] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date>(new Date());
  const [symptom, setSymptom] = useState<string | null>(null);
  
  const [error, setError] = useState<string>("");

  useEffect(()=> {
    setError("");

    switch(state) {
      case "Appointment created successfully" : {
        toast.success('Appointment created successfully!',{duration:3000});
        setTimeout(()=> {
          router.push('/userview')
        }, 3000);
      }
      default : {
        setError(state);
      }


    }
  }, [state, isPending]);

  return (
    <>
    <Toaster />
    <Form action={formAction}>
      <legend><p className='text-3xl font-black'>Make Appointment</p></legend>
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
          <DatePicker dateFormat={"YYYY-MM-DD"}selected={appointmentDate} onChange={(date) => date && setAppointmentDate(date)} />
            <input type="hidden" name="appointmentDate" value={appointmentDate.toISOString().split("T")[0]} />
        </div>
        <div className='row-start-5 row-end-6 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='symptom'>Symptoms : </label>
        </div>
        <div className='row-start-5 row-end-6 col-start-2 col-end-3 text-xl justify-self-start self-center'>
          <textarea className="p-[3px] border-[2px] rounded-md" id='symptom' name="symptom" rows={3} cols={50} placeholder='State your symptom' value={symptom || ""} onChange={(event:React.FormEvent<HTMLTextAreaElement>)=> setSymptom(event.currentTarget.value)} />
        </div>
        <div className='row-start-6 row-end-7 col-start-1 col-end-3 justify-self-center self-center' >
            <button className='bg-sky-500 p-[10px] rounded-xl w-[100px] h-[50px] text-white font-bold hover:bg-sky-700'>{isPending ? <p>Submitting</p> : <p>Submit</p>}</button>
        </div>
        
      </div>
    </Form>
    </>
  )
}

export default MakeAppointmentForm