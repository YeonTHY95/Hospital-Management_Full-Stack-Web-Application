import React from 'react';
import Image from 'next/image';
import MakeAppointmentButton from '@/components/makeAppointButton';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const DoctorListComponent =  ( {id,name, qualification, speciality, spokenLanguage} :
    {
        id : number,
        name : string,
        qualification : string,
        speciality : string,
        spokenLanguage : string[]
    }
) => {

  return (
    <div className='grid grid-cols-[1fr_2fr] grid-rows-5 gap-5 border-2 rounded-sm m-[5px] p-[5px]'>
      <div className='row-start-1 row-end-6 col-start-1 col-end-2 flex justify-center items-center ' >
        <Image priority className="size-auto" src='/doctoricon.svg' height={500} width={300} alt='Doctor Profile Picture'/>
      </div>
      <div className='row-start-1 row-end-2 col-start-2 col-end-3 text-3xl font-bold pt-[10px]'>
        <Link href={`/doctordetails/${id}`}><p className='underline decoration-green-300'>{name}</p></Link>
      </div>
      <div className='row-start-2 row-end-3 col-start-2 col-end-3 text-xl'>
        <p>{qualification}</p>
      </div>
      <div className='row-start-3 row-end-4 col-start-2 col-end-3 text-xl'>
        <p>Speciality : {speciality}</p>
      </div>
      <div className='row-start-4 row-end-5 col-start-2 col-end-3 text-xl'>
        <p className='font-bold text-xl'>Language</p>
        { (spokenLanguage.length > 0 ) && spokenLanguage.map( (language,index) => {
            if ( index !== spokenLanguage.length-1){
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
        <MakeAppointmentButton id={id}/>
      </div>
      
    </div>
  )
}

export default DoctorListComponent