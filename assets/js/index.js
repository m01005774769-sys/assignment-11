
let spaceData = []

async function getData(){
    try{

        let data = await fetch ("https://science.nasa.gov/wp-json/wp/v2/apod-basic");
        if(!data.ok){
            throw new Error("something Went Wrong")
    }
     spaceData = await data.json()
     console.log(spaceData)

    } catch(err){
        console.log(err)
    }
}
getData()

let inputDate = document.getElementById("apod-date-input");
let loadButton = document.getElementById("load-date-btn");
let image = document.getElementById("apod-image");
let dateCalender = document.getElementById("Date-calender");
let sideDate = document.getElementById("side-date");
let apodTitle = document.getElementById("apod-title");
let apodDateDetail = document.getElementById("apod-date-detail");
let apodExplanation = document.getElementById("apod-explanation");
let apodCopyright = document.getElementById("apod-copyright");
let apodDateInfo = document.getElementById("apod-date-info");
let apodMediaType = document.getElementById("apod-media-type");
let launchSection = document.getElementById('launches');
let spaceSection  = document.getElementById('today-in-space');
let planetSection  = document.getElementById('planets');
let spaceLink = document.querySelector('[data-section="today-in-space"]');
let launchLink = document.querySelector('[ data-section="launches"]');
let planetLink = document.querySelector('[data-section="planets"]');

loadButton.addEventListener("click",function(){

    let selectedObject = spaceData.find(function(element){
        return element.date === inputDate.value
        
    })
if(selectedObject){
    image.src = selectedObject.hdurl
    dateCalender.innerHTML = selectedObject.date
    sideDate .innerHTML = selectedObject.date
    apodTitle.innerHTML = selectedObject.title
    apodDateDetail.innerHTML = selectedObject.date
    apodExplanation.innerHTML = selectedObject.explanation
    apodCopyright.innerHTML = selectedObject.copyright ? selectedObject.copyright : "Unknown"
    apodDateInfo.innerHTML = selectedObject.date
    apodMediaType.innerHTML = selectedObject.media_type

}
})

function showSection(space,launch,planet){
    if(space){
        launchSection .classList.add("hidden")
        planetSection .classList.add("hidden")
        spaceSection .classList.remove("hidden")
    }
    if(launch){
        launchSection .classList.remove("hidden")
        planetSection .classList.add("hidden")
        spaceSection .classList.add("hidden")
    }
    if(planet){
        launchSection .classList.add("hidden")
        spaceSection .classList.add("hidden")
        planetSection .classList.remove("hidden")
    }
}

spaceLink .addEventListener("click",function(){
    showSection(true,false,false)
})
launchLink .addEventListener("click",function(){
    showSection(false,true,false)
})
planetLink .addEventListener("click",function(){
    showSection(false,false,true)
})


let result = {}
async function getLaunchData(){
    try{
        let data = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?format=json&limit=10");
        if(!data.ok){
            throw new Error ("something Went Wrong")
        }
         result = await data.json()
        console.log(result)
    } catch (err){
        console.error(err)
    }
    displayFeaturedLaunch()
    displayLaunches()
}

getLaunchData()

let featuredLaunch = document.getElementById("featured-launch");

function formatDate(dateString) {
    let date = new Date (dateString.net)
    let formattedDate = date.toLocaleDateString("en-US",{
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
    })
    
    return (formattedDate)
}

function formatTime(timeString) {
    let date = new Date (timeString.net)
    let formattedTime = date.toLocaleTimeString("en-US",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:true,
        timeZone: "UTC"

    })
    return (formattedTime)
}

function displayFeaturedLaunch(){
    featuredLaunch.innerHTML = `
    <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        Go
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${result.results[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${result.results[0].image.credit}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${result.results[0].rocket.configuration.name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">2</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${formatDate(result.results[0])}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${formatTime(result.results[0])+" UTC"}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${result.results[0].pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${result.results[0].pad.location.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                        ${result.results[0].mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <img
                      src="${result.results[0].image.image_url}"
                      class="w-full h-full object-cover"
                    />
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
    `
}

