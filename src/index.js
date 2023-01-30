import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const input = document.getElementById('search-box');
const countrylist = document.getElementsByClassName("country-list");
const countryinfo = document.getElementsByClassName("country-info");

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


function onInput(e) {
    const inputValue = e.target.value.trim();

    if (inputValue === '') {
        countrylist.innerHTML = '';
        countryinfo.innerHTML = '';
        return;
    }

    fetchCountries(inputValue)
            .then(countries => {
            if (countries.length > 10) {
              Notify.info(
                'Too many matches found. Please enter a more specific name.'
              );
              countrylist.innerHTML = '';
              countryinfo.innerHTML = '';
              return;
            }
            
            if (countries.length <= 10) {
                const listItemMarkup = countries.map(country =>
                  createCountryListItem(country).join('')
                );
                countrylist.innerHTML = listItemMarkup;
                countryinfo.innerHTML = '';

            }
        
                if (countries.length === 1) {
                const countryCardMarkup = countries.map(country =>
                  createCountryСard(country).join('')
                );
                countryinfo.innerHtml = countryCardMarkup; 
                countrylist.innerHTML = '';
            }   
            }).catch(error => {
                Notify.failure('Oops, there is no country with that name');
                countrylist.innerHTML = '';
                countryinfo.innerHTML = '';
                return error;

        });

    }




function createCountryListItem ({flags, name}) {
    return
    `
    <li class="country-list__item">
    <img class="country-list__flag" src="${flags.svg}" alt"${name} flag" width"30" />
    <h2 class="country-list__name">${name}</h2>

    </li>
    `;
}


function createCountryСard({ flags, name, capital, population, languages }) {
    const elemLang = languages.map(lang => lang.name).join(",");
    return
    `
    <img class="country-info__flag" src="${flags.png}" alt="flag" width="100" heigth="100" />
    <h2 class="country-info__name">${name}</h2>
    <ul clas="country-info__list">
    <li class="country-info__item"><p>Capital: ${capital}</p></li>
    <li class="country-info__item"><p>Population: ${population}</p></li>
    <li class="country-info__item"><p>Language: ${elemLang}</p></li>
    <ul/>

    `;
  
    
}