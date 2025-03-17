"use client";
import React, {useState, useEffect} from 'react';
import Form from 'next/form';
import mockDoctorInfo from '@/components/mockDoctorInfo';

const FindDoctorForm = () => {

    const [search, setSearch] = useState<string>("");
    const [matchResult, setMatchResult] = useState<string[]>([]);

    const fetchDoctorData = mockDoctorInfo.map( doctor => doctor.name) ;

    useEffect(()=> {
        const matchResultFilter = fetchDoctorData.filter( doctorName => {
            console.log("Search inside is ", search);
            if (search === "") {
                return false;
            }
            return doctorName.toLowerCase().includes(search);
        });
        //console.log(`fetchDoctorData is ${fetchDoctorData}`);
        console.log(`matchResultFilter is ${matchResultFilter}`);
        setMatchResult(matchResultFilter);
    },[search]);


  return (
    <div className='relative'>
        <Form action="/finddoctor" className='w-full h-min border-3'>
            <input className='min-h-auto w-full' placeholder='Find a Doctor' value={ search || "" } onChange={(event:React.FormEvent<HTMLInputElement>)=> {
                setSearch(event.currentTarget.value);
            }
            }/>
        </Form>
        <div className='absolute top-[31px] m-[5px]'>
            <ul>
            { (matchResult.length > 0) && matchResult.slice(0,5).map( matchedDoctorName => <li key={matchedDoctorName}>{matchedDoctorName}</li> ) }
            </ul>
        </div>
    </div>
  )
}

export default FindDoctorForm