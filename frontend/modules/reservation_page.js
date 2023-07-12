import config from "../conf/index.js";
const API_URL = config.backendEndpoint;
//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(API_URL + "/reservations/");
    const data = await response.json();
    return data;
  }
  catch(err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 const noReservationBanner = document.getElementById("no-reservation-banner");
 const reservationTableParent = document.getElementById("reservation-table-parent");
 console.log(reservations);
 if(reservations.length !== 0) {
  noReservationBanner.style.display = "none";
  reservationTableParent.style.display = "block";
  reservations.map((reservation, index) => {
    const date = new Date(reservation.date).toLocaleDateString("en-IN");
    const option1 = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const option2 = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    const bookingTime1 = new Date(reservation.time).toLocaleString('en-IN', option1);
    const bookingTime2 = new Date(reservation.time).toLocaleString('en-IN', option2);
    const container =  `
    <tr>
      <td style="font-weight: bold;">${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${date}</td>
      <td>${reservation.price}</td>
      <td>${bookingTime1}, ${bookingTime2}</td>
      <td id=${reservation.id}>
        <a 
        href="../detail/?adventure=${reservation.adventure}">
          <button 
            class="reservation-visit-button">
            Visit Adventure
          </button>
        </a>
      </td>
    </tr>
    `
    document.getElementById("reservation-table").innerHTML += container;
  })
 }
 else {
  noReservationBanner.style.display = "block";
  reservationTableParent.style.display = "none";
 }

}

export { fetchReservations, addReservationToTable };
