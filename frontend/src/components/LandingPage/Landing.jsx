import { getSpots } from "../../store/spots";
import "./Landing.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { Tooltip } from 'react-tooltip';
import "react-tooltip/dist/react-tooltip.css";

function LandingPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.allSpots);
  
    useEffect(() => {
      dispatch(getSpots());
    }, [dispatch]);

    // console.log("spots[1].avgRating", spots[1]?.avgRating)
    // console.log("spots[1].numReviews", spots[1]?.numReviews)
    // console.log("spots[11].avgRating", spots[11]?.avgRating)
    // console.log("spots[11].numReviews", spots[11]?.numReviews)

    return (
        <>
    <section className="container">
        {Object.values(spots).map((spot) => ( 
            <Link to={`/api/spots/${spot.id}`} key={spot.id} className="spot-tile-link">
        <div className="spot-tile" key={spot.id} data-tooltip-id={`tooltip-${spot.id}`}>
            <div className="spot-image-container">
            <img src={spot.previewImage} alt={spot.name} />
            </div>
            
            <div>
        
            <div className="spot-tile-info"> 
                <div>
                    <p className="spot-tile-location">
                        {spot.city}, {spot.state}
                        <span className="spot-tile-rating"><IoMdStar /> {spot.avgRating === 0 || spot.avgRating == null ? "New" : spot.avgRating.toFixed(1)}</span>
                    </p>
                </div>
                <div className="price-night">
                    <p className="spot-tile-price">${spot.price}</p> <p>night</p>
                </div>
            </div>
          </div>
          <Tooltip id={`tooltip-${spot.id}`} place="top" effect="solid" className="tooltip-name" >{spot.name}</Tooltip>
        </div>
          </Link>
          ))}
      </section>
        </>
      );
}

export default LandingPage;

//


{/* <section className="container">
{spots.map((spot) => {
  return (
      <NavLink key={spot.name} to={`/spots/${spot.id}`}>
          <div className="spot-tile" key={spot.id}>
      <div className="spot-image-container">
          <img src={spot.previewImage} alt={spot.name} />
      </div>
    <div>
      <div className="spot-tile-info">
         
        <p className="spot-tile-location">
          {spot.city}, {spot.state}
          <span className="spot-tile-rating">{spot.avgRating}</span>
        </p>
      
        <p className="spot-tile-price">${spot.price}</p>
      </div>
    </div>
  </div>
      </NavLink>
  )
 
  })}
</section> */}