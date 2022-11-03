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