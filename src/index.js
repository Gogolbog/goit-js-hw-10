import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { createCountryСard, createCountryItem } from "./markup"
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const input = document.getElementById('search-box');
const countrylist = document.querySelector(".country-list");
const countryinfo = document.querySelector(".country-info");

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


function onInput(e) {
    const inputValue = e.target.value.trim();

    if (!inputValue) {
        countrylist.innerHTML = '';
        countryinfo.innerHTML = '';
        return;
    } else {
       fetchCountries(inputValue)
         .then(countries => {
           console.log(countries)
           if (countries.length > 10) { 
             Notify.info(
               'Too many matches found. Please enter a more specific name.'
             );
             countrylist.innerHTML = '';
             countryinfo.innerHTML = '';
             return;
           }

           if (countries.length >= 2 && countries.length <= 10) {
             const listItemMarkup = countries
               .map(country => createCountryItem(country))
               .join('');
             countrylist.innerHTML = listItemMarkup;
             countryinfo.innerHTML = '';
           }

           if (countries.length === 1) {
             const countryCardMarkup = countries
               .map(country => createCountryСard(country))
               .join('');
             countryinfo.innerHTML = countryCardMarkup;
             countrylist.innerHTML = ''; 
           }
         })
         .catch(error => {
           Notify.failure('Oops, there is no country with that name');
           countrylist.innerHTML = '';
           countryinfo.innerHTML = '';
           return error;
         });

    }

   }
