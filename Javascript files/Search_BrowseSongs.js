/* The following is in assign2.js as well but Unsure if we need that file at all need further information */
/* The following two lines declare the api variable connect to the api and locally store the data and then store data in variable from local memory */
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
  /* This function grabs the data from the api, checks to make sure if received promise, if received deal with promise and store locally
     if not then throw error for response and catch all other errors
 */
     function grabAndStoreData() {
      fetch(api).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Fetched Failed');
      })
      .then((data) => {
        console.log('Hello');
        localStorage.setItem('songs', JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error)
      });
      }
/* Returns data based off serial identifier for this assignment serial will always be 'songs' */
function retreiveStoredData(serial) {
  if(localStorage.getItem(serial) == null) {
    grabAndStoreData();
  }
  return JSON.parse(localStorage.getItem(serial));
}
const songs = retreiveStoredData('songs'); // array of song data from api
const artistsOptions = JSON.parse(artists); // array of artists
const genreOptions = JSON.parse(genres); // array of genres
const searchResults = []; // initialization of search results array that will be added to based off user input

/* This function prints out the genre options the user is able to select from */
function printGenresOptions(){
    for( op of genreOptions ){
      document.write(`<option value="${op.id}"> ${op.name} </option>`);
    }  
}
/* This function prints out the artist options the user is able to select from */
function printArtistsOptions(){
    for( op of artistsOptions ){
      document.write(`<option value="${op.id}"> ${op.name} </option>`);
    }  
}
/* initialization of radio button disable by default until user clicks on radio button */
document.addEventListener("DOMContentLoaded", function(event) {
document.querySelector("#title").disabled = true;
document.querySelector("#artist").disabled = true;
document.querySelector("#genre").disabled = true;
});
/* This function controls the disabling of the input boxes correlated to radio button 
   activation from the user input and activation of input boxes that the user selects
   also grabs user input once submit button is clicked and searches the songs array for 
   user request and pushes results to the searchResults array and calls output function
*/
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



