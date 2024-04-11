import { ChangeEvent, useState, FormEvent } from 'react';

import './LogIn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import { AppDispatch, RootState } from '../../../redux/store';
import action from '../../../redux/User/action';
import Cookies from 'js-cookie';
import { loginAction } from '../../../redux/User/action';
import { useAppDispatch } from '../../../hooks/redux';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useSelector((store: RootState) => store.user);
  const pseudo = user?.pseudo || '';
  const token = Cookies.get('jwtToken');
  const dispatch: AppDispatch = useDispatch();
  const { isConnected } = useSelector((store: RootState) => store.user);

  const emailHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // Fonction pour se deconnecter en retirant aussi le token du cookie
  const handleDisconnect = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log('déconnecté');
    dispatch({ type: 'auth/DISCONNECT' });
    Cookies.remove('jwtToken');
  };
  // fonction pour envoyer le formulaire de connection à la BDD

  const handleConnect = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      action.loginAction({
        email,
        password,
        pseudo,
        token: '',
      })
    );
    console.log(pseudo);
  };
  const { isConnected } = useSelector((store: RootState) => store.user);

  const dispatch: AppDispatch = useAppDispatch();

  const { displayModalLogIn } = useSelector(
    (store: RootState) => store.settings
  );
  const handleDialogDisplay = () =>
    displayModalLogIn
      ? dispatch({ type: 'auth/HIDE_MODAL_LOGIN' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_LOGIN' });

  // Ajouter la fonction de logout dans le button Déconnexion
  return (
    <>
      {token ? (
        <form>
          <h3>
            <i>👋 Bienvenue {user?.pseudo}!</i>
          </h3>
          <button onClick={handleDisconnect}>Déconnexion</button>
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
