const resultDiv = document.getElementById("result");
resultDiv.innerHTML = ""; // clear previous results

function searchTravel() {
  // const input = document.getElementById('searchInput').value.toLowerCase();
  // const searchTerm = input.toLowerCase().trim();

  const searchTerm = document
  .getElementById('searchInput')
  .value
  .toLowerCase()
  .trim();

  // console.log(searchTerm);

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  const keywordMap = {
    country: "countries",
    countries: "countries",
    temple: "temples",
    temples: "temples",
    beach: "beaches",
    beaches: "beaches"
  };

  const category = keywordMap[searchTerm];

  if (!category) {
    heroContent.innerHTML = "";
    resultDiv.innerHTML = "Please search for: countries, temples, or beaches.";
    return;
  }

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

      console.log(data);

      if (category === "countries") {
        heroContent.innerHTML = "";
        data.countries.forEach(country => {
          country.cities.forEach(city => {
            resultDiv.innerHTML += `
              <div class="result-card">
                <h2>${city.name}</h2>
                <img src="${city.imageUrl}">
                <p>${city.description}</p>
              </div>
            `;
          });
        });
      }

      if (category === "temples") {
        heroContent.innerHTML = "";
        data.temples.forEach(temple => {
          resultDiv.innerHTML += `
            <div class="result-card">
              <h2>${temple.name}</h2>
              <img src="${temple.imageUrl}">
              <p>${temple.description}</p>
            </div>
          `;
        });
      }

      if (category === "beaches") {
        heroContent.innerHTML = "";
        data.beaches.forEach(beach => {
          resultDiv.innerHTML += `
            <div class="result-card">
              <h2>${beach.name}</h2>
              <img src="${beach.imageUrl}">
              <p>${beach.description}</p>
            </div>
          `;
        });
      }

      // let results = [];
      // // Search countries and cities
      // data.countries.forEach(country => {
      //   country.cities.forEach(city => {
      //     if (city.name.toLowerCase().includes(searchTerm)) {
      //       results.push({ type: 'city', data: city });
      //     }
      //   });
      // });
      // // Search temples
      // data.temples.forEach(temple => {
      //   if (temple.name.toLowerCase().includes(searchTerm)) {
      //     results.push({ type: 'temple', data: temple });
      //   }
      // });
      // // Search beaches
      // data.beaches.forEach(beach => {
      //   if (beach.name.toLowerCase().includes(searchTerm)) {
      //     results.push({ type: 'beach', data: beach });
      //   }
      // });
      // // Clear previous results
      // resultDiv.innerHTML = '';
    // Display results
    // if (results.length > 0) {
    // heroContent.innerHTML = "";

    // results.forEach(item => {
    //   resultDiv.innerHTML += `
    //     <div class="result-card">
    //       <h2>${item.data.name}</h2>
    //       ${item.data.imageUrl ? `<img src="${item.data.imageUrl}" alt="${item.data.name}">` : ""}
    //       <p>${item.data.description || ""}</p>
    //     </div>
    //   `;
    // });
    // } else {
    //   heroContent.innerHTML = "";
    //   resultDiv.innerHTML = "No results found.";
    // }
  })
  .catch(error => {
    console.error('Error:', error);
    resultDiv.innerHTML = 'An error occurred while fetching data.';
  });
}

btnSearch.addEventListener('click', searchTravel);

btnClear.addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  resultDiv.innerHTML = '';
  heroContent.innerHTML = '';
});