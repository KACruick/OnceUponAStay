import { getSpots } from "../../store/spots";
import "./Landing.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function LandingPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.allSpots);
  
    useEffect(() => {
      dispatch(getSpots());
    }, [dispatch]);

    return (
        <section className="container">
          {spots.map((spot) => (
            <div className="spot-card" key={spot.id}>
              <div className="spot-image-card-container">
                <img src={spot.previewImage} alt={spot.name} />
              </div>
              <div>
                <div className="spot-card-info">
                  <p className="spot-card-location">
                    {spot.city}, {spot.state}
                    <span className="spot-card-rating">{spot.avgRating}</span>
                  </p>
                  <p className="spot-card-price">${spot.price}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      );
    }

export default LandingPage;