const ENDPOINT = 'https://restcountries.com/v3.1/name/';
const PARAMS = "?fields=name,capital,population,flags,languages"

function fetchCountries(name) {
  return fetch(
    `${ENDPOINT}${name}${PARAMS}`
  )
    .then((res) => { console.log(res); return res.json(); })
}

  


  export { fetchCountries };