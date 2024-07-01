"use client";
import React, { useState } from 'react'
import { BiInfoSquare, BiSolidInfoSquare } from 'react-icons/bi'

const InfoButton = ({toggleDetails}) => {
    const [clicked, setClicked] = useState(false)
  return (
    <>
    {
        clicked?<BiSolidInfoSquare onClick={()=>{setClicked(!clicked)}} color="#784bf8" />:<BiInfoSquare color="#784bf8" onClick={()=>{setClicked(!clicked)}}/>
    }
    </>
  )
}

export default InfoButton