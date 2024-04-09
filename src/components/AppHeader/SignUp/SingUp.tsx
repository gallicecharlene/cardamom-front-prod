import { ChangeEvent, useState } from 'react';

import './SignUp.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';

import { AppDispatch, RootState } from '../../../redux/store';
import action from '../../../redux/Settings/action';
import userAction from '../../../redux/User/action';

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
  // Confirmation de mot de passe
  const handlePasswordCheck = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    password !== newPassword
      ? alert('Les mots de passe ne correspondent pas')
      : handleSingUp(event);
  };
  // Gestion user connection
  const handleSingUp = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail('');
    setPseudo('');
    setPassword('');
    setNewPassword('');
    dispatch(
      userAction.signUpAction({
        email,
        password,
        pseudo,
      })
    );
  };

  const { isConnected } = useSelector((store: RootState) => store.user);

  const dispatch: AppDispatch = useDispatch();

  const { displayModalSignUp } = useSelector(
    (store: RootState) => store.settings
  );

  const handleDialogDisplay = () =>
    displayModalSignUp
      ? dispatch({ type: 'auth/HIDE_MODAL_SIGNUP' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_SIGNUP' });

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signUpAction({ email, password, pseudo }));
    setEmail('');
    setPassword('');
    setPseudo('');
    setNewPassword('');
  };

  return (
    <>
      {isConnected ? (
        ''
      ) : (
        <>
          {displayModalSignUp ? (
            <div id="Settings">
              <button id="closeButton" onClick={handleDialogDisplay}>
                <IoIosCloseCircle className="react_icon" />
              </button>
              <form onSubmit={handlePasswordCheck}>
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
            <button onClick={handleDialogDisplay}>Sign Up</button>
          )}
        </>
      )}
    </>
  );
}

export default SignUp;
