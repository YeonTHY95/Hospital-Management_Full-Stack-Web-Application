import React from 'react';
import prisma from '@/lib/prisma';
import FindDoctorForm from '@/components/finddoctorform';
import FindDoctorWithSpecialityForm from '@/components/findDoctorWithSpecialityForm';
import DoctorListComponent from '@/components/doctorListComponent';
import PaginationComponent from '@/components/paginationComponent';
import CountUpComponent from '@/components/CountUpComponent';


const FindDoctor = async ( {searchParams} : { searchParams : Promise<{searchdoctorname:string | undefined, speciality: string | undefined}>}) => {

  const {searchdoctorname, speciality} = await searchParams;

  var doctorList:{name:string,id: number;
  qualification: string;
  speciality: string;
  spoken_language: string[];}[]=[];

  if ((speciality === undefined )|| (speciality === "" )) {
    doctorList = await prisma.doctorinfo.findMany({
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
  
    
  }
  else if (searchdoctorname === undefined) {
    doctorList = await prisma.doctorinfo.findMany({
      where : {
        speciality :  {
          equals: speciality
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
  }
  else {
    doctorList = await prisma.doctorinfo.findMany({
      where : {
        speciality :  {
          equals: speciality
        },
        name : {
          contains : searchdoctorname
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
  }
  
  const fetchDoctor:{ name: string, id : number,speciality:string}[] = await prisma.doctorinfo.findMany ( {
    select : {
      name : true,
      id: true,
      speciality: true
    }
  });

  const fetchSpeciality:{ speciality : string}[] = await prisma.doctorinfo.findMany ( {
    select : {
      speciality : true,
    }
  });

  const specialityArray = fetchSpeciality.map( s => s.speciality);
  const specialityUniqueArray = [...new Set(specialityArray)];

  return (
    <div className='relative flex flex-col items-center'>
      <div>
        <FindDoctorWithSpecialityForm fetchDoctorData={fetchDoctor} specialityArray={specialityUniqueArray}/>

      </div>
      <div className='relative z-1'>
        <p className='font-bold text-2xl m-[5px]'><span className='font-bold text-5xl'><CountUpComponent n={doctorList.length} /></span> doctors found</p>
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