import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import LoginFormModal from '../LoginFormModal/LoginFormModal.jsx';
// import SignupFormModal from '../SignupFormModal/SignupFormModal.jsx';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
        <>
        {/* <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li> */}
        </>
      );
  }

  return (
    <div>
      <nav>
        <div>
          <NavLink to="/">Logo to click for home</NavLink>
        </div>
        
        <div>
          <>menu button</>
          {isLoaded && (<ProfileButton user={sessionUser} />)}
        </div>

      </nav>
    </div>
  );
}

export default Navigation;