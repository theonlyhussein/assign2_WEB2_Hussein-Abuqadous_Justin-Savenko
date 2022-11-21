/* The following is in assign2.js as well but Unsure if we need that file at all need further information */
/* The following two lines declare the api variable connect to the api and locally store the data and then store data in variable from local memory */
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
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
const songs = retreiveStoredData('songs'); 
const artistsOptions = JSON.parse(artists);
const genreOptions = JSON.parse(genres);
const searchResults = [];


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
function verifyAnswer(){
  const radioButtons = document.querySelectorAll('input[name="fav"]');
  for (const radioButton of radioButtons) {
    if (document.getElementById(radioButton.id).checked && radioButton.id === "title_button"){
      document.querySelector("#title").disabled = false;
      document.querySelector("#artist").disabled = true;
      document.querySelector("#genre").disabled = true;
      const field = document.querySelector("input[type=text]"); 
      document.querySelector('#Form').addEventListener("submit", function(e) {
        e.preventDefault();
        searchResults.length = 0;
            
              let user_input = field.value.toLowerCase();
              for(let song of songs){
                let song_title = song.title.toString();
                let song_title_lowercase = song_title.toLowerCase();
                
                if (song_title_lowercase.includes(user_input) == true ){
                  //test match
                  console.log("Title: " + song_title + ", Found: " + song_title_lowercase.includes(user_input));
                  searchResults.push(song); 
                }
              }  
            console.log(searchResults.length);
            output_Results(); 
     }  );
      break;
    }
    if (document.getElementById(radioButton.id).checked && radioButton.id === "artist_button"){
      document.querySelector("#artist").disabled = false;
      document.querySelector("#title").disabled = true;
      document.querySelector("#genre").disabled = true;
      const field = document.querySelector("#artist");
      document.querySelector('#Form').addEventListener("submit", function(e) {
        e.preventDefault();
        searchResults.length = 0;
              let user_input = field.value
              for(song of songs){
                if (song.artist.id == user_input ){
                  console.log("Title: " + song.title + ", Artist: " + song.artist.name);
                  searchResults.push(song);
                }
              }
            output_Results();      
     } );
      break; 
    }
    if (document.getElementById(radioButton.id).checked && radioButton.id === "genre_button") {
      document.querySelector("#genre").disabled = false;
      document.querySelector("#title").disabled = true;
      document.querySelector("#artist").disabled = true;
      const field = document.querySelector("#genre");
      document.querySelector('#Form').addEventListener("submit", function(e) {
        e.preventDefault();
        searchResults.length = 0;
              let user_input = field.value;
              for(song of songs){
                if (song.genre.id == user_input ){
                  //test
                  console.log("Title: " + song.title + ", Genre: " + song.genre.name);
                  searchResults.push(song);
                }
              }
            output_Results();
     } );
      break;
    }  
  }
}

function output_Results(){
  const  table = document.querySelector("table");
  const pervous_results = document.querySelectorAll("tr");
  for(let pervous_result of pervous_results){
    if(pervous_result.className == "results"){
      pervous_result.remove();
    }
  }
    for (let searchResult of searchResults){
    let tr = document.createElement("tr");
    tr.classList.add("results");
    tr.setAttribute("data-id",searchResult.song_id);
    table.appendChild(tr);
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
      td1.appendChild(document.createTextNode(searchResult.title));
      td2.appendChild(document.createTextNode(searchResult.artist.name));
      td3.appendChild(document.createTextNode(searchResult.year));
      td4.appendChild(document.createTextNode(searchResult.genre.name));
      td5.appendChild(document.createTextNode(searchResult.details.popularity));
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
    }      
}

