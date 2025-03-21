"use client";
import React, {useState, useEffect, useRef} from 'react';
import Form from 'next/form';
import Image from 'next/image';
import Link from 'next/link';
import mockDoctorInfo from '@/components/mockDoctorInfo';
import { useDebouncedCallback } from 'use-debounce';


const SpecialityForm = ( {specialityArray }: { specialityArray: string[] }) => {

    const [speciality, setSpeciality] = useState<string>("");

  return (
    <div className='relative'>
        <Form action="/finddoctor" className='w-full h-[50px] flex border-3 rounded-md justify-between gap-[2px]'>
            <select className="outline-rose-500" id="speciality" name="speciality" value={speciality} onChange={e => setSpeciality(e.target.value)}>
                <option value="" >Find by Speciality</option>
                {specialityArray && specialityArray.map( s => (
                    <option key={s} value={s}>
                    {s}
                    </option>
                ))}
            </select>
            <button type="submit" className='p-2'><Image src="/magnifier.png" width={32} height={32} alt="Find by Speciality" /></button>
        </Form>
    </div>
  )
}

export default SpecialityForm