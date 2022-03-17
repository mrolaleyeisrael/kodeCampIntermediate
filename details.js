function getCountry() {
  let countryName = localStorage.getItem('country')
  fetch(`https://restcountries.com/v3.1/${countryName}`)
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    console.log(data[0])

    let countryBody = document.getElementById('country-body')
    let html=""
    let unExist = ""

    html += `
    <div class=" container mx-auto  mt-10 flex flex-col md:flex-row justify-center">
    <img src=${data[0].flags.png} alt="" class=" md:w-1/2 ">
    
    <div class=" flex flex-col justify-center text-vtdarkblue dark:text-white ">
      <div class=" mt-5 ">
        <h1 class = "font-bold text-xl">${data[0].name.common}</h1>
        <p class=" mt-5"> <span>Population:</span>${data[0].population}</p>
        <p> <span>Region:</span> ${data[0].region}</p>
        <p><span>Sub Region:</span> ${data[0].subregion}</p>
        ${data[0].capital.length === 0 ? '' : `
      <div>
        ${data[0].capital.map(function(e) {
          console.log(e)
          return `
          <p> <span>Capital:</span> ${e}</p>
          `
        })}
        </div>
    `}
      </div>
      
      <div class=" mt-5">
        <p class=" text-darkgray text-2xl font-bold">Border Countries:</p>
        
      </div>
    </div>
  </div>

    ${data[0].borders.length === 0 ? '' : `
    
    <div>
      ${data[0].borders.map(function(e) {
        console.log(e)
        return ` <button class="borderCountry shadow-lg dark:bg-vdarkblue bg-white px-3 py-2 rounded-lg " value=${e}>${e}</button> `
      })}
      </div>
    `}
    `

    countryBody.innerHTML = html
    borderCountry()
  })

  
}

getCountry();

function borderCountry() {
  let borderCountries = document.querySelectorAll('.borderCountry')
  console.log(borderCountries)
  borderCountries.forEach((e) => {
    e.addEventListener('click', () => {
      console.log(e.value)
      let countryCode = e.value
      countryCode = 'alpha/' + countryCode
      localStorage.setItem('country', countryCode)
      window.location.href = 'details.html';
    })
  })
}