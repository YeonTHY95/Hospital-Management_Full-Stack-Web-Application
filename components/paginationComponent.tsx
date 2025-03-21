"use client";
import React, {useState} from 'react'
import DoctorListComponent from '@/components/doctorListComponent';
import PaginationButton from '@/components/paginationButton';

const PaginationComponent = ({ itemsPerPage, totalItems, allItemsArray}: {itemsPerPage : number, totalItems:number, allItemsArray:{name: string;
    id: number;
    qualification: string;
    speciality: string;
    spoken_language: string[];}[]}) => {

    const [currentPage, setCurrentPage] = useState<number>(1);

    const lastIndexItem = currentPage * itemsPerPage;
    const firstIndexItem = lastIndexItem - itemsPerPage;

    const currentItemsArray = allItemsArray.slice(firstIndexItem,lastIndexItem) ;

  return (
    <div>
        <div>
            <PaginationButton currentPage={currentPage} total={totalItems} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} />
        </div>
        <div>
        { currentItemsArray.map(doctor => (
            <div key={doctor.id}>
                <DoctorListComponent 
                    id={doctor.id}
                    name={doctor.name}
                    qualification={doctor.qualification}
                    speciality={doctor.speciality}
                    spokenLanguage={doctor.spoken_language}
                />
            </div>
            ))}
          </div> 
        

        
    </div>
  )
}

export default PaginationComponent