import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation' ;
import { decrypt } from '@/lib/session';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const UserView = async () => {

  const cookieStore = await cookies();
  const cookie = cookieStore.get('jwtsession')?.value;
  var role;
  var name;

  if(!cookie) redirect('/signin');
  else {
    const session = await decrypt(cookie) ;
    const username = session?.userId as string;
    if (username) {
    const userinfo = await prisma.user.findFirst({
      where : {
        username : username
      },
      select : {
        username : true,
        role : true
      }
    });

    if(!userinfo) {
      // It could be a doctor
      const userinfo = await prisma.doctor.findFirst({
        where : {
          username : username
        },
        select : {
          username : true,
          role : true
        }
      });
      if (userinfo) {
        role = userinfo.role;
        name = userinfo.username;
        console.log("The role is ",role);
      }
      else {
        console.log("User does not exist");
        redirect('/signin');
      }
    }
    else {
      // It is a patient
      role = userinfo.role;
      name = userinfo.username;
      console.log("The role is ",role);
    }

  }
}

    
  return (
    <div className='w-full min-h-[300px] max-h-lvh flex flex-col justify-center items-center gap-5'> 
      <div>
        <Link href={`/userview/myappointment?username=${name}&role=${role}`} className='text-3xl font-bold'>View my Appointment</Link>
      </div>
      <div>
        <Link href={`/userview/myinfo?role=${role}`} className='text-3xl font-bold'>View my Personal Information</Link>
      </div>
    </div>
  )
}

export default UserView