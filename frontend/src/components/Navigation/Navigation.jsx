import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import LoginFormModal from '../LoginFormModal/LoginFormModal.jsx';
// import SignupFormModal from '../SignupFormModal/SignupFormModal.jsx';
import './Navigation.css';
import { GiMushroomHouse } from "react-icons/gi";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);



  return (
    <div>
      <nav>
        <div className='icon'>
          <NavLink to="/" className="home"> <GiMushroomHouse size={40} color='#c15c6e' /></NavLink>
          <NavLink to="/" className="title">Once Upon A Stay</NavLink>
        </div>
        
        <div className="right-nav">
          <div className='new-spot-link'>
            {sessionUser && (
              <NavLink to="api/spots" className="create-link">
                Create a New Spot
              </NavLink>
            )}
          </div>

          <div className='profile-button'>
            {isLoaded && (<ProfileButton user={sessionUser} />)}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;