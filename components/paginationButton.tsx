import React from 'react';

const PaginationButton = ({total, itemsPerPage, currentPage, setCurrentPage}: {total:number, itemsPerPage:number,currentPage: number,setCurrentPage: React.Dispatch<React.SetStateAction<number>>}) => {

    let numberofButton = [];

    for ( let i=1 ; i<= Math.ceil( total/itemsPerPage) ; i++) {
        // console.log(`total is ${total}`);
        // console.log(`itemsPerPage is ${itemsPerPage}`);
        numberofButton.push(i);
    }
    const max = Math.max.apply(null, numberofButton);
    const min = Math.min.apply(null, numberofButton);

  return (
    <div className='flex justify-between items-center gap-3 text-xl'>
        { numberofButton.length > 0 && <button className ='hover:cursor-pointer hover:bg-green-500 font-bold bg-green-300 rounded-sm p-[5px]' onClick={() => {
            const max = Math.max.apply(null, numberofButton);
            const min = Math.min.apply(null, numberofButton);
            if ( currentPage === min) {
                setCurrentPage (max);
            }
            else {
                setCurrentPage ( current => current - 1 )
            }
        }}>Previous</button> }
        {   <div className='flex justify-center items-center gap-3 '> {
            numberofButton.map( (b,index) => {
                return <button className ='hover:cursor-pointer border-2 p-[3px]' onClick={()=> setCurrentPage(b) } key={index}>{b}</button>
            })
                }
            </div>
        }
        { numberofButton.length > 0 && <button className ='hover:cursor-pointer hover:bg-green-500 font-bold bg-green-300 rounded-sm p-[5px]' onClick={() => {
            
            if ( currentPage === max) {
                setCurrentPage (min);
            }
            else {
                setCurrentPage ( current => current + 1 )
            }
        }}>Next</button> }
    </div>
  )
}

export default PaginationButton