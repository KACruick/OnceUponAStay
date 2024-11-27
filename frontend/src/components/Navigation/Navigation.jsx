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
          <NavLink to="/" className="title">Catchy Title</NavLink>
        </div>
        
        <div className='profile-button'>
          {isLoaded && (<ProfileButton user={sessionUser} />)}
        </div>

      </nav>
    </div>
  );
}

export default Navigation;