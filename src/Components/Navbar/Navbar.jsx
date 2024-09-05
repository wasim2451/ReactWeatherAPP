import React from 'react'
import Icon from '../Assets/WeatherIcon.png'
import Bot from '../Assets/ChatBot.png'
function Navbar() {
    return (
        <nav className=' Navbar flex justify-between  bg-[#FFF6EA] min-h-[40px] md:text-[28px] text-[20px] w-full px-[30px] py-[5px]'>
            <div className='flex gap-[5px] justify-start items-center mx-[5%]'>
            <p className='font-bold'>WeatherGPT</p>
            <img src={Bot} alt="" className='w-[35px] md:w-[60px]'/>
            </div>
            <div className='mx-[5%]'>
                <img src={Icon} alt="Icon" className='w-[40px] md:w-[65px]'/>
            </div>
        </nav>

    )
}

export default Navbar
