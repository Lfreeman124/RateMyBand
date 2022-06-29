import React from "react";
import { useState } from "react";
import "./BandPage.css";
import { useLocation, Link } from "react-router-dom";
import solidStar from "./images/star-solid.svg";
import halfStar from "./images/star-half-stroke-regular.svg";
import emptyStar from "./images/star-regular.svg";
import arrowUp from "./images/arrow-up-solid.svg";
import arrowDown from "./images/arrow-down-solid.svg";

export default function BandPage() {
  const location = useLocation();
  const state = location.state;
  const [arrow, setArrow] = useState(false);
  const [searchReviewsFor, setSearchReviewsFor] = useState("");

  function stars(rating) {
    let stars2 = [];
    for (let i = 1; i <= rating; i++) {
      stars2.push("solid");
    }
    if (rating % 1 !== 0) {
      stars2.push("half");
    }
    for (let i = 1; i <= 5 - rating; i++) {
      stars2.push("empty");
    }
    stars2 = stars2.map((each, index) => {
      if (each === "solid") {
        return (
          <img
            key={index}
            className="review-star star"
            src={solidStar}
            alt="star"
          />
        );
      } else if (each === "half") {
        return (
          <img
            key={index}
            className="review-star star"
            src={halfStar}
            alt="star"
          />
        );
      } else if (each === "empty") {
        return (
          <img
            key={index}
            className="review-star star"
            src={emptyStar}
            alt="star"
          />
        );
      }
    });
    return stars2;
  }

  function Shows() {
    let shows = state.shows.map((each, index) => {
      return (
        <div key={index} className="show-left-right">
          <div className="show">
            <p id="gig-venue">{each.venue}</p>
            <p id="gig-city">{each.city}</p>
            <p id="gig-date">{each.date}</p>
          </div>
          <div id="tickets">Find Tickets</div>
        </div>
      );
    });
    return <div>{shows}</div>;
  }

  let venues = "";
  for (let each in state.venues) {
    if (each < state.venues.length - 1) {
      venues = venues + state.venues[each] + ", ";
    } else {
      venues = venues + state.venues[each];
    }
  }

  function Reviews() {
    let reviews2 = state.reviews.map((each, i) => {
      return (
        <div key={i} className="review-container">
          <p className="review-name">{each.name}</p>
          <div className="reviews-stars-date-container">
            <div>{stars(each.rating)}</div>
            <p className="review-date">{each.date}</p>
          </div>

          <p className="review-quote">{each.quote}</p>
        </div>
      );
    });
    return <div className="reviews-container">{reviews2}</div>;
  }
  function searchReviews() {
    console.log(searchReviewsFor);
    for (let each of state.reviews) {
      if (each.quote.includes(searchReviewsFor)) {
        console.log(each.name);
        // each.quote.replace(
        //   /recommend/g,
        //   <span className="highlight">recommend</span>
        // );
      }
    }
  }

  function sortReviewsArrowToggle() {
    setArrow((prev) => !prev);
  }

  return (
    <div>
      <section className="bio">
        <Link to="/RateMyBand" className="home">
          RateMyBand
        </Link>

        <div className="pic-and-info-container">
          <div className="image-container">
            <img src={state.pic} alt="" />
          </div>
          <div className="band-info">
            <div className="band-title-ratings">
              <h1>{state.bandName}</h1>
              <div className="review-box">
                <div className="review-box-top">
                  <img className="star star-2" src={solidStar} alt="" />
                  <div id="rating-2">{state.rating}</div>
                  <p id="reviews-2">({state.numberOfReviews} Reviews)</p>
                </div>
                <div className="review-button">Add a Review</div>
              </div>
            </div>
            <p className="band-info-1">{state.location}</p>
            <p className="band-info-1">{state.style}</p>
            <div className="band-bio">
              {state.bio.map((each, index) => (
                <p key={index} className="bio-paragraph">
                  {each}
                </p>
              ))}
            </div>
            <p className="band-venues">Regularly seen at: {venues}</p>
          </div>
        </div>
      </section>
      <section className="shows">
        <h2 className="indent">Upcoming Shows:</h2>
        <Shows />
      </section>
      <section className="shows">
        <div className="reviews-dashboard">
          <h2 className="indent">Reviews:</h2>

          <input
            type="search"
            value={searchReviewsFor}
            id="search-reviews"
            name="search-reviews"
            placeholder="Search for keyword.."
            onChange={(e) => {
              setSearchReviewsFor(e.target.value);
            }}
          ></input>
          <button onClick={searchReviews}>Search</button>
          <div onClick={sortReviewsArrowToggle} id="ratings-sort">
            Sort by rating <img src={arrow ? arrowDown : arrowUp} alt="" />
          </div>
        </div>

        <Reviews />
      </section>
    </div>
  );
}
