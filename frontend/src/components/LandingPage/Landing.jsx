import { getSpots } from "../../store/spots";
import "./Landing.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function LandingPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.allSpots);
  
    useEffect(() => {
      dispatch(getSpots()); // uses getSpots thunk action
    }, [dispatch]);


    return (
        <>

        <section className="container">
          {spots.map((spot) => (
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
          ))}
        </section>
        </>
      );
    }

export default LandingPage;