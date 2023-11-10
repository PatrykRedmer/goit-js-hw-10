import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const renderCountry = (country) => {
    console.log('Country object from API:', country); // Dodaj to, aby zobaczyć, co zawiera obiekt kraju

    const listItem = document.createElement('li');
    const languages = Object.values(country.languages).join(', ');

    let flagImage = '';
    if (country.flags && country.flags) {
        flagImage = `<img src="${country.flags}" alt="Flag" style="width: 30px; height: 20px;">`;
    }

    listItem.innerHTML = `
        <div>
            ${flagImage}
        </div>
        <div>
            <h3>${country.name}</h3>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Languages:</strong> ${languages}</p>
        </div>
    `;
    countryList.appendChild(listItem);
};
const clearCountryList = () => {
    countryList.innerHTML = '';
};
const handleFetchError = (error) => {
    if (error.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    } else {
        console.error('Error fetching data:', error);
    }
};
const fetchCountryData = async (searchQuery) => {
    try {
        const countries = await fetchCountries(searchQuery);
        clearCountryList();
        if (countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countries.length > 1 && countries.length <= 10) {
            countries.forEach(country => renderCountry(country));
        } else if (countries.length === 1) {
            renderCountry(countries[0]);
        }
    } catch (error) {
        handleFetchError(error);
    }
}
const onSearchInput = event => {
    event.preventDefault();
    const searchQuery = event.target.value.trim();
    if (searchQuery.trim() === '') {
      clearCountryList();
      return;
    }
    fetchCountryData(searchQuery);
  };
  searchBox.addEventListener('input', debounce(onSearchInput, 300));