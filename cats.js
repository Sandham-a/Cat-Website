const url = `https://api.thecatapi.com/v1/breeds`;
const api_key = "live_a18s4OakMLKlycxZcdQguOSeIClHtA1TJvUWnlBDrce3UTrQQM42nPism1t8ftmt"
let storedBreeds = []

 fetch(url,{headers: {
      'x-api-key': api_key
    }})
 .then((response) => {
   return response.json();
 })
.then((data) => {
   
   //filter to only include those with an `image` object
   data = data.filter(img=> img.image?.url!=null)
   
  storedBreeds = data;
   
   for (let i = 0; i < storedBreeds.length; i++) {
    const breed = storedBreeds[i];
    let option = document.createElement('option');
     
     //skip any breeds that don't have an image
     if(!breed.image)continue
     
    //use the current array index
    option.value = i;
    option.innerHTML = `${breed.name}`;
document.getElementById('breed_selector').appendChild(option);
    
    }
   //show the first breed by default
   showBreedImage(0)
})
.catch(function(error) {
   console.log(error);
});

function showBreedImage(index)
{ 
  document.getElementById("breed_image").src= storedBreeds[index].image.url;
  
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("breed_image");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

//sends the cat object to the email API
function sendEmail(){
  let text;
  let emailAddress = prompt("Please enter your email address:");
  if(emailAddress == ''){
    alert("please enter your email address.");
  }


  let selectedIndex = document.getElementById('breed_selector').value;

  let catInfoObj = {
    temperament: storedBreeds[selectedIndex].temperament,
    wikiLink: storedBreeds[selectedIndex].wikipedia_url , 
    emailAddress: emailAddress,
  }

    let serviceID = "service_0fp6dju";
    let templateID = "template_o9yxsui";
    emailjs.send(serviceID, templateID, catInfoObj)
  };