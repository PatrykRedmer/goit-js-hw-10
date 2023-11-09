const fetch = require('node-fetch');

const fetchCountries = async (name) => {
  try {
    const response = await fetch(`https://restcountries.com/v2/name/${name}`);
    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

module.exports = fetchCountries;