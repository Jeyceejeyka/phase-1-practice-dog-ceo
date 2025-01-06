console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.getElementById("dog-image-container");
    const dogBreedsUl = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");
  
    // Fetch and display random dog images
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imageUrl => {
          const img = document.createElement("img");
          img.src = imageUrl;
          img.alt = "Random Dog";
          img.style.width = "200px";
          img.style.margin = "10px";
          dogImageContainer.appendChild(img);
        });
      })
      .catch(error => console.error("Error fetching images:", error));
  
    // Fetch and display dog breeds
    let breeds = [];
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        breeds = Object.keys(data.message);
        renderBreeds(breeds);
      })
      .catch(error => console.error("Error fetching breeds:", error));
  
    // Function to render breeds to the DOM
    function renderBreeds(breedList) {
      dogBreedsUl.innerHTML = ""; // Clear the list before rendering
      breedList.forEach(breed => {
        const li = document.createElement("li");
        li.textContent = breed;
        li.style.cursor = "pointer";
  
        // Change font color on click
        li.addEventListener("click", () => {
          li.classList.toggle("changed-color");
        });
  
        dogBreedsUl.appendChild(li);
      });
    }
  
    // Filter breeds based on dropdown selection
    breedDropdown.addEventListener("change", (event) => {
      const selectedLetter = event.target.value;
      const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
      renderBreeds(filteredBreeds);
    });
  });
  