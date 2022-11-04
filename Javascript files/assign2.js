


/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';


/* Basic api connection test to see if connection to server was a success basic console output for now
   This should function correctly tested already
*/
fetch(api)
    .then( response => response.json() )
    .then( data => {
        data.forEach( song => {
            console.log(`Song Title: ${song.title}`);
            console.log(`Artist Name: ${song.artist[1]}`);
            console.log(`Release Year: ${song.year}`);
            console.log(`Song Genre: ${song.genre[1]}`);
        });

    })
    .catch( error => { console.error(error) } );
 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
