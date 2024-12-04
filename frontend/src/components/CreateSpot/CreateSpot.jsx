import "./CreateSpot.css";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { csrfFetch } from '../../store/csrf';
import { createSpot } from "../../store/spots";

function CreateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [otherImages, setOtherImages] = useState(["", "", "", ""]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [errors, setErrors] = useState([]);

  const handleOtherImages = (index, value) => {
    const updatedImages = [...otherImages];
    updatedImages[index] = value;
    setOtherImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpot = {
      name,
      address,
      city,
      state,
      country,
      price: parseFloat(price),
      description,
      previewImage,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      SpotImages: [previewImage, ...otherImages.filter((url) => url)].map(
        (url) => ({ url }) // only include valid image URLs
      )
    };

    try {
      console.log("newSpot: ", newSpot)
      const createdSpot = await dispatch(createSpot(newSpot));
      navigate(`/spots/${createdSpot.id}`); // redirect to the new spot's page
    } catch (error) {
      setErrors(error.errors || ["Something went wrong."]);
    }

  }


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
            <p>Where&apos;s your place located?</p>
            <p>Guests will only get your exact address once they book a reservation.</p>
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
            <p>Describe your place to guests</p>
            <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

        <hr></hr>

          <div className="create-title">
            <p>Create a title for your spot</p>
            <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

        <hr></hr>

          <div className="set-price">
            <p>Set a base price for your spot</p>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <label>
            $
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              required
            />
            </label>
          </div>
          
        <hr></hr>

          <div className="add-photos">
            <p>Liven up your spot with photos</p>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <input
              type="text"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
            {otherImages.map((img, index) => (
              <input
              key={index}  
              type="text"
              value={img}
              onChange={(e) => handleOtherImages(index, e.target.value)}
              />
          ))}
          </div>

        <hr></hr>

          <button type="submit">
            Create Spot
          </button>

        </form>

      </div>

    </div>
  )
}

export default CreateSpot

// https://placehold.co/600x400/ffcc00/png