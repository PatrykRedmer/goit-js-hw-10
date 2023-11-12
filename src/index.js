import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const renderCountryInfo = (country) => {
    const listItem = document.createElement('li');
    console.log(country)
    const languages = country.languages[0].name
    listItem.innerHTML = `
        <div>
            <img src="${country.flags.svg}" alt="Flag" style="width: 30px; height: 20px;">
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
const renderCountry = (country) => {
    const listItem = document.createElement('li');
    console.log(country)
    listItem.innerHTML = `
        <div>
            <img src="${country.flags.svg}" alt="Flag" style="width: 30px; height: 20px;">
        </div>
        <div>
            <h3>${country.name}</h3>
        </div>
    `;
    countryList.appendChild(listItem);
};
const handleFetchError = (error) => {
    if (error.response && error.response.status === 404) {
        Notiflix.Notify.info('Oops, there is no country with that name');
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
            renderCountryInfo(countries[0]);
        } else if (countries.length === 0) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
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