document.addEventListener("DOMContentLoaded", function(event) {
document.querySelector("#sort").addEventListener("click", function (e) {
  if ( e.target.nodeName == "I" && e.target.getAttribute("id") == "sort_title" ){
    e.target.className="fa-regular fa-square-caret-down";
    document.querySelector("#sort_artist").className="fa-solid fa-caret-down";
    document.querySelector("#sort_year").className="fa-solid fa-caret-down";
    document.querySelector("#sort_genre").className="fa-solid fa-caret-down";
    document.querySelector("#sort_popularity").className="fa-solid fa-caret-down";
    searchResults.sort((a, b) => {
        let fa = a.title.toLowerCase(),
        fb = b.title.toLowerCase();
        if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
      });
      output_Results();
  }
  if ( e.target.nodeName == "I" && e.target.getAttribute("id") == "sort_artist" ){
    console.log("sort_artist");
    e.target.className="fa-regular fa-square-caret-down";
    document.querySelector("#sort_title").className="fa-solid fa-caret-down";
    document.querySelector("#sort_year").className="fa-solid fa-caret-down";
    document.querySelector("#sort_genre").className="fa-solid fa-caret-down";
    document.querySelector("#sort_popularity").className="fa-solid fa-caret-down";
      searchResults.sort((a, b) => {
        let fa = a.artist.name.toLowerCase(),
        fb = b.artist.name.toLowerCase();
        if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
      });
      output_Results();
    } 
  if ( e.target.nodeName == "I" && e.target.getAttribute("id") == "sort_year" ){
    console.log("sort_year");
    e.target.className="fa-regular fa-square-caret-down";
    document.querySelector("#sort_artist").className="fa-solid fa-caret-down";
    document.querySelector("#sort_title").className="fa-solid fa-caret-down";
    document.querySelector("#sort_genre").className="fa-solid fa-caret-down";
    document.querySelector("#sort_popularity").className="fa-solid fa-caret-down";
      searchResults.sort((a, b) => {
        return b.year - a.year;
      });
      output_Results();
    } 
  if ( e.target.nodeName == "I" && e.target.getAttribute("id") == "sort_genre" ){
    console.log("sort_genre");
    e.target.className="fa-regular fa-square-caret-down";
    document.querySelector("#sort_artist").className="fa-solid fa-caret-down";
    document.querySelector("#sort_year").className="fa-solid fa-caret-down";
    document.querySelector("#sort_title").className="fa-solid fa-caret-down";
    document.querySelector("#sort_popularity").className="fa-solid fa-caret-down";
      searchResults.sort((a, b) => {
        let fa = a.genre.name.toLowerCase(),
        fb = b.genre.name.toLowerCase();
        if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
      });
      output_Results();
    }

  if ( e.target.nodeName == "I" && e.target.getAttribute("id") == "sort_popularity" ){
    console.log("sort_popularity");
    e.target.className="fa-regular fa-square-caret-down";
    document.querySelector("#sort_artist").className="fa-solid fa-caret-down";
    document.querySelector("#sort_year").className="fa-solid fa-caret-down";
    document.querySelector("#sort_genre").className="fa-solid fa-caret-down";
    document.querySelector("#sort_title").className="fa-solid fa-caret-down";
      searchResults.sort((a, b) => {
        return b.details.popularity - a.details.popularity;
      });
      output_Results();
  } 
});
});
function outputChart(){
  const songChart = document.getElementById('songChart');
  Chart.defaults.scale.ticks.beginAtZero = true;

  new Chart(songChart, {
    type: 'radar',
    data: {
      labels: ["Danceability", "Energy", "Valence", "Speechiness", "Loudness", "Liveness"],
      datasets: [
        {
          label: "Song Title Here",
          backgroundColor: "rgba(79, 255, 4, 0.48)",
          borderColor: "rgb(79, 255, 4)",
          data: [77, 22, 36, 44, 88, 69]
        }
      ]
    },
      options: {
        maintainAspectRatio: false,
      }
  });  
}
function findSong(songID){
  let result;
  for(let song of searchResults){
    if(songID == song.song_id) {
      result = song;
    }
  }
  return result;
}

