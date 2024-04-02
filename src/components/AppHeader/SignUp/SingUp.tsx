import { ChangeEvent, useState, FormEvent } from 'react';

import './SignUp.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';
import { AppDispatch, RootState } from '../../../redux/store';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const emailHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const newPasswordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };
  const pseudoHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPseudo(event.target.value);
  };

  const handleLogin = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('email =', email);
    console.log('mot de passe = ', password);
    console.log('mot de passe2 = ', newPassword);
    setNewPassword('');
    setEmail(''), setPassword('');
  };

  const dispatch: AppDispatch = useDispatch();
  const { displayModalSignUp, isConnected } = useSelector(
    (store: RootState) => store.settings
  );
  const handleDialogDisplay = () =>
    displayModalSignUp
      ? dispatch({ type: 'auth/HIDE_MODAL_SIGNUP' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_SIGNUP' });

  return (
    <>
      {displayModalSignUp ? (
        <div id="Settings">
          <button id="closeButton" onClick={handleDialogDisplay}>
            <IoIosCloseCircle className="react_icon" />
          </button>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={pseudo}
              onChange={pseudoHandleChange}
              placeholder="Pseudo"
            />
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
              placeholder="Mot de passe"
            />
            <input
              type="password"
              value={newPassword}
              onChange={newPasswordHandleChange}
              placeholder="Confirmer le mot de passe"
            />
            <button type="submit">Créer un compte</button>
          </form>
        </div>
      ) : (
        <button onClick={handleDialogDisplay}>SignUp</button>
      )}
    </>
  );
}

export default SignUp;