/* This function outputs the searchResults array to the table based off user input */
function output_Results(){
  let p_count = document.querySelector("#song_count");
console.log(p_count);
let avg_pop = document.querySelector("#av_popularity");
console.log(avg_pop);
const pop_array = [];
  const  table = document.querySelector("#Results_table");
  const pervous_results = document.querySelectorAll("tr");
  for(let pervous_result of pervous_results){
    if(pervous_result.className == "results"){
      pervous_result.remove();
    }
  }
    for (let searchResult of searchResults){
    let tr = document.createElement("tr");
    tr.className = "results";
    tr.setAttribute("data-id",searchResult.song_id);
    tr.setAttribute('data-artistID',searchResult.artist.id);
    table.appendChild(tr);
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
      let td6 = document.createElement("td");
      let td7 = document.createElement("td");
      let btn1 = document.createElement('input');
      let btn2 = document.createElement('input');
      btn1.type = 'button';
      btn1.className = 'singleBtn';
      btn1.value = 'View Details';
      btn1.setAttribute('data-id',searchResult.song_id);
      btn1.setAttribute('data-artistID',searchResult.artist.id);
      btn2.type = 'button';
      btn2.className = 'favBtn';
      btn2.value = 'Add to Playlist';
      btn2.setAttribute('data-id',searchResult.song_id);
      td6.appendChild(btn1);
      td7.appendChild(btn2);
      const searchPage = document.querySelector('#SearchandBrowseSongs');
      const singlePage = document.querySelector('#SingleSong');
      const playlist = document.querySelector('#Playlist');
      btn1.addEventListener('click',function(e) {
          /* this function is activated when the user clicks on the table and causes the display 
             of singleSong to be shown and also when the clear button is clicked on that display 
             returns it back to the SearchandBrowseSongs view
          */
          const item = e.target.getAttribute("data-id");
          const item2 = e.target.getAttribute('data-artistID');
          const songObj = findSong(item);
          const artistObj = findArtist(item2);
          console.log(songObj.title, songObj.analytics.danceability, songObj.analytics.energy,songObj.analytics.valence, songObj.analytics.speechiness, songObj.details.loudness, songObj.analytics.liveness);
          
          searchPage.style.display = "none"; 
          playlist.style.display = "none";
          singlePage.style.display = "block";
          outputData(songObj,artistObj);
          const chart = outputChart(songObj.title,songObj.analytics.danceability,songObj.analytics.energy,songObj.analytics.valence,songObj.analytics.speechiness,songObj.details.loudness,songObj.analytics.liveness);
          // clear data and switch views when clear button clicked porition
          document.querySelector('#singleClear').addEventListener('click', function() {
            clearData();
            chart.destroy();
            
            searchPage.style.display = "block"; 
            playlist.style.display = "none";
            singlePage.style.display = "none";
          });
      });
      /* This button when actvited it takes a songs id from the tr of the search resluts  
         and puts the song into the playlist list 
      */
      
      btn2.addEventListener('click', function(e){
        searchPage.style.display = "none"; 
        playlist.style.display = "block";
        singlePage.style.display = "none";
        
        const playlist_table = document.querySelector("#Playlist_table");
        const p_tr = document.createElement("tr");
        p_tr.setAttribute('id', searchResult.song_id);
        p_tr.className = "playlist_items"
        let id = searchResult.song_id;
        playlist_table.appendChild(p_tr);
        console.log( document.querySelector('#erase_playlist'));
        /* this function activates when the clear button is pressed on the playlist page and clears the playlist and switches view back to search
        */
        document.querySelector('#erase_playlist').addEventListener('click', function(e) {
           const remove_all = document.querySelectorAll('.playlist_items');
           for(let e of remove_all){
            e.remove();
           }
           p_count.innerHTML = " ";
           p_count.innerHTML = "0" ;
           avg_pop.innerHTML=" ";
           avg_pop.innerHTML="0";
           pop_array.length=0;
           searchPage.style.display = "block"; 
          playlist.style.display = "none";
          singlePage.style.display = "none";
        });
        let p_td1 = document.createElement("td");
        let p_td2 = document.createElement("td");
        let p_td3 = document.createElement("td");
        let p_td4 = document.createElement("td");
        let p_td5 = document.createElement("td");
        let p_td6 = document.createElement("td");
        let p_td7 = document.createElement("td");
        p_td1.appendChild(document.createTextNode(searchResult.title));
        p_td2.appendChild(document.createTextNode(searchResult.artist.name));
        p_td3.appendChild(document.createTextNode(searchResult.year));
        p_td4.appendChild(document.createTextNode(searchResult.genre.name));
        p_td5.appendChild(document.createTextNode(searchResult.details.popularity));
        pop_array.push(searchResult.details.popularity);
        console.log(pop_array);
        let remove = document.createElement("input");
        let view = document.createElement('input');
        view.value = 'View Details';
        view.type = 'button';
        remove.value="remove"
        remove.type="button"
        view.setAttribute('data-id',searchResult.song_id);
        view.setAttribute('data-artistID',searchResult.artist.id);
        p_td6.appendChild(view);
        p_td7.appendChild(remove);
        p_count.innerHTML = " ";
        p_count.innerHTML = playlist_table.rows.length-1;
        avg_pop.innerHTML =" ";
        let sum = pop_array.reduce((a, b) => a + b,0);
        avg_pop.innerHTML = (sum/pop_array.length).toFixed(0);
        /* This function is used to update values displayed for playlist details when a song is removed */
        remove.addEventListener("click",function(e){
          if (p_tr.getAttribute('id') == searchResult.song_id)
          p_tr.remove();
          p_count.innerHTML = " " ;
          p_count.innerHTML = playlist_table.rows.length-1 ;
          let left = pop_array.indexOf(searchResult.details.popularity);
            pop_array.splice(left,1);
            avg_pop.innerHTML =" ";
            sum = pop_array.reduce((a, b) => a + b,0);
            
            if(sum.isNaN()){
              sum = 0;
            }
           avg_pop.innerHTML = (sum/pop_array.length).toFixed(0);
          }
        );
        p_tr.appendChild(p_td1);
        p_tr.appendChild(p_td2);
        p_tr.appendChild(p_td3);
        p_tr.appendChild(p_td4);
        p_tr.appendChild(p_td5);
        p_tr.appendChild(p_td6);
        p_tr.appendChild(p_td7);
        console.log(document.querySelector('#singleClear_playlist'));
        /* This function is activated when clear playlist is clicked and goes back to search */
        document.querySelector('#singleClear_playlist').addEventListener('click', function() {
          searchPage.style.display = "block"; 
        playlist.style.display = "none";
        singlePage.style.display = "none";
        });
        /* This function is activated when view details is clicked on the playlist page */
      view.addEventListener('click', function(e) {
        const p_item = e.target.getAttribute("data-id");
        const p_item2 = e.target.getAttribute("data-artistID");
        console.log(e.target.getAttribute("data-id"));
        console.log(e.target.getAttribute("data-artistID"));
        const pSongObj = findSong(p_item);
        const pArtistObj = findArtist(p_item2);
        searchPage.style.display = "none"; 
        playlist.style.display = "none";
        singlePage.style.display = "block";
        outputData(pSongObj,pArtistObj);
        const pChart = outputChart(pSongObj.title,pSongObj.analytics.danceability,pSongObj.analytics.energy,pSongObj.analytics.valence,pSongObj.analytics.speechiness,pSongObj.details.loudness,pSongObj.analytics.liveness);
        document.querySelector('#singleClear').addEventListener('click', function() {
          clearData();
          pChart.destroy();
          
          searchPage.style.display = "block"; 
          playlist.style.display = "none";
          singlePage.style.display = "none";
        });
      });
       
      });
      console.log(pop_array);
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
      tr.appendChild(td6);
      tr.appendChild(td7);

    }      
}

