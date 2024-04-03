import { ChangeEvent, useState, FormEvent } from 'react';

import './LogIn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import userReducer from '../../../redux/User/reducer';
import { AppDispatch, RootState } from '../../../redux/store';
import action from '../../../redux/User/action';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useSelector((store: RootState) => store.user);
  const pseudo = user?.pseudo || '';
  const emailHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleDisconnect = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'settings/DISCONNECT' });
  };

  const handleConnect = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      action.loginAction({
        email,
        password,
        pseudo,
      })
    );
    console.log(pseudo);
  };
  const { isConnected } = useSelector((store: RootState) => store.user);

  const dispatch: AppDispatch = useDispatch();

  const { displayModalLogIn } = useSelector(
    (store: RootState) => store.settings
  );
  const handleDialogDisplay = () =>
    displayModalLogIn
      ? dispatch({ type: 'auth/HIDE_MODAL_LOGIN' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_LOGIN' });
  return (
    <>
      {isConnected ? (
        <form onSubmit={handleDisconnect}>
          <h3>
            <i>👋 Bienvenue {user?.pseudo}!</i>
          </h3>
          <button>Déconnexion</button>
        </form>
      ) : (
        <>
          {displayModalLogIn ? (
            <div id="Settings">
              <button id="closeButton" onClick={handleDialogDisplay}>
                <IoIosCloseCircle className="react_icon" />
              </button>
              <form onSubmit={handleConnect}>
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
            <button onClick={handleDialogDisplay}>
              {isConnected ? `` : 'LogIn'}
            </button>
          )}
        </>
      )}
    </>
  );
}

export default LogIn;
