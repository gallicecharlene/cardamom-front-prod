import { ChangeEvent, useState } from 'react';
import './SignUp.scss';
import { IoIosCloseCircle } from 'react-icons/io';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { RootState } from '../../../redux/store';
import { signUpAction } from '../../../redux/User/action';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const token = Cookies.get('jwtToken');
  const dispatch = useAppDispatch();

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
      ? toast.error('Les mots de passe ne correspondent pas')
      : handleSingUp(event);
  };
  // Création compte user
  const handleSingUp = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password || !pseudo || !newPassword) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    setEmail('');
    setPseudo('');
    setPassword('');
    setNewPassword('');
    dispatch(
      signUpAction({
        email,
        password,
        pseudo,
        id: 0,
        decks: undefined,
      })
    );
    toast.success('Votre compte a bien été créé');
    dispatch({ type: 'auth/HIDE_MODAL_SIGNUP' });
  };

  const { displayModalSignUp } = useAppSelector(
    (store: RootState) => store.settings
  );

  const handleDialogDisplay = () =>
    displayModalSignUp
      ? dispatch({ type: 'auth/HIDE_MODAL_SIGNUP' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_SIGNUP' });

  return (
    <>
      {token ? (
        ''
      ) : (
        <>
          {displayModalSignUp ? (
            <div id="Settings" role="dialog" aria-modal="true">
              {/* Aria-modal pour empécher l'utilisateur de sortir de la modal une fois ouverte, avec tabulation */}
              <button
                id="closeButton"
                onClick={handleDialogDisplay}
                aria-label="Close sign up form"
              >
                <IoIosCloseCircle className="react_icon" />
              </button>
              <form className="form-container" onSubmit={handlePasswordCheck}>
                <label htmlFor="pseudo-input"></label>
                {/* l'id pseudo input est similaire au htmlFor du label pour les lier entre eux */}
                {/* Pas de texte dans le label par soucis de place, le placeholder donne déjà des informations*/}
                <input
                  id="pseudo-input"
                  className="input-signup"
                  type="text"
                  value={pseudo}
                  onChange={pseudoHandleChange}
                  placeholder="Pseudo"
                  aria-label="Enter your username "
                  required
                />
                {/* require pour informer que ce champs est requis */}
                <label htmlFor="email-input"></label>
                <input
                  id="email-input"
                  className="input-signup"
                  type="email"
                  value={email}
                  onChange={emailHandleChange}
                  placeholder="Email"
                  aria-label="Enter your email"
                  required
                />

                <label htmlFor="password-input"></label>
                <input
                  id="password-input"
                  className="input-signup"
                  type="password"
                  value={password}
                  onChange={passwordHandleChange}
                  placeholder="Mot de passe"
                  aria-label="Enter your password"
                  required
                />

                <label htmlFor="confirm-password-input"></label>
                <input
                  id="confirm-password-input"
                  className="input-signup"
                  type="password"
                  value={newPassword}
                  onChange={newPasswordHandleChange}
                  placeholder="Confirmer le mot de passe"
                  aria-label="Confirm your password"
                  required
                />
                <button className="valid-button-signup" type="submit">
                  Créer un compte
                </button>
              </form>
            </div>
          ) : (
            <button
              type="button"
              className="authentification-button"
              aria-label="Open sign upform"
              onClick={handleDialogDisplay}
            >
              Sign Up
            </button>
          )}
        </>
      )}
    </>
  );
}

export default SignUp;
