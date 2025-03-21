"use client"
import React from 'react';
import CountUp from 'react-countup';

const CountUpComponent = ({number }:{number:number}) => {
  return (
    <CountUp end={number} />
  )
}

export default CountUpComponent