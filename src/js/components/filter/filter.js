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

  return searchSection;
};
