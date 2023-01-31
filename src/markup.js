function createCountryItem ({flags, name}) {
    return `<li class="country-list__item">
    <img class="country-list__flag" src="${flags.svg}" alt"${name.common}">
    <h2 class="country-list__name">${name.common}</h2>
    </li>
    `;
}


function createCountryСard({ flags, name, capital, population, languages }) {

    return `<img class="country-info__flag" src="${flags.png
        }" alt="flag" width="100" heigth="100">
    <h2 class="country-info__name">${name.common}</h2>
    <ul class="country-info__list">
    <li class="country-info__item"><p><strong>Capital:</strong> ${capital}</p></li>
    <li class="country-info__item"><p><strong>Population:</strong> ${population}</p></li>
    <li class="country-info__item"><p><strong>Languages:</strong> ${Object.values(
            languages
        ).join(', ')}</p></li>
    </ul>
    `;
}


export { createCountryСard, createCountryItem };