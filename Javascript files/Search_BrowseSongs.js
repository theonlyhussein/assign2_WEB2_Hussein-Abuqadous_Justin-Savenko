
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
document.querySelector("#less_Year").disabled = true;
document.querySelector("#greater_Year").disabled=true;
document.querySelector("#Less_Popularity").disabled=true;
document.querySelector("#Greater_Popularity").disabled=true;
document.querySelector("#lessYear_button").disabled=true;
document.querySelector("#greatYear_button").disabled=true;
document.querySelector("#lessPOP_button").disabled=true;
document.querySelector("#greatPOP_button").disabled=true;
});
// Which radio button did the user choose? to unable the right input. to be continued ... 
function verifyAnswer(){
  const radioButtons = document.querySelectorAll('input[name="fav"]');
  for (const radioButton of radioButtons) {
    if (radioButton.clicked == true && radioButton.id == "title_button"){
      document.querySelector("#title").disabled = false;
      break;
    }
    else if (radioButton.clicked == true && radioButton.id == "artist_button"){
      
      document.querySelector("#artist").disabled = false;
      break; 
    }
    else if (radioButton.clicked == true && radioButton.id == "genre_button"){
      
      document.querySelector("#genre").disabled = false;
      break;
    }
    else if ( radioButton.id == "year_button"){

      document.querySelector("#lessYear_button").disabled=false;
      document.querySelector("#greatYear_button").disabled=false;
      break;
    }
    else {
      document.querySelector("#lessPOP_button").disabled=false;
      document.querySelector("#greatPOP_button").disabled=false;
      break;
    }

    

  }
  }
