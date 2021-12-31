const date = document.querySelector('.date');
const time = document.querySelector('.time');
const degreeValue = document.querySelector('.number');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const ani = document.querySelector('.ani');
const input = document.querySelector('#input');
const btn = document.querySelector('#button');
const changeLocation = document.querySelector('.change');
const modal = document.querySelector('.modal')
const submitBtn = document.querySelector('button[type=submit]');


window.addEventListener('load', (e) => {
    modal.classList.remove('active')

    changeLocation.addEventListener('click', () => modal.classList.toggle('active'))
    submitBtn.addEventListener('click', () => modal.classList.remove('active'))

    e.preventDefault()
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const dayOfWeek = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthText;

    switch (month) {
        case 0:
            monthText = 'Jan';
            break;
        case 1:
            monthText = 'Feb';
            break;
        case 2:
            monthText = 'Mar';
            break;
        case 3:
            monthText = 'Apr';
            break;
        case 4:
            monthText = 'May';
            break;
        case 5:
            monthText = 'Jun';
            break;
        case 6:
            monthText = 'Jul';
            break;
        case 7:
            monthText = 'Aug';
            break;
        case 8:
            monthText = 'Sept';
            break;
        case 9:
            monthText = 'Oct';
            break;
        case 10:
            monthText = 'Nov';
            break;
        case 11:
            monthText = 'Dec';
    }
    date.innerHTML = `
    <span class='fs-3'>${monthText}</span>
    <span class='fs-3'>${day}</span>
    <span class='fs-3'>,</span>
    <span class='fs-3'>${year}</span>
    <span class='fs-3'>(${dayOfWeek[d.getDay()]})</span>
  `

    getWeather()
});

async function getWeather() {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const cityInput = input.value;

        if (input.value == '') {
            return false
        }
        city.innerText = cityInput

        getWeather()

        input.value = ''
    })

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerText}&appid=42c20339266dfd3a2f852dc2554faa3c`;

    let api = await fetch(url);
    let resp = await api.json()

    const getTemp = resp.main.temp //show in kelvin(0 degree celsius = 273.15 kelvin)
    const getInCel = Math.round(getTemp - 273.15)

    const getCity = resp.name
    const getCountry = resp.sys.country

    city.innerText = getCity;
    country.innerText = getCountry;

    degreeValue.innerText = getInCel;

    const situation = resp.weather[0].main.toLowerCase();
    // if (situation === 'clouds') {
    //     ani.innerHTML = `<i class='fas fa-cloud text-light fs-1'></i>`
    // }
    switch (situation) {
        case 'clouds':
            ani.innerHTML = `<i class='fas fa-cloud text-light fs-1'></i>`
            break;
        case 'rain':
            ani.innerHTML = `<i class='fas fa-cloud-rain text-light fs-1'></i>`
            break;
        case 'snow':
            ani.innerHTML = `<i class='fas fa-snowflake text-light fs-1'></i>`
            break;
        case 'storm':
            ani.innerHTML = `<i class='fas fa-poo-storm text-light fs-1'></i>`
            break;
        case 'mist':
            ani.innerHTML = `<i class='fas fa-cloud-meatball text-light fs-1'></i>`
            break;
        case 'haze':
            ani.innerHTML = `<i class='fas fa-smog text-light fs-1'></i>`
            break;
        case 'fog':
            ani.innerHTML = `<i class='fas fa-smog text-light fs-1'></i>`
            break;
        default:
            ani.innerHTML = '<i class="fas fa-sun text-warning"></i>'

    }
}