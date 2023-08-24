const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Theme toggler elements
const themeToggler = document.getElementById("theme-toggler");
const body = document.body;

async function searchWikipedia(query) {
  const encodedQuery = encodeURIComponent(query);
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodedQuery}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Failed to fetch search results from Wikipedia API.");
    }

    const json = await response.json();
    return json.query.search;
  } catch (error) {
    throw new Error("An error occurred while fetching data from Wikipedia API.");
  }
}

function displayResults(results) {
  searchResults.innerHTML = "";

  results.forEach((result) => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
    const titleLink = `<a href="${url}" target="_blank" rel="noopener">${result.title}</a>`;
    const urlLink = `<a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>`;

    const resultItem = document.createElement("div");
    resultItem.className = "result-item";
    resultItem.innerHTML = `
      <h3 class="result-title">${titleLink}</h3>
      ${urlLink}
      <p class="result-snippet">${result.snippet}</p>
    `;

    searchResults.appendChild(resultItem);
  });
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    searchResults.innerHTML = "<p>Please enter a valid search term.</p>";
    return;
  }

  searchResults.innerHTML = "<div class='spinner'>Searching, please be patient....</div>";

  try {
    const results = await searchWikipedia(query);

    if (results.length === 0) {
      searchResults.innerHTML = "<p>No results found.</p>";
    } else {
      displayResults(results);
    }
  } catch (error) {
    console.error(error);
    searchResults.innerHTML = "<p>An error occurred while searching. Please try again later.</p>";
  }
});

// Event listener for the theme toggler
themeToggler.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  themeToggler.textContent = body.classList.contains("dark-theme") ? "Dark" : "Light";
  themeToggler.style.background = body.classList.contains("dark-theme") ? "#fff" : "#333";
  themeToggler.style.color = "#333";
  themeToggler.style.border = body.classList.contains("dark-theme") ? "2px solid #ccc" : "none";
});










// const searchForm = document.getElementById("search-form");
// const searchInput = document.getElementById("search-input");
// const searchResults = document.getElementById("search-results");

// // Theme toggler elements
// const themeToggler = document.getElementById("theme-toggler");
// const body = document.body;

// async function searchWikipeida(query) {
//   const encodedQuery = encodeURIComponent(query);
//   const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodedQuery}`;

//   const reponse = await fetch(endpoint);

//   if (!reponse.ok) {
//     throw new Error("Faild to fetch search results form wikipedia API.");
//   }

//   const json = await reponse.json();
//   return json;
// }

// function displayResults(results) {
//   // Remove the loading spinner
//   searchResults.innerHTML = "";

//   results.forEach((result) => {
//     const url = `https://en.wikipedia.org/?curid=${results.pageid}`;
//     const titleLink = `<a href="${url}" target="_blank" rel="noopener">${result.title} </a>`;
//     const urlLink = `<a href="${url} class="result-link" target="_blank" rel="noopener">${url}</a>`;

//     const resultItme = document.createElement("div");
//     resultItme.className = "result-item";
//     resultItme.innerHTML = `
//         <h3 class="result-title">${titleLink}</h3>
//         ${urlLink}
//         <p class="result-snippet">${result.snippet}</p>
//         `;

//     searchResults.appendChild(resultItme);
//   });
// }

// searchForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const query = searchInput.value.trim();

//   if (!query) {
//     searchResults.innerHTML = "<p>Please enter a valid search term. </p>";
//     return;
//   }

//   searchResults.innerHTML = "<div class='spinner'>Loading ... </div>";

//   try {
//     const results = await searchWikipeida(query);

//     if (results.query.searchinfo.totalhits === 0) {
//       searchResults.innerHTML = "<p>No results found. </p>";
//     } else {
//       displayResults(results.query.search);
//     }
//   } catch (error) {
//     console.error(error);
//     searchResults.innerHTML = `<p>An error occured while searching. Please try again later. </p>`;
//   }
// });

// // Event listener for the theme toggler
// themeToggler.addEventListener("click", () => {
//   body.classList.toggle("dark-theme");
//   if (body.classList.contains("dark-theme")) {
//     themeToggler.textContent = "Dark";
//     themeToggler.style.background = "#fff";
//     themeToggler.style.color = "#333";
//   } else {
//     themeToggler.textContent = "Light";
//     themeToggler.style.border = "2px solid #ccc";
//     themeToggler.style.color = "#333";
//   }
// });
