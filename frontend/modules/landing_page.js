// import { add } from "lodash";
import config from "../conf/index.js";
const API_URL = config.backendEndpoint;
async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init()")
  console.log(API_URL + "/cities");
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  return fetch(API_URL + "/cities")
  .then(res => res.json())
  .then(data => {
    return data;
  }).catch((err) => {
    console.log(err);
    return null;
  });
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement("div");
  container.className = "col-lg-3 col-sm-6 pb-1";
  let innerHTML = `
  <a href="pages/adventures/?city=${id}" id=${id}>
    <div class="tile">
      <div class="tile-text">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
      <img src=${image}/>
    </div>
  </a>`
  container.innerHTML = innerHTML;

  document.getElementById("data").appendChild(container);

}

export { init, fetchCities, addCityToDOM };
