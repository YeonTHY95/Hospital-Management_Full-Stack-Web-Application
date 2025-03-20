import React from 'react';

const PaginationButton = ({total, itemsPerPage, setCurrentPage}: {total:number, itemsPerPage:number,setCurrentPage: React.Dispatch<React.SetStateAction<number>>}) => {

    let numberofButton = [];

    for ( let i=1 ; i<= Math.ceil( total/itemsPerPage) ; i++) {
        // console.log(`total is ${total}`);
        // console.log(`itemsPerPage is ${itemsPerPage}`);
        numberofButton.push(i);
    }
  return (
    <div>
        {
            numberofButton.map( (b,index) => {
                return <button onClick={()=> setCurrentPage(b) } key={index}>{b}</button>
            })
        }
    </div>
  )
}

export default PaginationButton