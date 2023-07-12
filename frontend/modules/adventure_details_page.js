import config from "../conf/index.js";
const API_URL = config.backendEndpoint;
//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const id = params.get("adventure");

  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(
      API_URL + `/adventures/detail?adventure=${adventureId}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML` DOM
  document.getElementById("adventure-name").innerHTML = `${adventure.name}`
  document.getElementById("adventure-subtitle").innerHTML=`${adventure.subtitle}`;
  document.getElementById("adventure-content").innerHTML=`${adventure.content}`;

  adventure.images.forEach((image) => {
    let container = document.createElement("div");
    container.className = "";
    container.innerHTML = `<img src=${image} class="activity-card-image"/>`
    document.getElementById("photo-gallery").appendChild(container);
  })
 
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>`
  images.map((image, index) => {
    let container = document.createElement("div");
    if(index == 0) {
      container.className = "carousel-item active";
    }
    else {
      container.className = "carousel-item";
    }
    container.innerHTML = `<img src=${image} class="activity-card-image d-block w-100">`
    document.getElementById("carousel-inner").appendChild(container);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const available = adventure.available;
  if(available === true) {
    const soldOutPanel = document.getElementById("reservation-panel-sold-out")
    soldOutPanel.style.display = "none"
    const reservationAvailable = document.getElementById("reservation-panel-available")
    reservationAvailable.style.display = "block"
    const costPerHead = document.getElementById("reservation-person-cost");
    costPerHead.textContent = adventure.costPerHead
  }
  else {
    const reservationAvailable = document.getElementById("reservation-panel-available")
    reservationAvailable.style.display = "none"
    const soldOutPanel = document.getElementById("reservation-panel-sold-out")
    soldOutPanel.style.display = "block"
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = persons * parseInt(adventure.costPerHead);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const noOfPerson = document.getElementById("person").value;
    const body = {
      name : name,
      date : date,
      person: noOfPerson,
      adventure: adventure.id,
    }
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json;  charset=utf-8',
      },
      body: JSON.stringify(body),
    };
    fetch(API_URL + "/reservations/new", options)
    .then(res => {
      if(!res.ok) {
        alert("Failed!");
        location.reload();
        return null;
      }
      else {
        alert("Success!");
        location.reload();
        return res.json();
      }
    })
    .then(data => {
      console.log(data);
    })
    .catch(e => {
      console.log(e);
    })
  })
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById("reserved-banner");
  if(adventure.reserved === true) {
    reservedBanner.style.display = "block";
  }
  else {
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
