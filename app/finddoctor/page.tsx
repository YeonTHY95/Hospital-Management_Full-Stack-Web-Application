import React from 'react';
import prisma from '@/lib/prisma';
import FindDoctorForm from '@/components/finddoctorform';
import DoctorListComponent from '@/components/doctorListComponent';
import PaginationComponent from '@/components/paginationComponent';

const FindDoctor = async ( {searchParams} : { searchParams : Promise<{searchdoctorname:string}>}) => {

  const {searchdoctorname} = await searchParams;

  const doctorList = await prisma.doctorinfo.findMany({
    where : {
      name :  {
        contains: searchdoctorname
      }
    },
    select : {
      id :true ,
      name :true ,
      qualification :true ,
      speciality :true ,
      spoken_language :true ,
    }
  });

  const fetchDoctor:{ name: string, id : number}[] = await prisma.doctorinfo.findMany ( {
    select : {
      name : true,
      id: true
    }
  });

  return (
    <div className='relative flex flex-col items-center'>
      <div>
        <FindDoctorForm fetchDoctorData={fetchDoctor} />

      </div>
      <div className='relative z-1'>
        <p className='font-bold text-2xl m-[5px]'><span className='font-bold text-5xl'>{doctorList.length}</span> doctors found</p>
      </div>
      <div className='relative z-1'>
        <PaginationComponent  
        itemsPerPage={3} totalItems={doctorList.length} allItemsArray={doctorList}
        /> 
        {/* {
          (doctorList.length > 0) && doctorList.map ( doctor => (
            <div key={doctor.id}>
              <DoctorListComponent 
              id = {doctor.id}
              name ={doctor.name}
              qualification ={doctor.qualification}
              speciality ={doctor.speciality}
              spokenLanguage ={doctor.spoken_language}
              />
            </div>
          )
             
          )
        } */}
      </div>
    </div>
  )
}

export default FindDoctor