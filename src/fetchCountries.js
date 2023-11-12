const fetchCountries = async (name) => {
  try {
    const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`);
    if (!response.ok) {
      return [];
 }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default fetchCountries;
