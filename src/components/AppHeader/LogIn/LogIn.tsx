import { ChangeEvent, useState, FormEvent } from 'react';

import './LogIn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';

import { AppDispatch, RootState } from '../../../redux/store';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('email =', email);
    console.log('mot de passe = ', password);

    setEmail(''), setPassword('');

    alert('connexion réussie');
  };

  const dispatch: AppDispatch = useDispatch();
  const { displayModalLogIn, isConnected } = useSelector(
    (store: RootState) => store.settings
  );
  const handleDialogDisplay = () =>
    displayModalLogIn
      ? dispatch({ type: 'auth/HIDE_MODAL_LOGIN' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_LOGIN' });
  return (
    <>
      {displayModalLogIn ? (
        <div id="Settings">
          <button id="closeButton" onClick={handleDialogDisplay}>
            <IoIosCloseCircle className="react_icon" />
          </button>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={emailHandleChange}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={passwordHandleChange}
              placeholder="mot"
            />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      ) : (
        <button onClick={handleDialogDisplay}>Log In</button>
      )}
    </>
  );
}

export default LogIn;
