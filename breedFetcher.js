const needle = require('needle');

const fetchBreedDescription = function(breedName, callback) {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  needle.get(url, (error, response) => {
    if (error) {
      callback(`Request failed. Error details: ${error.message}`, null);
      return;
    }

    const body = response.body;

    if (!Array.isArray(body) || body.length === 0) {
      callback(`No results found for "${breedName}"`, null);
      return;
    }

    const cat = body[0];
    callback(null, cat.description);
  });
};

module.exports = { fetchBreedDescription };