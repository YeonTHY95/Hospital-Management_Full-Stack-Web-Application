"use client"
import React from 'react';
import CountUp from 'react-countup';

const CountUpComponent = ({n }:{n:number}) => {
  return (<>

        { (n < 3 )? <span>{n}</span> : <CountUp end={n} /> }
  
  </>
  )
}

export default CountUpComponent