import "./results.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { database } from "./Database.js";
import solidStar from "./images/star-solid.svg";
import halfStar from "./images/star-half-stroke-regular.svg";
import emptyStar from "./images/star-regular.svg";
import BandPage from "./BandPage.js";

export default function Results(props) {
  const [bandsShowing, setBandsShowing] = useState(database);

  //Sorting
  useEffect(() => {
    if (props.sortByRating) {
      setBandsShowing((prev) =>
        []
          .concat(prev)
          .sort((a, b) =>
            a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
          )
      );
    } else if (props.sortByBandName) {
      setBandsShowing((prev) =>
        []
          .concat(prev)
          .sort((a, b) =>
            a.bandName > b.bandName ? 1 : b.bandName > a.bandName ? -1 : 0
          )
      );
    }
  }, [props.sortByRating, props.sortByBandName, props.input]);

  //Filtering
  useEffect(() => {
    setBandsShowing(database);
    if (props.input.length > 0) {
      setBandsShowing((prev) =>
        prev.filter((x) => {
          if (
            x.bandName.toLowerCase().includes(`${props.input}`) ||
            x.location.toLowerCase().includes(`${props.input}`)
          )
            return x;
        })
      );
    } else {
      setBandsShowing(database);
    }
    if (props.filterOptions.filterStars > 0) {
      setBandsShowing((prev) =>
        prev.filter((x) => x.rating >= Number(props.filterOptions.filterStars))
      );
    }

    if (props.filterOptions.filterGenre.length > 0) {
      setBandsShowing((prev) =>
        prev.filter((x) => {
          for (let each of props.filterOptions.filterGenre) {
            if (x.style.toLowerCase().includes(each)) {
              return x;
            }
          }
        })
      );
    }
  }, [props.filterOptions, props.input]);

  //Stars displayed on each band card
  function stars(rating) {
    let stars2 = [];
    for (let i = 1; i <= rating; i++) {
      stars2.push({ solidStar });
    }
    if (rating % 1 !== 0) {
      stars2.push({ halfStar });
    }
    for (let i = 1; i <= 5 - rating; i++) {
      stars2.push({ emptyStar });
    }
    stars2.map((each, index) => {
      return (
        <img key={index} className="review-star star" src={each} alt="star" />
      );
    });
  }

  //Printing the card
  const results = bandsShowing.map((each, i) => (
    // <>
    <Link key={i} to="/bandPage" state={each} className="band-container">
      <h1>{each.bandName}</h1>
      <div id="band-photo">
        <img src={each.pic} alt="" />
      </div>
      <div className="mobile-indent" id="stars">
        {stars(each.rating)}
      </div>
      <p className="mobile-indent" id="reviews">
        {each.numberOfReviews} Reviews
      </p>
      <p className="mobile-indent bold">{each.location}</p>
      <p className="mobile-indent bold">{each.style}</p>
      <p className="mobile-indent regular">Venues: {each.venues.join(", ")}</p>
      <p className="mobile-indent shows-button regular" href="">
        Upcoming Shows
      </p>
    </Link>
    // {/* </> */}
  ));

  return <div className="results">{results}</div>;
}
