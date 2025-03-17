import React from 'react';
import mockDoctorInfo from '@/components/mockDoctorInfo';
import Image from 'next/image';
import MakeAppointmentButton from '@/components/makeAppointButton';

const DoctorDetails = async ( {params} : {params: Promise< { doctorID : number }>}) => {

  const  { doctorID } = await params;

  console.log(`doctorID is ${doctorID}`);

  const doctorInfo = mockDoctorInfo.filter( doctor => doctor.id === Number(doctorID))[0];

  const schedule = Object.entries(doctorInfo.schedule);

  return (
    <div className='grid grid-cols-3 grid-rows-5 gap-5'>
      <div className='row-start-1 row-end-6 col-start-1 col-end-2 flex justify-center items-center' >
        <Image src='/doctoricon.svg' height={500} width={300} alt='Doctor Profile Picture'/>
      </div>
      <div className='row-start-1 row-end-2 col-start-2 col-end-3 text-3xl font-bold'>
        <p>{doctorInfo.name}</p>
      </div>
      <div className='row-start-2 row-end-3 col-start-2 col-end-3 text-xl'>
        <p>{doctorInfo.qualification}</p>
      </div>
      <div className='row-start-3 row-end-4 col-start-2 col-end-3 text-xl'>
        <p>Speciality : {doctorInfo.speciality}</p>
      </div>
      <div className='row-start-4 row-end-5 col-start-2 col-end-3 text-xl'>
        <p className='font-bold text-xl'>Language</p>
        { (doctorInfo.spoken_language.length > 0 ) && doctorInfo.spoken_language.map( (language,index) => {
            if ( index !== doctorInfo.spoken_language.length-1){
              return <span key={language}>{language}, </span>
            }
            else {
              return <span key={language}>{language}</span>
            }
          }
        )
      }
      </div>
      <div className='row-start-5 row-end-6 col-start-2 col-end-3 text-xl'>
        <h2>📍 {doctorInfo.office_location}</h2>
      </div>
      <div className='row-start-1 row-end-2 col-start-3 col-end-4 text-xl'>
        <MakeAppointmentButton id={doctorInfo.id}/>
      </div>
      <div className='row-start-2 row-end-6 col-start-3 col-end-4 text-xl'>
        <p className='font-bold text-xl'>Schedule</p>
        {schedule.map( schedule => {
          return <p>{schedule[0]} : {schedule[1]}</p>
        })}
      </div>
    </div>
  )
}

export default DoctorDetails