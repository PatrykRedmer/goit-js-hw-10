import fetchCountries from './fetchCountries.js';
import _ from 'lodash';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryContainer = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const renderCountryCard = (country) => {
  const { name, capital, population, flags, languages } = country[0];
  const languagesList = languages.map((lang) => lang.name).join(', ');

  const countryCard = `
    <div class="card">
      <img src="${flags.svg}" alt="flag" class="flag">
      <h2>${name.official}</h2>
      <p><strong>Capital:</strong> ${capital}</p>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Languages:</strong> ${languagesList}</p>
    </div>
  `;
  countryContainer.innerHTML = countryCard;
};

const renderCountryList = (countries) => {
  countryContainer.innerHTML = '';
  countryList.innerHTML = '';

  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    countries.forEach((country) => {
      const { name, flags } = country;
      const listItem = document.createElement('li');
      listItem.innerHTML = `<img src="${flags.svg}" alt="flag" class="flag"><span>${name.official}</span>`;
      countryList.appendChild(listItem);
    });
  } else if (countries.length === 1) {
    renderCountryCard(countries);
  } else {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
};

const debouncedFetch = _.debounce(async (name) => {
  if (name.trim() === '') {
    countryContainer.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }

  try {
    const countries = await fetchCountries(name.trim());
    renderCountryList(countries);
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}, DEBOUNCE_DELAY);

searchBox.addEventListener('input', (event) => {
  const searchText = event.target.value;
  debouncedFetch(searchText);
});
