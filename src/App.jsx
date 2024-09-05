import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Search from './Components/SearchComponent/Search';
import Weather from './Components/Weather/Weather';
import ChatAI from './Components/ChatComponent/ChatAI';
// City Name Peyegechi
function App() {
  // Search Constant
  const[search,setSearch]=useState("");
  const handleValue=(value)=>{
    setSearch(value); // Value Of Search Stored
    // console.log(value);
    return value;
  }
  // Weather Data Constant
  const [weatherData, setWeatherData] = useState({
    city:"",
    temperature:"",
    feels_like:"",
    humidity:"",
    description:"",
    max_temp:"",
    min_temp:"",
    pressure:"",
    speed:"",
  })
  const handleWeatherData=(data)=>{
    // console.log(data);
    setWeatherData({
      city:data.city,
      temperature:data.temperature,
      feels_like:data.feels_like,
      humidity:data.humidity,
      description:data.description,
      max_temp:data.max_temp,
      min_temp:data.min_temp,
      pressure:data.pressure,
      speed:data.speed,
    });
  }
  return (
    <>
    {/* Navbar */}
    <Navbar/>
      <div className="grid place-items-center md:px-[10%] lg:px-[15%] md:mt-[2%]  mt-[6%]">
       {/* Main Div */}

       <div className='flex flex-wrap md:flex-nowrap justify-center'>
        {/* Weather Div */}
        <div className='border-2 border-[#FEECB3] px-[5%] py-[2%] md:w-[600px] w-[350px] border-b-0 md:border-r-0 md:border-b-2'>
              <Search searchValue={handleValue}/>
              <Weather search={search} handleData={handleWeatherData}/>
        </div>
        {/* Chat AI Div */}
        <div className='LamaAPI border-2  border-[#FEECB3] p-[5%] md:w-[600px] w-[350px] md:text-[16px] text-[13px] font-semibold text-slate-700 text-left'>
              <div className='font-bold text-[18px]'>Llama 3.1</div>
              <ChatAI weatherData={weatherData}/>
              
              
        </div>
       </div>
      </div>
    </>
  )
}

 
export default App
