const needle = require('needle');

// Grab breed name from command-line args
const breedName = process.argv[2];

if (!breedName) {
  console.log("Please provide a cat breed name.");
  process.exit();
}

// Build the request URL
const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

needle.get(url, (error, response) => {
  if (error) {
    console.error("Request failed. Error details:", error.message);
    return;
  }

  const body = response.body;

  if (!Array.isArray(body)) {
    console.error("Unexpected response format.");
    return;
  }

  if (body.length === 0) {
    console.log(`No results found for "${breedName}".`);
  } else {
    const cat = body[0];
    console.log(`Breed: ${cat.name}`);
    console.log(`Description: ${cat.description}`);
  }
});