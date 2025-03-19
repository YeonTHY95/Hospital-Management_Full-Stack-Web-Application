import React from 'react';
import prisma from '@/lib/prisma';
import MakeAppointmentForm from "@/components/makeAppointmentForm";
import { redirect } from 'next/navigation';
import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

const MakeAppointment =  async ( { searchParams} : { searchParams: Promise<{ id : string}> }) => {


  const doctorinfoID = await searchParams ;
  console.log(`doctor info ID is ${JSON.stringify(doctorinfoID)}`)
  var doctorInfo ; //{ id : number , name : string  , qualification:string, speciality :string, spoken_language :string[],office_location:string , schedule : {"Monday":string} , doctorID : string | null } | null ;

  if ( !doctorinfoID.id ) {
    doctorInfo = null ;
  } else {
     doctorInfo = await prisma.doctorinfo.findFirst( {
      where : {
          id : Number(doctorinfoID.id)
      },
  });
  }

  const doctors = await prisma.doctorinfo.findMany({
    select: {
      name : true
    }
  })

  const cookieStorage = await cookies();
  const session = cookieStorage.get('jwtsession')?.value ;

  const username = await decrypt(session) ;
  console.log(`username is ${JSON.stringify(username)}`);
  
  

  const userID = await decrypt(session) ;

  console.log("userID from cookie is ", userID);


  

  return (
    <>
      <MakeAppointmentForm dname={ doctorInfo && doctorInfo.name} username = {username?.userId as string} doctorlist={doctors}/>
    </>
    
  )
}

export default MakeAppointment