"use client";
import React, {useState, useEffect, useRef} from 'react';
import Form from 'next/form';
import Image from 'next/image';
import Link from 'next/link';
import mockDoctorInfo from '@/components/mockDoctorInfo';


const FindDoctorForm = ( {fetchDoctorData }: { fetchDoctorData: { name: string; id: number }[] }) => {

    const [search, setSearch] = useState<string>("");
    const [isFocus, setIsFocus] = useState(false);
    const [matchResult, setMatchResult] = useState<{name:string,id:number}[]>([]);

    
    // const fetchDoctorData =  mockDoctorInfo.map( doctor => ({ "name" : doctor.name, "id":doctor.id }) ) ;

    const handleFocus = () => {
        setIsFocus(true);
    };
    const handleBlur = () => {
        setTimeout( ()=> setIsFocus(false), 1000);
    };

    useEffect(()=> {
        const matchResultFilter = fetchDoctorData.filter( doctorName => {
            console.log("Search inside is ", search);
            console.log("fetchDoctorData's length is ", fetchDoctorData.length);
            if (search === "") {
                return false;
            }
            return doctorName.name.toLowerCase().includes(search);
        });
        //console.log(`fetchDoctorData is ${fetchDoctorData}`);
        console.log(`matchResultFilter is ${matchResultFilter}`);
        setMatchResult(matchResultFilter);
    },[search]);


  return (
    <div className='relative'>
        <Form action="/finddoctor" className='w-full h-min flex border-3 rounded-md justify-between gap-[2px]'>
            <input name="searchdoctorname" onFocus={handleFocus} onBlur={handleBlur} className='min-h-auto w-full m-[10px] outline-none caret-cyan-900' placeholder='Find a Doctor' value={ search || "" } onChange={(event:React.FormEvent<HTMLInputElement>)=> {
                setSearch(event.currentTarget.value);
            }
            }/><button type="submit" className='p-2'><Image src="/magnifier.png" width={32} height={32} alt="Find" /></button>
        </Form>
        {isFocus && (<div className='absolute top-[45px] m-[5px] z-15 bg-white'>
            <ul>
            { (matchResult.length > 0) && matchResult.slice(0,5).map( matchedDoctor => <li key={matchedDoctor.id} className='border-2 p-[5px]'><Link href={`/doctordetails/${matchedDoctor.id}`} >{matchedDoctor.name}</Link></li> ) }
            </ul>
        </div>)
        }
    </div>
  )
}

export default FindDoctorForm