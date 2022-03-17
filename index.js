const countriesElement = document.querySelector(".countries")
const menuBtn = document.querySelector("#menuBtn")
const dropdowN = document.querySelector("#dropdowN")
const region = document.querySelectorAll(".regions")
var countriesNew = assignCountry()
var countriesNeww = []
fetch('https://restcountries.com/v3.1/all')
  .then(response => {
   return response.json()
  }).then(data => {
    countriesNew = data
    console.log(countriesNew)
  })

// filter fdropdowN
window.addEventListener('DOMContentLoaded', () => {
  menuBtn.addEventListener('click', () => {
    if(dropdowN.classList.contains('hidden')){
      dropdowN.classList.remove('hidden');
      dropdowN.classList.add('flex');
    }else{
      dropdowN.classList.remove('flex');
      dropdowN.classList.add('hidden');
    }

  })
})


// fetching country details from API
async function getCountry(){
  const url = await fetch(`https://restcountries.com/v3.1/all`);
  const res = await url.json();
  countriesNew = res
  

  res.forEach(element => {
    showCountry(element);  
  })
  fliterCountries();
  selectCountry()
}
getCountry();

function showCountry(data){
  const country = document.createElement("div");
  country.classList.add("country", "grid")
  country.innerHTML= ` 
  <div class=" text-xl shadow-lg dark:bg-darkblue bg-white rounded-lg ">
    <div class = " ">
      <img src="${data.flags.svg}" alt="" class=" object-cover h-full w-full rounded-t-lg cursor-pointer">    
    </div>
    <div class=" p-5 dark:text-white text-vtdarkblue">
      <h1 class=" countryName font-extrabold mb-2">${data.name.common}</h1>
      <h2>Population: ${data.population}</h2>
      <h2 class = "regionName">Region: ${data.region}</h2>
      <h2>Capital: ${data.capital}</h2>
    </div>
  </div>  `;
  countriesElement.appendChild(country);
}

/*
const searchInput = document.querySelector(".searchInput");
searchInput.addEventListener('input', () => {
  let searchValue = searchInput.value.toLowerCase()
  // console.log("THIS", searchValue)
  // console.log(countriesNew)
  countriesNew.forEach((country) => {
    if(country.name.common.includes(searchValue)) {
      countriesNeww.push(country)
      console.log(country)
    }
  })

  countriesNeww.forEach(element => {
      showCountry(element);   
  })
  */
function fliterCountries() {
  const countryName = document.getElementsByClassName("countryName"); 
  // console.log(countryName)
  const searchInput = document.querySelector(".searchInput");
  searchInput.addEventListener('input', () => {
    Array.from(countryName).forEach(elem => {
      console.log(elem.textContent)
    if(elem.textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
      elem.parentElement.parentElement.parentElement.style.display = "grid"
    } else {
      elem.parentElement.parentElement.parentElement.style.display = "none"
    }
  });
  })

}


const regionName = document.getElementsByClassName("regionName"); 
region.forEach(element => {
  element.addEventListener("click", ()=> {
    Array.from(regionName).forEach(elem => {
      if(elem.innerText.includes(element.innerText) || element.innerText == "All"){
        elem.parentElement.parentElement.parentElement.style.display = "grid"
      } else {
        elem.parentElement.parentElement.parentElement.style.display = "none"
      }
    });
  });
});

async function assignCountry(){
  const url = await fetch(`https://restcountries.com/v3.1/all`);
  const res = await url.json();
  return res
}


function selectCountry() {
  let countries = document.querySelectorAll('.country')

  countries.forEach((e, index) => {
    e.addEventListener('click', () => {
      console.log(e.children[0])
      console.log(e.children[0].children[1].children[0].innerText)

      let countryLabel = e.children[0].children[1].children[0].innerText
      countryLabel = 'name/' + countryLabel 
      localStorage.setItem('country', countryLabel)
      window.location.href = 'details.html';
    })
  })
}