document.addEventListener("DOMContentLoaded", function(event) {
/* event function that sorts the results on title, artist, year, genre, and popularity based 
   off user click event in descending order 
*/
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


/* This function outputs the radar chart based off user selection of song */
function outputChart(songTitle,danceability,energy,valence,speechiness,loudness,liveness){
  const songChart = document.getElementById('songChart');
  //Chart.defaults.scale.ticks.beginAtZero = true;

  let chartData = new Chart(songChart, {
    type: 'radar',
    data: {
      labels: ["Danceability", "Energy", "Valence", "Speechiness", "Loudness", "Liveness"],
      datasets: [
        {
          label: songTitle.toString(),
          backgroundColor: "rgba(79, 255, 4, 0.48)",
          borderColor: "rgb(79, 255, 4)",
          data: [danceability, energy, valence, speechiness, loudness, liveness]
        }
      ]
    },
      options: {
        maintainAspectRatio: false,
      }
  });
  return chartData;  
}
/* This function searches through the searchResults array instead of songs array for optimization
   and finds the song ID the user selects and returns the song object
*/
function findSong(songID){
    let result = songs.find(s => s.song_id == songID );
    return result;
  }
/* This function searches through the artist Json and finds the Artist type and returns the artist type string
*/
function findArtist(artistID){
  let artistType;
  for( op of artistsOptions ){
    if(op.id == artistID) {
      artistType = `${op.type}`;
    }
  }
  return artistType;  
}
/* This function outputs the data lists for the corresponding song object and artist type string
*/
function outputData(songObj,artistObj){
  const ul = document.querySelector('#songDetail');
  const songTitle = document.createElement('li');
  const artistName = document.createElement('li');
  const artistType = document.createElement('li');
  const genre = document.createElement('li');
  const year = document.createElement('li');
  const duration = document.createElement('li');
  const ul2 = document.querySelector('#songBreakdown');
  const secondTime = songObj.details.duration % 60;
  const minTime = Math.trunc(songObj.details.duration / 60);
  const bpm = document.createElement('li');
  const bpmProg = document.createElement('progress');
  const energy = document.createElement('li');
  const energyProg = document.createElement('progress');
  const danceability = document.createElement('li');
  const danceabilityProg = document.createElement('progress');
  const liveness = document.createElement('li');
  const livenessProg = document.createElement('progress');
  const valence = document.createElement('li');
  const valenceProg = document.createElement('progress');
  const acousticness = document.createElement('li');
  const acousticnessProg = document.createElement('progress');
  const speechiness = document.createElement('li');
  const speechinessProg = document.createElement('progress');
  const popularity = document.createElement('li');
  const popularityProg = document.createElement('progress');

  songTitle.textContent = `Song Title: ${songObj.title}`;
  ul.appendChild(songTitle);
  artistName.textContent = `Artist Name: ${songObj.artist.name}`;
  ul.appendChild(artistName);
  artistType.textContent = `Artist Type: ${artistObj}`;
  ul.appendChild(artistType);
  genre.textContent = `Genre: ${songObj.genre.name}`;
  ul.appendChild(genre);
  year.textContent = `Year: ${songObj.year}`;
  ul.appendChild(year);
  duration.textContent = `Duration: ${minTime}:${secondTime}`;
  ul.appendChild(duration);
  bpmProg.setAttribute('value', songObj.details.bpm);
  bpmProg.setAttribute('max', 200);
  bpm.textContent = `BPM - ${songObj.details.bpm}`;
  bpm.setAttribute('id', 'analysisBPM');
  bpm.appendChild(bpmProg);
  ul2.appendChild(bpm);
  energyProg.setAttribute('value', songObj.analytics.energy);
  energyProg.setAttribute('max', 100);
  energy.textContent = `Energy - ${songObj.analytics.energy}`;
  energy.appendChild(energyProg);
  ul2.appendChild(energy);
  danceabilityProg.setAttribute('value', songObj.analytics.danceability);
  danceabilityProg.setAttribute('max', 100);
  danceability.textContent = `Danceability - ${songObj.analytics.danceability}`;
  danceability.appendChild(danceabilityProg);
  ul2.appendChild(danceability);
  livenessProg.setAttribute('value', songObj.analytics.liveness);
  livenessProg.setAttribute('max', 100);
  liveness.textContent = `Liveness - ${songObj.analytics.liveness}`;
  liveness.appendChild(livenessProg);
  ul2.appendChild(liveness);
  valenceProg.setAttribute('value', songObj.analytics.valence);
  valenceProg.setAttribute('max', 100);
  valence.textContent = `Valence - ${songObj.analytics.valence}`;
  valence.appendChild(valenceProg);
  ul2.appendChild(valence);
  acousticnessProg.setAttribute('value', songObj.analytics.acousticness);
  acousticnessProg.setAttribute('max', 100);
  acousticness.textContent = `Acousticness - ${songObj.analytics.acousticness}`;
  acousticness.appendChild(acousticnessProg);
  ul2.appendChild(acousticness);
  speechinessProg.setAttribute('value', songObj.analytics.speechiness);
  speechinessProg.setAttribute('max', 100);
  speechiness.textContent = `Speechiness - ${songObj.analytics.speechiness}`;
  speechiness.appendChild(speechinessProg);
  ul2.appendChild(speechiness);
  popularityProg.setAttribute('value', songObj.details.popularity);
  popularityProg.setAttribute('max', 100);
  popularity.textContent = `Popularity - ${songObj.details.popularity}`;
  popularity.appendChild(popularityProg);
  ul2.appendChild(popularity);
}
/* This function loops through the children of parent node elements and removes them */
function clearData() {
  const dataset1 = document.querySelector('#songDetail');
  const dataset2 = document.querySelector('#songBreakdown');
  while(dataset1.hasChildNodes()) {
    dataset1.removeChild(dataset1.childNodes[0]);
  }
  while(dataset2.hasChildNodes()) {
    dataset2.removeChild(dataset2.childNodes[0]);
  }
}
/* The following function adds the class show to all the childNodes for id author */
function dropDown() {
  document.getElementById('author').classList.toggle('show');
}
/* The following removes show if the user clicks a secondTime on the button for dropdown-content */
window.onclick = function(e) {
  if(!e.target.matches('.dropbtn')) {
    let drop = document.getElementsByClassName("dropdown-content");
    for(let i = 0; i < drop.length; i++) {
      let openDrop = drop[i];
      if(openDrop.classList.contains('show')) {
        openDrop.classList.remove('show');
      }
    }
  }
}

