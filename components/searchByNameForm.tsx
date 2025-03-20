"use client";
import React, {useState, useEffect, useRef} from 'react';
import Form from 'next/form';
import Image from 'next/image';
import Link from 'next/link';
import mockDoctorInfo from '@/components/mockDoctorInfo';


const SearchByNameForm = ( {fetchNameList, username, role }: { username: string, role : string, fetchNameList: string[] }) => {

    const [search, setSearch] = useState<string>("");
    const [isFocus, setIsFocus] = useState(false);
    const [matchResult, setMatchResult] = useState<string[]>([]);

    
    // const fetchNameList =  mockDoctorInfo.map( doctor => ({ "name" : doctor.name, "id":doctor.id }) ) ;

    const handleFocus = () => {
        setIsFocus(true);
    };
    const handleBlur = () => {
        setTimeout( ()=> setIsFocus(false), 1000);
    };

    useEffect(()=> {
        const matchResultFilter = fetchNameList.filter( doctorName => {
            console.log("Search inside is ", search);
            console.log("fetchNameList's length is ", fetchNameList.length);
            if (search === "") {
                return false;
            }
            return doctorName.toLowerCase().includes(search);
        });
        //console.log(`fetchNameList is ${fetchNameList}`);
        console.log(`matchResultFilter is ${matchResultFilter}`);
        setMatchResult(matchResultFilter);
    },[search]);


  return (
    <div className='relative w-full max-w-[500px] m-auto'>
        <Form action={`/userview/myappointment`} className='w-full h-min flex border-3 rounded-md justify-between gap-[2px]'>
            <input type='hidden' name="username" value={ username } />
            <input type='hidden' name="role" value={ role } />
            <input onFocus={handleFocus} onBlur={handleBlur} name="searchByName" className='min-h-auto w-full m-[10px] outline-none caret-cyan-900' placeholder='Search by Name' value={ search || "" } onChange={(event:React.FormEvent<HTMLInputElement>)=> {
                setSearch(event.currentTarget.value);
            }
            }/><button type="submit" className='p-2'><Image src="/magnifier.png" width={32} height={32} alt="Find" /></button>
        </Form>
        {isFocus && (<div className='absolute top-[45px] m-[5px] z-15 bg-white'>
            <ul>
            { (matchResult.length > 0) && matchResult.slice(0,5).map( MatchedName => <li key={MatchedName} className='border-2 p-[5px]'><Link href={`/userview/myappointment?searchByName=${MatchedName}&username=${username}&role=${role}`} >{MatchedName}</Link></li> ) }
            </ul>
        </div>)
        }
    </div>
  )
}

export default SearchByNameForm