let launchesGrid = document.getElementById("launches-grid");
function displayLaunches(){
    temp = "";
    for (let i = 1; i < result.results.length; i++) {
        temp += `
        <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img
                  src="${result.results[i].image.image_url}"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${result.results[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${result.results[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${result.results[i].pad.location.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formatDate(result.results[i])}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formatTime(result.results[i])} UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${result.results[i].rocket.configuration.name}i</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${result.results[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
        
        `

}
launchesGrid .innerHTML = temp
}
    

let planetData = []
async function getPlanetData(){
    try{
        let data = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
        if(!data.ok){
            throw new Error ("something Went Wrong")
        }
        let result = await data.json()
        planetData = result.bodies
        console.log(planetData)
    } catch (err){
        console.error(err)
    }
}
getPlanetData()

let planetCard = document.querySelectorAll(".planet-card")

planetCard.forEach(function(card){
    card.addEventListener("click",function(){
        let planetName = card.getAttribute("data-planet-id")
        console.log(planetName)
        let planet = planetData.find(function(element){
            return element.englishName.toLowerCase() === planetName.toLowerCase()
        })
        if(planet){
            displayPlanetDetails(planet)
        }
    })
})


let planetImage = document.getElementById("planet-detail-image");
let planetDetailName= document.getElementById("planet-detail-name");
let planetDetailDescription= document.getElementById("planet-detail-description");
let planetMoons= document.getElementById("planet-moons");
let planetMass= document.getElementById("planet-mass");
let planetRadius= document.getElementById("planet-radius");
let planetDensity= document.getElementById("planet-density");
let planetOrbitalPeriod= document.getElementById("planet-orbital-period");
let planetRotation= document.getElementById("planet-rotation");
let planetGravity= document.getElementById("planet-gravity");
let planetDistance= document.getElementById("planet-distance");
let planetDiscoverer= document.getElementById("planet-discoverer");
let planetDiscoveryDate= document.getElementById("planet-discovery-date");
let planetVolume= document.getElementById("planet-volume");
let planetPerihelion= document.getElementById("planet-perihelion");
let planetAphelion= document.getElementById("planet-aphelion");
let planetEccentricity= document.getElementById("planet-eccentricity");
let planetInclination= document.getElementById("planet-inclination");
let planetAxialTilt= document.getElementById("planet-axial-tilt");
let planetTemp= document.getElementById("planet-temp");
let planetEscape= document.getElementById("planet-escape");


function displayPlanetDetails(x){
planetImage.src = x.image
planetDetailName.innerText = x.englishName
planetDetailDescription.innerText = x.description
if(x.moons){
    planetMoons.innerText = x.moons.length
}else{planetMoons.innerText = 0}

planetMass.innerText = x.mass.massValue + " x 10^" + x.mass.massExponent + " kg"
planetRadius.innerText = x.meanRadius + " km"
planetDensity.innerText = x.density + " g/cm³"
planetOrbitalPeriod .innerText = x.sideralOrbit +" Days"
planetRotation .innerText = x.sideralRotation +" hours"
planetGravity .innerText = x.gravity +" m/s²"
planetDistance.innerText = (x.semimajorAxis/1000000).toFixed(1) +"M" + " km"
if(x.discoveredBy){
    planetDiscoverer.innerText = x.discoveredBy
}else{
    planetDiscoverer.innerText ="Known since antiquity"
}
if(x.discoveryDate){
    planetDiscoveryDate.innerText = x.discoveryDate
}else{
    planetDiscoveryDate.innerText ="Ancient times"
}
planetVolume.innerText = x.vol.volValue + " x 10^" + x.vol.volExponent
planetPerihelion.innerText = (x.perihelion/1000000).toFixed(1) +"M" + " km"
planetAphelion.innerText = (x.aphelion/1000000).toFixed(1) +"M" + " km"
planetEccentricity.innerText = x.eccentricity
planetInclination.innerText = x.inclination + "°"
planetAxialTilt.innerText = x.axialTilt + "°"
planetTemp.innerText = x.avgTemp + "°C"
planetEscape.innerText = (x.escape/1000).toFixed(2) + "  km/s"
}