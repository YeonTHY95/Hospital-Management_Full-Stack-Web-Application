"use client";
import React, {useState, useEffect, useRef} from 'react';
import Form from 'next/form';
import Image from 'next/image';
import Link from 'next/link';
import mockDoctorInfo from '@/components/mockDoctorInfo';
import { useDebouncedCallback } from 'use-debounce';


const FindDoctorWithSpecialityForm = ( {fetchDoctorData ,specialityArray}: { fetchDoctorData: { name: string; id: number; speciality: string}[],specialityArray: string[] }) => {

    const [search, setSearch] = useState<string>("");
    const [speciality, setSpeciality] = useState<string>("");
    const [isFocus, setIsFocus] = useState(false);
    const [matchResult, setMatchResult] = useState<{name:string,id:number}[]>([]);

    const debounced = useDebouncedCallback(
        // function
        (value) => {
            setMatchResult(value);
        },
        // delay in ms
        300
      );

    
    // const fetchDoctorData =  mockDoctorInfo.map( doctor => ({ "name" : doctor.name, "id":doctor.id }) ) ;

    const handleFocus = () => {
        setIsFocus(true);
    };
    const handleBlur = () => {
        setTimeout( ()=> setIsFocus(false), 1000);
    };

    useEffect(()=> {
        const matchResultFilter = fetchDoctorData.filter( doctorName => {
            // console.log("Search inside is ", search);
            // console.log("fetchDoctorData's length is ", fetchDoctorData.length);
            //console.log(`speciality is ${speciality}`);
            if (search === "") {
                return false;   
            }
            if (speciality === "") {
                // console.log(`speciality is empty`);
                return doctorName.name.toLowerCase().includes(search)
            }
            return doctorName.name.toLowerCase().includes(search) && doctorName.speciality.includes(search);
        });
        //console.log(`fetchDoctorData is ${fetchDoctorData}`);
        //console.log(`matchResultFilter is ${matchResultFilter}`);
        debounced(matchResultFilter);
    },[search]);


  return (
    <div className='relative'>
        <Form action="/finddoctor" className='w-full h-min flex border-3 rounded-md justify-between gap-[2px]'>
            <input name="searchdoctorname" onFocus={handleFocus} onBlur={handleBlur} className='min-h-auto w-full m-[10px] outline-none caret-cyan-900' placeholder='Find a Doctor' value={ search || "" } onChange={(event:React.FormEvent<HTMLInputElement>)=> {
                setSearch(event.currentTarget.value);
            }
            }/>
            <select className="outline-rose-500" id="speciality" name="speciality" value={speciality} onChange={e => setSpeciality(e.target.value)}>
                <option value="" >Find by Speciality</option>
                {specialityArray && specialityArray.map( s => (
                    <option key={s} value={s}>
                    {s}
                    </option>
                ))}
            </select>
            <button type="submit" className='p-2'><Image src="/magnifier.png" width={32} height={32} alt="Find" /></button>
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

export default FindDoctorWithSpecialityForm