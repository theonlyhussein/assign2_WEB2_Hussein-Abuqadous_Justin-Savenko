


/* url of song api --- https versions hopefully a little later this semester */	
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

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
