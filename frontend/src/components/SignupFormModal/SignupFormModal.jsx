import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const incompleteSignup = !email || !username || username.length < 4 || !firstName || !lastName || !password || password.length < 6 || !confirmPassword || confirmPassword.length < 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {}

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Confirm Password field must be the same as the Password field";
    }

    setErrors({});

    try {
      await dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      );
      closeModal();
    } catch (res) {
      if (res && res.json) {
        const data = await res.json();
        console.log("Backend Response Data:", data); 
        if (data?.errors) {
          if (data.errors.email) newErrors.email = "The provided email is invalid";
          if (data.errors.username) newErrors.username = "Username must be unique";
        }
      }
    }
    console.log("newErrors: ", newErrors)
    setErrors(newErrors);
  };


  return (
    <div className='sign-up-container'>
      <h1>Sign Up</h1>

      <div className='error-container'>
      {Object.values(errors).map((error, idx) => (
        <p key={idx} className='error-message'>{error}</p>
      ))}
      </div>

      <form className='form-div' onSubmit={handleSubmit}>

          <input
            type="text"
            value={firstName}
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
           
          />
     
          {/* {errors.firstName && <p>{errors.firstName}</p>} */}

          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
          
          />
   
          {/* {errors.lastName && <p>{errors.lastName}</p>} */}

          <input
            type="text"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
    
          />
      
          {/* {errors.email && <p>{errors.email}</p>} */}
       
          <input
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            
          />
  
          {/* {errors.username && <p>{errors.username}</p>} */}
      
  
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
       
          />
      
          {/* {errors.password && <p>{errors.password}</p>} */}
     
          <input
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
     
          />
    
        {/* {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )} */}
        <button type="submit" className='sign-up-button' disabled={incompleteSignup}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;