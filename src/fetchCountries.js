const fetchCountries = async (name) => {
  try {
    const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags,language`);
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default fetchCountries;
