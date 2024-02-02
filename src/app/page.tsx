'use client'

import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloudIcon from '@mui/icons-material/Cloud';
import DehazeIcon from '@mui/icons-material/Dehaze';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';

export default function Home() {

  const [place, setPlace] = useState<string>("khariar");

  const [placeData, setPlaceData] = useState<any>(null);

  const currentTime:string = new Date().toLocaleDateString([],{
    hour:"2-digit",
    minute:"2-digit"
  });

  const getWeatherData = async () => {

    if( place.trim().length === 0) {
      alert("please enter a valid place");
      return;
    }

   try{
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

    const res = await fetch(api);
    const data = await res.json();

    if( data.cod == 404){
      setPlaceData(null);
    }
    else{
      setPlaceData(data);
    }
   }
   catch(e){
    setPlaceData(null);
   }
  }

  useEffect(() => {
    getWeatherData();
  },[]);

  return (
    <div className="outerdiv">
      
      <div className="searchbar">

        <input type="search" placeholder="City Name" onChange={(e) => {
          setPlace(e.target.value);
        }} />
        <button onClick={getWeatherData}>
          <SearchIcon className=" text-3xl"></SearchIcon>
        </button>

      </div>

      {
        !placeData && <div className=" flex items-center justify-center h-full">
          <div className=" bg-inherit font-semibold text-inherit bg-red-100 text-7xl p-12 rounded-xl flex flex-col justify-center items-center gap-10">
            <div className="flex items-center justify-center p-5 bg-white w-full rounded-md">
              <div className="text-center">
                <div className="inline-flex rounded-full bg-red-100 p-4">
                  <div className="rounded-full stroke-red-600 bg-red-200 p-4">
                    <svg className="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </div>
                </div>
                <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">404 - City not found</h1>
                <p className="text-slate-600 mt-5 lg:text-lg">The city you are looking for doesn't exist or <br />has been removed.</p>
              </div>
            </div>
          </div>
        </div>
      }

      {
        placeData && <div className="row">

          <div className="section1">
            <div className="section11">
              {
                placeData?.weather[0].main==="Clouds" && <CloudIcon className="weathericon"/>
              }
              {
                placeData?.weather[0].main === 'Haze' &&
                <DehazeIcon className="weathericon" />
              }
              {
                placeData?.weather[0].main === 'Smoke' &&
                <VapingRoomsIcon className="weathericon" />
              }
              {
                placeData?.weather[0].main === 'Clear' &&
                <WbSunnyIcon className="weathericon" />
              }
              {
                placeData?.weather[0].main === 'Rain' &&
                <WaterDropTwoToneIcon className="weathericon" />
              }

              <p className="temp">
                {
                  (placeData?.main.temp-273.15).toFixed(1)
                }
                <span>
                °C
                </span>
              </p>
            </div>
            <div className="section11">
              <p className="city">
                {
                  placeData?.name
                }
              </p>
              <p className="weathertype">
                {
                  placeData?.weather[0].main
                }
              </p>
            </div>
          </div>
          <div className="timediv">
            <p className="time">
              {currentTime}
            </p>
          </div>
        </div>
      }

      {
        placeData && <div className="section2">
          
          <div className="section21">
            <p className="head1">
              Temperature
            </p>
            <p className="head1">
              {
                (placeData?.main.temp - 273.15).toFixed(1)
              } °C
            </p>
          </div>
          <div className="section21">
            <p className="head1">
              Temperature Min
            </p>
            <p className="head1">
              {
                (placeData?.main.temp_min - 273.15).toFixed(1)
              } °C
            </p>
          </div>
          <div className="section21">
            <p className="head1">
              Temperature Max
            </p>
            <p className="head1">
              {
                (placeData?.main.temp_max - 273.15).toFixed(1)
              } °C
            </p>
          </div>
          <div className="section21">
            <p className="head1">
              Humidity
            </p>
            <p className="head1">
              {
                placeData?.main.humidity
              } g/kg
            </p>
          </div>
          <div className="section21">
            <p className="head1">
              Pressure
            </p>
            <p className="head1">
              {
                placeData?.main.pressure
              } Pa
            </p>
          </div>
          <div className="section21">
            <p className="head1">
              Visibility
            </p>
            <p className="head1">
              {
                placeData?.visibility
              } metres
            </p>
          </div>
          <div className="section21">
            <p className="head1">
              Wind Speed
            </p>
            <p className="head1">
              {
                placeData?.wind.speed
              } m/s
            </p>
          </div>

        </div>
      }
    </div>
  );
}
