import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdStar } from "react-icons/io";
import { getSpots } from '../../store/spots';
import { Tooltip } from 'react-tooltip';
import './ManageSpots.css'
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx'
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal.jsx'


function ManageSpots() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const spots = useSelector((state) => state.spots.allSpots);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch])

    if (!user) {
        return navigate("/", {
          state: { error: "You must be logged in to manage your spots" },
          replace: true
        });
    }

    // console.log("spots", spots)
    const userSpots = Object.values(spots).filter((spot) => spot.ownerId === user.id);

    return (
        <div className='page'>

            <div className='header'>
                <div className='header-title'>
                    <h1>Manage Your Spots</h1>
                </div>
                
                <div className='link-create'>
                    <Link to="/api/spots" className="create-spot-link">
                        Create a New Spot
                    </Link> 
                </div>

            </div>
         
    
          {userSpots.length === 0 ? (
            <div className='no-spots'>
                <p>You don&apos;t have any spots yet</p>
            </div>
          ) : (

            <div className="container">
              {userSpots.map((spot) => (
                <div key={spot.id} className="spot-tile-container">
                  <Link to={`/api/spots/${spot.id}`} className="spot-tile-link">
                    <div className="spot-tile" data-tooltip-id={`tooltip-${spot.id}`}>
                      <div className="spot-image-container">
                        <img src={spot.previewImage} alt={spot.name} />
                      </div>
                      <div className="spot-tile-info">
                        <p className="spot-tile-location">
                          {spot.city}, {spot.state}
                          <span className="spot-tile-rating">
                            <IoMdStar /> {!spot.avgRating || spot.avgRating === 0 ? "New" : spot.avgRating.toFixed(1)}
                          </span>
                        </p>
                        <p className="spot-tile-price">
                          ${spot.price} <span>night</span>
                        </p>
                      </div>
                      <Tooltip id={`tooltip-${spot.id}`} place="top" effect="solid" className="tooltip-name" >{spot.name}</Tooltip>
                    </div>
                  </Link>
                  <div className="spot-actions">

                    {/* <Link to={`api/spots/${spot.id}/edit`} className="update-link">
                      Update
                    </Link> */}

                        <button
                        className="button-link"
                        onClick={() => navigate(`/api/spots/${spot.id}/edit`)}
                        >
                        Update
                        </button>

                    

                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<DeleteSpotModal spot={spot} />}
                      className="delete-modal"
                    />

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

export default ManageSpots
