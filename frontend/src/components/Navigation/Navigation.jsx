import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import LoginFormModal from '../LoginFormModal/LoginFormModal.jsx';
// import SignupFormModal from '../SignupFormModal/SignupFormModal.jsx';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  

  return (
    <div>
      <nav>
        <div>
          <NavLink to="/">Logo to click for home</NavLink>
        </div>
        
        <div className='profile-button'>
          {isLoaded && (<ProfileButton user={sessionUser} />)}
        </div>

      </nav>
    </div>
  );
}

export default Navigation;