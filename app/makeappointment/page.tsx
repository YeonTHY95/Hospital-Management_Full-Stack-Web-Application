"use client";
import React, {useActionState, useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import Form from 'next/form';
import makeAppointmentAction from '@/components/makeAppointmentAction';
import fetchDoctorName from '@/components/fetchDoctorName';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const MakeAppointment =  () => {

  const searchParams = useSearchParams();

  const [state, formAction , isPending] = useActionState(makeAppointmentAction, null);

  useEffect (()=> {

    const process = async () => {

      setDoctorName(await fetchDoctorName(Number(searchParams.get('id'))));
    } ;
    
    process();
  },[]);
  
 
  const [doctorName, setDoctorName] = useState<string | null>(null);
  const [patientName, setPatientName] = useState<string | null>(null);
  const [contactNumber, setContactNumber] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date>(new Date());
  const [symptom, setSymptom] = useState<string | null>(null);

  return (
    <Form action={formAction}>
      <legend><p className='text-3xl font-black'>Make Appointment</p></legend>
      <div className='grid grid-rows-6 grid-cols-2 gap-2 w-[50%] h-[30%]' >
        <div className='row-start-1 row-end-2 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='doctorName'>Doctor Name : </label>
        </div>
        <div className='row-start-1 row-end-2 col-start-2 col-end-3 text-xl justify-self-start self-center'>
          <input id='doctorName' name="doctorName" type="text" placeholder='Doctor Name' value={doctorName || ""} onChange={(event:React.FormEvent<HTMLInputElement>)=> setDoctorName(event.currentTarget.value)} />
        </div>
        <div className='row-start-2 row-end-3 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='patienceName'>Patience Name : </label>
        </div>
        <div className='row-start-2 row-end-3 col-start-2 col-end-3 text-xl justify-self-start self-center' >
          <input id='patienceName' name="patienceName" type="text" placeholder='Patient Name' value={patientName || ""} onChange={(event:React.FormEvent<HTMLInputElement>)=> setPatientName(event.currentTarget.value)} />
        </div>
        <div className='row-start-3 row-end-4 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='contactNumber'>Contact Number : </label>
        </div>
        <div className='row-start-3 row-end-4 col-start-2 col-end-3 text-xl justify-self-start self-center'>
          <input id='contactNumber' name="contactNumber" type="text" placeholder='Contact Number' value={contactNumber || ""} onChange={(event:React.FormEvent<HTMLInputElement>)=> setContactNumber(event.currentTarget.value)} />
        </div>
        <div className='row-start-4 row-end-5 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='appointmentDate'>Appointment Date : </label>
        </div>
        <div className='row-start-4 row-end-5 col-start-2 col-end-3 text-xl justify-self-start self-center'>
          <DatePicker selected={appointmentDate} onChange={(date) => date && setAppointmentDate(date)} />
        </div>
        <div className='row-start-5 row-end-6 col-start-1 col-end-2 text-2xl font-bold justify-self-end self-center'>
          <label htmlFor='symptom'>Symptoms : </label>
        </div>
        <div className='row-start-5 row-end-6 col-start-2 col-end-3 text-xl justify-self-start self-center'>
          <textarea className='outline-black' id='symptom' name="symptom" rows={3} cols={50} placeholder='State your symptom' value={symptom || ""} onChange={(event:React.FormEvent<HTMLTextAreaElement>)=> setSymptom(event.currentTarget.value)} />
        </div>
        <div className='row-start-6 row-end-7 col-start-1 col-end-3 justify-self-center self-center' >
          <button className='bg-sky-500 p-[10px] rounded-xl w-[100px] h-[50px] text-white font-bold hover:bg-sky-700'>Submit</button>
        </div>
        
      </div>
    </Form>
  )
}

export default MakeAppointment