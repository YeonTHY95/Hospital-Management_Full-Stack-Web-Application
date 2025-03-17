"use client";
import React from 'react';
import Link from 'next/link';

const MakeAppointmentButton = ( {id} : {id : number}) => {

  return (
    <button className='bg-sky-500 p-[10px] rounded-sm'><Link href={`/makeappointment?id=${id}`}>Make Appointment</Link></button>
  )
}

export default MakeAppointmentButton