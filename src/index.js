const fetch_weather_btn = document.querySelector('#search_btn')
const input = document.querySelector('#search_weather_value')

const city_name_displayer = document.querySelector('.city h3')
const time_displayer = document.querySelector('.city p')
const feels_like_displayer=document.querySelector('.feels_like')
const humidity_displayer=document.querySelector('.humidity')
const pressure_displayer=document.querySelector('.pressure')
const visibility_displayer=document.querySelector('.visibility')
const clouds_displayer=document.querySelector('.clouds')
const wind_displayer=document.querySelector('.wind')

const curr_temp_displayer = document.querySelector('.curr_temp')

const animate_arr=[city_name_displayer,time_displayer,feels_like_displayer,humidity_displayer,pressure_displayer,visibility_displayer,clouds_displayer,wind_displayer]
function animateElements(){
    for(let i=0;i<animate_arr.length;i++){
        animate_arr[i].style.animation=`animate 1s ease forwards`
    }
}
function removeElements(){
    for(let i=0;i<animate_arr.length;i++){
        animate_arr[i].style.animation=``
    }
}

const no_internet_displayer=document.querySelector('.no_internet')
const no_data_found_displayer=document.querySelector('.no_data_found')
const loaders_displayer=document.querySelector('.loaders')

fetch_weather_btn.addEventListener('click',()=> fetchCityWeather(input));

async function fetchCityWeather(input) {
    removeElements();
    if (navigator.onLine) {
        no_internet_displayer.classList.remove('no_internet_active')
        loaders_displayer.classList.add('loaders_active')
        no_data_found_displayer.classList.remove('no_data_found_active')
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=4674f37c722fa851b2de3dd582ce7730`;
            const res = await fetch(url);
            const data = await res.json();
            const {name,visibility}=data;
            const {country,sunrise,sunset}=data.sys;
            const {main,description}=data.weather[0]
            const {feels_like,humidity,pressure,temp}=data.main;
            const {speed}=data.wind
            

            assignInnerHTML(name,visibility,country,sunrise,sunset,main,description,feels_like,humidity,pressure,temp,speed);
           
            loaders_displayer.classList.remove('loaders_active')

        } catch (e) {
            console.log('this is catch blck');
            no_data_found_displayer.classList.add('no_data_found_active')
            loaders_displayer.classList.remove('loaders_active')
        }
    }
    else{
        no_data_found_displayer.classList.remove('no_data_found_active')
        no_internet_displayer.classList.add('no_internet_active')
    }
}

function assignInnerHTML(name,visibility,country,sunrise,sunset,main,description,feels_like,humidity,pressure,temp,speed){
    animateElements()

    city_name_displayer.innerHTML=name+", "+country
    curr_temp_displayer.innerHTML="current temp : "+`<span class='f_d'>${temp}<sup>o</sup>C</span>`
    feels_like_displayer.innerHTML="feels like : "+`<span class="f_d">${feels_like}<sup>o</sup>C</span>`
    humidity_displayer.innerHTML="humidity : "+`<span class="f_d">${humidity}</span>`
    pressure_displayer.innerHTML="pressure : "+`<span class="f_d">${pressure} m/b</span>`
    visibility_displayer.innerHTML="visibility : "+`<span class="f_d">${visibility}</span>`
    clouds_displayer.innerHTML="clouds : "+`<span class="f_d">${main}</span>`
    wind_displayer.innerHTML="wind speed : "+`<span class="f_d">${speed} km/h</span>`

    let hours=new Date().getHours();
    let seconds=new Date().getMinutes();
    if(hours>12){
        hours="0"+hours-12;
        if(seconds<10){
            seconds="0"+seconds
        }
        time_displayer.innerHTML=hours+":"+seconds+" PM";
    }else{
        time_displayer.innerHTML=hours+":"+new Date().getMinutes()+" AM";
    }


}
addEventListener('load',()=>{
    input.value='Gujarat';
    fetchCityWeather(input)
    input.value=''
})