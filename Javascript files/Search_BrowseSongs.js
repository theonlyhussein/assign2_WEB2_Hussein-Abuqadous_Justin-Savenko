
const artistsOptions = JSON.parse(artists);
const genreOptions = JSON.parse(genres);
function printGenresOptions(){
    
    for( op of genreOptions ){
      document.write(`<option value="${op.id}"> ${op.name} </option>`);
    }  
}
function printArtistsOptions(){
    
    for( op of artistsOptions ){
      document.write(`<option value="${op.id}"> ${op.name} </option>`);
    }  
}
document.addEventListener("DOMContentLoaded", function(event) {
document.querySelector("#title").disabled = true;
document.querySelector("#artist").disabled = true;
document.querySelector("#genre").disabled = true;
});
// Which radio button did the user choose? to unable the right input. to be continued ... 
function verifyAnswer(){
  const radioButtons = document.querySelectorAll('input[name="fav"]');
  for (const radioButton of radioButtons) {
    if (document.getElementById(radioButton.id).checked && radioButton.id === "title_button"){
      document.querySelector("#title").disabled = false;
      document.querySelector("#artist").disabled = true;
      document.querySelector("#genre").disabled = true;
     
      break;
    }
    if (document.getElementById(radioButton.id).checked && radioButton.id === "artist_button"){
      document.querySelector("#artist").disabled = false;
      document.querySelector("#title").disabled = true;
      document.querySelector("#genre").disabled = true;
    
      break; 
    }
    if (document.getElementById(radioButton.id).checked && radioButton.id === "genre_button") {
      document.querySelector("#genre").disabled = false;
      document.querySelector("#title").disabled = true;
      document.querySelector("#artist").disabled = true;
   
      break;
    }
    
    
  }
  }


/* The following is in assign2.js as well but Unsure if we need that file at all need further information */

/* The following two lines declare the api variable connect to the api and locally store the data and then store data in variable from local memory */

const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
const songs = retreiveStoredData('songs');


  /* Grab data handle promise and store locally */

function grabAndStoreData() {
  fetch(api)
      .then( response => response.json() )
      .then( data => {
          localStorage.setItem('songs', JSON.stringify(data));
      })
      .catch( error => { console.error(error) } );
  }

/* Returns data based off serial identifier for this assignment serial will always be 'songs' */

function retreiveStoredData(serial) {
  if(localStorage.getItem(serial) == null) {
    grabAndStoreData();
  }
  return JSON.parse(localStorage.getItem(serial));
}
  