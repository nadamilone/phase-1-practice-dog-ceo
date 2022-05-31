// console.log("%c HI", "color: firebrick");

// //                          ONE:

// const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
// let breeds;
// // console.log(breeds);

// fetch(imgUrl)
//   .then((response) => response.json())
//   // .then((dogImageData) => console.log(dogImageData))
//   .then((dogImageData) => appendImages(dogImageData.message));

// function appendImages(dogImages) {
//   const imgContainer = document.querySelector("div");
//   dogImages.forEach((image) => {
//     const img = document.createElement("img");
//     img.src = image;

//     let h2 = document.createElement("h2");
//     h2.innerText = "hello world!";
//     imgContainer.append(img);
//   });
// }

// //                        TWO:
// //SET THE BREEEEEEEEDS

// const breedUrl = "https://dog.ceo/api/breeds/list/all";

// fetch(breedUrl)
//   .then((response) => response.json())
//   .then((breedsData) => {
//     breeds = Object.keys(breedsData.message);
//     renderBreeds(breeds);
//     addBreedSelectListener();
//   });

// const ul = document.querySelector("ul");

// function renderBreeds(breeds) {
//   //console.log(breeds)
//   for (let breed of breeds) {
//     const li = document.createElement("li");
//     li.innerText = breed;
//     li.addEventListener("click", () => {
//       li.style.color = "red";
//     });
//     ul.appendChild(li);
//   }
// }

// //                       THREE:

// const dropDown = document.querySelector("select");
// dropDown.addEventListener("change", filterBreeds);

// function filterBreeds(event) {
//   let letter = event.target.value;
//   let filteredBreeds = breeds.filter((breed) => {
//     return breed[0] === letter;
//   });
//   console.log(filteredBreeds);
//   ul.innerText = "";
//   renderBreeds(filteredBreeds);
// }



   
let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
  let container = document.querySelector('#dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = dogPicUrl;
  container.appendChild(newImageEl);
}

function loadBreedOptions() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {

      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedsStartingWith(event.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'palevioletred';
