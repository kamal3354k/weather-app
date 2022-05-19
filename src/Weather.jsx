import React, { useEffect } from 'react';
import { useState } from 'react';
import './Weather.css'

const Weather=()=>{
// --------------------------Voice-----------------

let VoiceRun = ()=>{

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();

recognition.onstart = ()=>{

console.log("Active Mic....");
document.getElementById("listen").style.color="#00000047";
document.getElementById("listen").style.background="rgb(153, 142, 142)";
}

recognition.onspeechend = ()=>{

document.getElementById("listen").style.color="#fff";
document.getElementById("listen").style.background="none";
    console.log("Stop Mic");

}

recognition.onresult = (event)=>{

    console.log(event);



    let VoiceVal = event.results[0][0].transcript;
    console.log("Your Saying : "+VoiceVal);
    
     
console.log(VoiceVal.substr(-1));

if(VoiceVal.substr(-1)==="."){
    console.log("true");
    console.log(VoiceVal.replace(".",""));
    let newVal = VoiceVal.replace(".","");
    console.log("Filter : "+ newVal)
    setSearch(newVal);
    document.getElementById("input").value=newVal;
}


 else{
    document.getElementById("input").value=VoiceVal;
    setSearch(VoiceVal);
 }

}

recognition.start();

}




























let Iconq="http://openweathermap.org/img/w/";
const [city_name, setCity_name] = useState('');
const [search, setSearch] = useState("Delhi");
const [weath, setweath] = useState("")
const [Wind, setWind] = useState("")
const [TimeZone, setTimeZone] = useState();
const [SunTime, setSunTime] = useState();



let Time = new Date();
let WeekArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let MonthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let DateNow = Time.getDate();
let Week = Time.getDay();
let Month = Time.getMonth();
let Year = Time.getFullYear();



useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=bfd584ae593b3418ac88183b788f8213`).then(data=>data.json()).then((JsonData)=>{
    
console.log(JsonData,"Fetch-Data");setCity_name(JsonData.main);setweath(JsonData.weather);setWind(JsonData.wind);setSunTime(JsonData.sys);runTime1(JsonData.timezone);
    }); 
},[search]);



let runTime1 = (timeZone) =>{
    if(timeZone!=="Invalid Date"  && timeZone!==""){}
    let TimeNew = new Date();
    let localTime = TimeNew.getTime()
    let localOffset = TimeNew.getTimezoneOffset() * 60000
    let utc = localTime + localOffset
    var atlanta = utc + (1000 * (timeZone));
    let nd = new Date(atlanta)
    let finalTime = nd.toLocaleTimeString();
   setTimeZone(finalTime)

}




const onInput = (e) =>{
    setSearch(e.target.value);
}


return(<>



<div className="box">
   

    <div className="box_below">

    {!city_name ? (

<p className="error">No Data Found</p>
) : (
<>

<div className="first">
    <h3 className="day"> {WeekArr[Week]}</h3>
    <h3 className="date"><i className="far fa-calendar-alt"></i> {DateNow} {MonthArr[Month]} {Year}</h3>
    <h3 className="date">
        {/* {(Hour+ 24) % 12 || 12}:{Minute} */}
        {TimeZone} 
         {/* {Hour >12 ? (<>PM</>):(<>AM</>)} */}
         </h3>
    <h2 className="name">
    {search}
</h2></div>
<div className="sec">
    
<h4 className="name_title">
{Math.floor(city_name.temp)}&#8451; 
    {!Wind ? (<p></p>):(<img src={Iconq + weath[0].icon + ".png"} alt="" />)}
</h4>
{!weath? (
<p>dfg</p>

): (<><p className="name_des">{weath[0].description } </p>
</>)
}


</div>

{/* <p>{city_name.temp_min} | {city_name.temp_max}</p> */}
</>
)
}






</div>
<div className="slide_box">
   <div className="third">
       <h3 className="report">Report For Today</h3>
   {!city_name ? (<p className="error">No Data Found!</p>):(<>  
    <h4 className="hum"><span><i className="fa fa-tint" aria-hidden="true"></i> Humanity</span>  <span>{city_name.humidity}%</span></h4>
    <h4 className="hum"><span><i className="fa fa-tachometer" aria-hidden="true"></i> Pressure</span>  <span>{city_name.pressure}mb</span></h4>
    <h4 className="hum"><span><i className="fa fa-thermometer-full" aria-hidden="true"></i> Max Temp.</span>  <span>{city_name.temp_max}&#8451; </span></h4>
    <h4 className="hum"><span><i className="fa fa-thermometer-quarter" aria-hidden="true"></i> Min Temp.</span>  <span>{city_name.temp_min}&#8451; </span></h4>
   </>)}  
    {!Wind ? (<p></p>):(<h4 className="hum"><span><i className="fad fa-wind"></i> Wind</span>  <span>{Wind.speed}KMH</span></h4>)}
   {!SunTime ? (<p></p>):(<h4 className="hum"><span><i className="fal fa-sunrise"></i> Sun Rised</span>  <span>{new Date((SunTime.sunrise)*1000).toLocaleTimeString()}</span></h4>)}
   {!SunTime ? (<p></p>):(<h4 className="hum"><span><i className="fal fa-sunset"></i> Sun Set</span>  <span>{new Date((SunTime.sunset)*1000).toLocaleTimeString()}</span></h4>)}
   </div>
<div className="forth">
<h1> <input type="text" id="input" autoFocus placeholder="Enter City Name" onChange={onInput} /><button id="listen" onClick={VoiceRun}><i className="fas fa-microphone"></i></button></h1>
</div>
</div>

</div>

</>)

}



export default Weather;