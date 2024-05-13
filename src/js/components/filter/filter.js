import { modules } from "../../helpers/functions";
export const Filter = () => {
  const sortBox = `
        <form class="sortBox">
            <div class="title">
                <h2>Sort</h2>
                <i class='bx bx-chevron-right'></i>
            </div>  
            <div class="selectBox">
                <h2>Sort Results By</h2>
                <div class="mySelect">
                <select name="select" class="selected-item" id="selectedItem">
                    <option value="Popular Descending" >Popular Descending</option>
                    <option value="Popular Ascending" >Popular Ascending</option>
                    <option value="Rating Descending" >Rating Descending</option>
                    <option value="Rating Ascending" >Rating Ascending</option>
                    <option value="Release Date Descending" >Release Date Descending</option>
                    <option value="Release Date Ascending" >Release Date Ascending</option>
                    <option value="Title A-Z" >Title (A-Z)</option>
                    <option value="Title Z-A" >Title (Z-A)</option>
                </select>
                <i class='bx bxs-down-arrow selectIcon'></i>
                </div>
            </div>
            <button type="submit" class="searchBtn">Search</button>
        </form>

    `;

  const filterBox = `
        <form class="filterBox">
            <div class="title">
                <h2>Filters</h2>
                <i class='bx bx-chevron-right'></i>
            </div>
            <div class="filterForm">
                <h2>Show Me</h2>
                <div class="radioGroup">
                    <div class="radioLabel">
                        <input type="radio" id="everyMovie" name="movieType" checked="true"/>
                        <label for="everyMovie">Everything</label>
                    </div>
                    <div class="radioLabel">
                        <input type="radio" id="havenotSeen" name="movieType" />
                        <label for="havenotSeen">Movies I Haven't Seen</label>
                    </div>
                    <div class="radioLabel">
                        <input type="radio" id="haveSeen" name="movieType" />
                        <label for="haveSeen">Movies I have Seen</label>
                    </div>
                    
                </div>
                <div class='radioGroup' >
                    <h2>Release Dates</h2>
                <div class="radioLabel">
                        <input type="checkbox" id="searchAll" name="movieType" />
                        <label for="searchAll">Search all releases?</label>
                    </div>
                    <div class="radioLabel">
                    <input type="checkbox" id="allCountries" name="movieType" />
                    <label for="allCountries">Search all countries?</label>
                </div>
                <div class="radioLabel">
                <input type="checkbox" id="thlim" name="movieType" />
                <label for="thlim">Theatrical (limited)</label>
            </div>
            <div class="radioLabel">
            <input type="checkbox" id="theatrical" name="movieType" />
            <label for="theatrical">Theatrical</label>
        </div>
        <div class="radioLabel">
        <input type="checkbox" id="premiere" name="movieType" />
        <label for="premiere">Premiere</label>
    </div>
    <div class="radioLabel">
    <input type="checkbox" id="digital" name="movieType" />
    <label for="digital">Digital</label>
</div>
<div class="radioLabel">
        <input type="checkbox" id="physical" name="movieType" />
        <label for="physical">Physical</label>
    </div>
    <div class="radioLabel">
        <input type="checkbox" id="tv" name="movieType" />
        <label for="tv">TV</label>
    </div>
                    <div>
                    <div>
                    <p>from<p>
                    <input type="date" ></input>
                    </div>
                    <div>
                    <p>to<p>
                    <input type="date" ></input>
                    </div>
                    
                    </div>
                    </div>
            </div>
            <div class='radioGroup genresSection filterForm'>
            <h2>Genres</h2>
           </div>
            <div class='radioGroup' >
            <label > Language </label>
            <select class="languages" name="languages>
            <option value="">Select a language...</option>
            </select>           
            </div>
            <div class='radioGroup' > 
            <div class="double_range_slider_box">
      <div class="double_range_slider">
        <span class="range_track" id="range_track"></span>
 
        <input type="range" class="min" min="0" max="100" value="0" step="0" />
        <input type="range" class="max" min="0" max="100" value="20" step="0" />
 
        <div class="minvalue"></div>
        <div class="maxvalue"></div>
      </div>
    </div>
            </div>
            <div class='radioGroup' > 
            <label for='minVotes'>Minimum User Votes</label>
            <p>test</p>
            <input id='minVotes' type='range' value='250' min='0' max='500'/>
            </div>
            <div class='radioGroup' > 
            <label for='rate'>Runtime</label>
            <p>test</p>
            <input id='rate' type='range' value='0' min='0' max='360'/>
            </div>
            
            </div>
            <button type="submit" class="searchBtn">Search</button>
        </form>        
    `;

  const filterSection = document.createElement("div");
  filterSection.classList.add("filterContent");

  const sortSection = document.createElement("div");
  sortSection.classList.add("sortContent");

  filterSection.innerHTML = filterBox;
  sortSection.innerHTML = sortBox;

  const searchSection = document.createElement("div");
  searchSection.append(sortSection, filterSection);

  const releaseSection = document.createElement("div");
  releaseSection.classList.add("releaseContent");

  const genreElementsCreator = async () => {
    
    const rawData =  fetch('https://api.themoviedb.org/3/genre/movie/list',modules).then((response) => response.json()).then((responseData) =>
        {
            console.log(responseData.genres);
            const arr = [];
            const divContainer = document.createElement("div");
            
            
            for(let genre of responseData.genres) {
              const pELement = document.createElement('p')
              pELement.textContent = genre.name;
              divContainer.append(pELement)
        }
        console.log(divContainer);
       
        
        filterSection.querySelector('.genresSection').append( divContainer);
        
     
  })  
   
  }
  const languageGenerator = async () => {
    fetch(`https://api.themoviedb.org/3/configuration/languages`,modules).then(res=> res.json()).then((data) => 
        {
           const arr = data.map(({english_name, iso_639_1}) =>  ({english_name,iso_639_1})) 
           
          
           for(let element of arr) {
            const optionElement = document.createElement('option');
            optionElement.value = element.iso_639_1;
            optionElement.textContent = element.english_name;
            filterSection.querySelector('.languages').append(optionElement)
           }
           
        }
    )

  }
  
  genreElementsCreator();
  languageGenerator();
  
  return searchSection;
}


