import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className='login-modal-container'>
      <h1>Log In</h1>

      {errors.credential && (
      <div className="error-container">
        <p>{errors.credential}</p>
      </div>
      )}

      <form onSubmit={handleSubmit} id="login-form">
        
        <div className='email'>
              <input
                type="text"
                value={credential}
                placeholder='Username or Email'
                onChange={(e) => setCredential(e.target.value)}
                required
              />
        </div>

        <div className="password">
              <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
        </div>

        <div className='log-in-button-div'>
            {/* {errors.credential && (
              <p>{errors.credential}</p>
            )} */}
            <button className="login-button" type="submit">Log In</button>
        </div>

      </form>

      <div className='demo-user-div'>
        <button 
          type="button" 
          className="demo-user-button"
          onClick={() => {
              setCredential('FakeUser1');
              setPassword('password');
          }}
          >
          Demo User
        </button>
      </div>

    </div>
  );
}

export default LoginFormModal;