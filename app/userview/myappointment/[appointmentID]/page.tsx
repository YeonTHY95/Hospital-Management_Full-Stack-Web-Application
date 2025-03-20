import React from 'react';
import prisma from '@/lib/prisma';
import RescheduleAppointmentForm from "@/components/rescheduleAppointmentForm";

const RescheduleAppointmentPage =  async ( { params} : { params: Promise<{ appointmentID : string}> }) => {

  const appointmentIDFromParams = await params ;
  console.log(`Appointment ID is ${JSON.stringify(appointmentIDFromParams)}`)

  const appointment = await prisma.appointment.findFirst({
    where: {
        appointmentID : Number(appointmentIDFromParams.appointmentID)
    }
  });

  const doctors = await prisma.doctorinfo.findMany({
    select: {
      name : true
    }
  });

  const {doctorName, patientName, contactNumber, appointmentDate, symptom} = appointment || {};

  return (
    <>
      <RescheduleAppointmentForm id = {Number(appointmentIDFromParams.appointmentID)} dname={ doctorName} username = {patientName} cn={contactNumber} date={appointmentDate} symp={symptom} doctorlist={doctors}/>
    </>
    
  )
}

export default RescheduleAppointmentPage

