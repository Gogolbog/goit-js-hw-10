const ENDPOINT = 'https://restcountries.com/v3.1/name/';
const PARAMS = "?fields=name,capital,population,flags,languages"

function fetchCountries(name) {
  return fetch(
    `${ENDPOINT}${name}${PARAMS}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(respone.status);
      }
      return res.json();
    })

    }

  
  export { fetchCountries };