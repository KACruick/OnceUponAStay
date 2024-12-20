// frontend/src/components/Navigation/ProfileButton.jsx
import './ProfileButton.css'
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal/LoginFormModal.jsx'
import SignupFormModal from '../SignupFormModal/SignupFormModal.jsx';
import OpenModalMenuItem from './OpenModalMenuItem.jsx';
import { TbMenu2 } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  // Toggle the dropdown menu
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/'); // Redirect to home page
  };

  // Dynamically set dropdown visibility
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className='profile-button'>
        <div className='menu'>
        <TbMenu2 size={30}/>
        </div>
        <div className='user'>
        <FaUserCircle size={30}/>
        </div>
      </button>

   
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className='options'>
              <div>Hello, {user.username}</div>
              <div>{user.email}</div>
            </div>
            
            <hr></hr>

            <div className='manage-div'>
              <div><Link to="api/spots/current" className="manage-link">Manage Spots</Link></div>
              <div><Link to="api/reviews/current" className='manage-link'>Manage Reviews</Link></div>
            </div>
            
            <hr></hr>

            <div className='logout-button-div'>
              <button className='logout-button' onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    
    </>
  );
}

export default ProfileButton;