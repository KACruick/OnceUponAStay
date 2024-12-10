import "./CreateSpot.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createSpot, updateSpot, getDetails } from "../../store/spots";

function CreateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();
  const user = useSelector((state) => state.session.user);
  const existingSpot = useSelector((state) => state.spots.spotDetails);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [otherImages, setOtherImages] = useState(['', '', '', '']);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [errors, setErrors] = useState([]);
  const [isUpdate] = useState(!!spotId);

  if (!user) {
    return navigate("/", {
      state: { error: "Please login to create a spot" },
      replace: true
    });
  }

  console.log("existingSpot: ", existingSpot);
  console.log("spotId: ", spotId);

  useEffect(() => {
    if (isUpdate && spotId) {
      dispatch(getDetails(spotId))
    }
  }, [dispatch, spotId, isUpdate])

  useEffect(() => {
    if (isUpdate && existingSpot) {
        setName(existingSpot.name || '');
        setAddress(existingSpot.address || '');
        setCity(existingSpot.city || '');
        setState(existingSpot.state || '');
        setCountry(existingSpot.country || '');
        setPrice(existingSpot.price || '');
        setDescription(existingSpot.description || '');
        setLatitude(existingSpot.latitude || '');
        setLongitude(existingSpot.longitude || '');

        console.log("existingSpot.SpotImages:", existingSpot.SpotImages)
        console.log("the preview image: ", existingSpot.SpotImages[0].url)
        const preview = existingSpot.SpotImages[0].url || '';

        const others = existingSpot.SpotImages.slice(1).map((img) => img.url) || ['', '', '', ''];
        console.log("other imgs: ", others)
        setPreviewImage(preview);
        setOtherImages(others);
    }
  }, [existingSpot, isUpdate])


  const handleOtherImages = (index, value) => {
    const updatedImages = [...otherImages];
    updatedImages[index] = value;
    setOtherImages(updatedImages);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
  
    const spotData = {
      name,
      address,
      city,
      state,
      country,
      price: parseFloat(price),
      description,
      lat: latitude ? parseFloat(latitude) : null,
      lng: longitude ? parseFloat(longitude) : null
    };

    const imageUrls = [previewImage, ...otherImages.filter((url) => url.trim() !== "")];
    
    console.log("isUpdate: ", isUpdate)

    try {
      if (isUpdate) { //update existing spot
        const updatedSpot = await dispatch(updateSpot(spotId, spotData, imageUrls));
        console.log("updated spot: ", updatedSpot)
        navigate(`/api/spots/${spotId}`);
      } else { //create a new spot
        const createdSpot = await dispatch(createSpot(spotData, imageUrls));
        // console.log("created spot: ", createdSpot)
        // console.log("createdSpot.id", createdSpot.id)
        navigate(`/api/spots/${createdSpot.id}`); // Redirect to the new spot page
      }
    } catch (error) {
      console.error("Error creating spot:", error);
      setErrors(error.errors || ["An error occurred."]);
    }
  };


  return (
    <div className="create-spot-container">

      <div className="header">
        <h1>{isUpdate ? "Update your Spot" : "Create a new Spot"}</h1>
        {/* <h1>Create a new Spot</h1> */}
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        {/* <h2> Where&apos;s your place located?</h2> */}
        {/* <h3>Guests will only get your exact address once they book a reservation.</h3> */}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="set-location">
            <h3>Where&apos;s your place located?</h3>
            <h4>Guests will only get your exact address once they book a reservation.</h4>
            
          <div className="ctry-street">
            <label>
            Country:
            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </label>
            <label>
            Street Address:
            <input type="text" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </label>
          </div>
            
          <div className="city-state">
            <label>
            City:
            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            </label>
            <label>
            State:
            <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
            </label>
          </div>

          <div className="lat-long">
            <label>
            Latitude:
            <input type="number" step="any" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)}  />
            </label>
            <label>
            Longitude:
            <input type="number" step="any" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)}  />
            </label>
          </div>

          </div>

        <hr></hr>

          <div className="description">
            <h3>Describe your place to guests</h3>
            <h4>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea
              value={description}
              placeholder="Please write at least 30 characters"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

        <hr></hr>

          <div className="create-title">
            <h3>Create a title for your spot</h3>
            <h4>Catch guests&apos; attention with a spot title that highlights what makes your place special.</h4>
            <input type="text" placeholder="Name of your spot" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

        <hr></hr>

          <div className="set-price">
            <h3>Set a base price for your spot</h3>
            <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
            
            <div className="sign-input">
              <label className="dollar-sign">
                $
              </label>
              <input
                className="price-input"
                type="number"
                placeholder="Price per night (USD)"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                min="0"
                required
              />
              
            </div>

          </div>
          
        <hr></hr>

          <div className="add-photos">
            <h3>Liven up your spot with photos</h3>
            <h4>Submit a link to at least one photo to publish your spot.</h4>

            <div className="url-inputs">
                <input
                  type="text"
                  placeholder="Preview Image URL"
                  value={previewImage}
                  onChange={(e) => setPreviewImage(e.target.value)}
                  required
                />
                {otherImages.map((url, index) => (
                  <input 
                  key={index}
                  type="text"
                  placeholder="Additional Image URL"
                  value={url}
                  onChange={(e) => handleOtherImages(index, e.target.value)}
                  />
                ))}
            </div>

            {/* <button type="button" onClick={() => setOtherImages([...otherImages, ""])}>Add another image</button> */}
          </div>

        <hr></hr>
          
          <div className="button-div">
            <button type="submit">
              {isUpdate ? "Update Spot" : "Create Spot"}
            </button>
          </div>

        </form>

      </div>

    </div>
  )
}

export default CreateSpot

// https://placehold.co/600x400/ffcc00/png