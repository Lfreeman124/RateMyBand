import { useState } from "react";
import "./App.css";
import Results from "./results.js";
import filterIcon from "./images/filter-solid.svg";
import sortIcon from "./images/sort-solid.svg";
import solidStar from "./images/star-solid.svg";

function App() {
  const [input, setInput] = useState("");
  const [sortMenuShowing, setSortMenuShowing] = useState(false);
  const [sortByRating, setSortByRating] = useState(false);
  const [sortByBandName, setSortByBandName] = useState(false);
  const [filterMenuShowing, setFilterMenuShowing] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    filterStars: 0,
    filterGenre: [],
  });

  function searchInput() {
    setInput(document.getElementById("search").value.toLowerCase());
  }
  function sortMenuToggle() {
    if (filterMenuShowing) {
      filterMenuToggle();
    }
    setSortMenuShowing((prev) => !prev);
  }

  function filterMenuToggle() {
    if (sortMenuShowing) {
      sortMenuToggle();
    }
    setFilterMenuShowing((prev) => !prev);
  }
  function sortByRatingsToggle() {
    setSortByRating(true);
    setSortByBandName(false);
    sortMenuToggle();
  }
  function sortByBandNameToggle() {
    setSortByBandName(true);
    setSortByRating(false);
    sortMenuToggle();
  }

  function handleFilterOptions(e) {
    e.preventDefault();
    let starsChecked;
    filterMenuToggle();
    if (document.getElementById("filter-stars-5").checked) {
      starsChecked = 5;
    } else if (document.getElementById("filter-stars-4").checked) {
      starsChecked = 4;
    } else if (document.getElementById("filter-stars-3").checked) {
      starsChecked = 3;
    } else {
      starsChecked = 0;
    }
    setFilterOptions((prev) => ({
      ...prev,
      filterStars: starsChecked,
    }));

    const genres = [];
    for (let i = 1; i <= 10; i++) {
      genres.push(document.getElementById(`filter-genre-${i}`));
    }

    let checked = [];
    for (let each of genres) {
      if (each.checked) {
        checked.push(each.value);
      }
    }
    setFilterOptions((prev) => ({
      ...prev,
      filterGenre: checked,
    }));
  }

  return (
    <main>
      <nav>
        <h1>RateMyBand</h1>
        <h1 id="uk">UK</h1>
        <div></div>
      </nav>
      <section className="hero">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search by Band Name, City, or Venue..."
          onChange={searchInput}
        ></input>
      </section>
      <div className="dashboard">
        <p className="results-label">
          {input.length > 0 ? `Search Results for "${input}"` : ""}
        </p>
        <div className="buttons">
          <div onClick={filterMenuToggle} id="filter">
            <p>Filter</p>
            <img src={filterIcon} alt="" />
          </div>
          <form
            id="filter-menu"
            style={
              filterMenuShowing ? { display: "flex" } : { display: "none" }
            }
          >
            <p className="menu-title">Filter By:</p>
            <p className="filter-options">Stars</p>
            <div className="star-filter-container">
              <input
                type="radio"
                id="filter-stars-5"
                name="stars"
                value={5}
              ></input>
              <label className="star-filter-label">
                <img src={solidStar} alt="" />
                <img src={solidStar} alt="" />
                <img src={solidStar} alt="" />
                <img src={solidStar} alt="" />
                <img src={solidStar} alt="" />
              </label>
            </div>
            <div className="star-filter-container">
              <input
                type="radio"
                id="filter-stars-4"
                name="stars"
                value={4}
              ></input>
              <label className="star-filter-label">
                <img src={solidStar} alt="" />
                <img src={solidStar} alt="" />
                <img src={solidStar} alt="" />
                <img src={solidStar} alt="" />+
              </label>
            </div>
            <div className="star-filter-container">
              <input
                type="radio"
                id="filter-stars-3"
                name="stars"
                value={3}
              ></input>
              <label className="star-filter-label">
                <img src={solidStar} alt="" />
                <img src={solidStar} alt="" />
                <img src={solidStar} alt="" />+
              </label>
            </div>
            <div className="star-filter-container">
              <input
                type="radio"
                id="filter-stars-3"
                name="stars"
                value={0}
              ></input>
              <label className="star-filter-label">All Ratings</label>
            </div>

            <p className="filter-options">Genre</p>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-1"
                name="filter-genre-1"
                value="rock"
              ></input>
              <label className="genre-filter-label">Rock</label>
            </div>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-2"
                name="filter-genre-2"
                value="pop"
              ></input>
              <label className="genre-filter-label">Pop</label>
            </div>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-3"
                name="filter-genre-3"
                value="accoustic"
              ></input>
              <label className="genre-filter-label">Accoustic</label>
            </div>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-4"
                name="filter-genre-4"
                value="covers"
              ></input>
              <label className="genre-filter-label">Covers</label>
            </div>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-5"
                name="filter-genre-5"
                value="dance/electronic"
              ></input>
              <label className="genre-filter-label">Dance/Electronic</label>
            </div>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-6"
                name="filter-genre-6"
                value="hip-hop"
              ></input>
              <label className="genre-filter-label">Hip-hop</label>
            </div>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-7"
                name="filter-genre-7"
                value="metal"
              ></input>
              <label className="genre-filter-label">Metal</label>
            </div>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-8"
                name="filter-genre-8"
                value="instrumental"
              ></input>
              <label className="genre-filter-label">Instrumental</label>
            </div>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-9"
                name="filter-genre-9"
                value="indie"
              ></input>
              <label className="genre-filter-label">Indie</label>
            </div>
            <div className="genre-filter-container">
              <input
                type="checkbox"
                id="filter-genre-10"
                name="filter-genre-10"
                value="jazz"
              ></input>
              <label className="genre-filter-label">Jazz</label>
            </div>
            <button id="done" onClick={handleFilterOptions}>
              Done
            </button>
          </form>
          <div onClick={sortMenuToggle} id="sort">
            <p>Sort</p>
            <img src={sortIcon} alt="" />
          </div>
          <div
            id="sort-menu"
            style={sortMenuShowing ? { display: "flex" } : { display: "none" }}
          >
            <p className="menu-title">Sort By:</p>
            <p className="sort-options" onClick={sortByRatingsToggle}>
              Ratings
            </p>
            <p className="sort-options" onClick={sortByBandNameToggle}>
              Band Name
            </p>
          </div>
        </div>
      </div>
      <Results
        filterOptions={filterOptions}
        sortByRating={sortByRating}
        sortByBandName={sortByBandName}
        input={input}
      />
    </main>
  );
}

export default App;
