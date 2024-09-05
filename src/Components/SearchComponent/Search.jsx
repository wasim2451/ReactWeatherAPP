import React from 'react'
import { useState } from 'react'
import search from '../Assets/Search.png'
import location from '../Assets/SearchLocation.png'
function Search({searchValue}) {
    const[value,setValue]=useState("")
    return (
        <div className=' input-bar flex justify-around  gap-[10px] p-[1.5%]'>
            <img className='w-[40px] ' src={location} alt="" />
            <input className='w-[85%] text-[12px] md:text-[18px] border-[1px] border-yellow-300 rounded-3xl px-[20px] py-[5px] font-medium' type="text" placeholder='Enter Your Location' value={value} onChange={(e)=>{
                    setValue(e.target.value)

                } } />
            <button onClick={()=>{searchValue(value) 
            setValue("")}}><img src={search} className='w-[42px]' alt="" /></button>
        </div>
    )
}

export default Search

