import "./CreateSpot.css";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot } from "../../store/spots";

function CreateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [otherImages, setOtherImages] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [errors, setErrors] = useState([]);

  if (!user) {
    return navigate("/", {
      state: { error: "Please login to create a spot" },
      replace: true
    });
  }

  const handleOtherImages = (index, value) => {
    const updatedImages = [...otherImages];
    updatedImages[index] = value;
    setOtherImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
  
    const newSpot = {
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
  
    try {
      const createdSpot = await dispatch(createSpot(newSpot, imageUrls));
      console.log("created spot: ", createdSpot)
      navigate(`/spots/${createdSpot.id}`); // Redirect to the new spot page
    } catch (error) {
      console.error("Error creating spot:", error);
      setErrors(error.errors || ["An error occurred."]);
    }
  };


  return (
    <div className="create-spot-container">

      <div className="header">
        <h1>Create a new Spot</h1>
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
            <label>
            Country:
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </label>
            <label>
            Street Address:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </label>
            <label>
            City:
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            </label>
            <label>
            State:
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
            </label>
            <label>
            Latitude:
            <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)}  />
            </label>
            <label>
            Longitude:
            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)}  />
            </label>
          </div>

        <hr></hr>

          <div className="description">
            <h3>Describe your place to guests</h3>
            <h4>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

        <hr></hr>

          <div className="create-title">
            <h3>Create a title for your spot</h3>
            <h4>Catch guests&apos; attention with a spot title that highlights what makes your place special.</h4>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

        <hr></hr>

          <div className="set-price">
            <h3>Set a base price for your spot</h3>
            <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
            <label>
            $
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              min="0"
              required
            />
            </label>
          </div>
          
        <hr></hr>

          <div className="add-photos">
            <h3>Liven up your spot with photos</h3>
            <h4>Submit a link to at least one photo to publish your spot.</h4>
            <input
              type="text"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
            {otherImages.map((url, index) => (
              <input 
              key={index}
              type="text"
              value={url}
              onChange={(e) => handleOtherImages(index, e.target.value)}
              />
            ))}
            <button type="button" onClick={() => setOtherImages([...otherImages, ""])}>Add another image</button>
          </div>

        <hr></hr>
          
          <div className="button-div">
            <button type="submit">
              Create Spot
            </button>
          </div>

        </form>

      </div>

    </div>
  )
}

export default CreateSpot

// https://placehold.co/600x400/ffcc00/png