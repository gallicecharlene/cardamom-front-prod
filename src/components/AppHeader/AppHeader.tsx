import { userData } from '../../data';
import { loginAction } from '../../redux/Settings/action';
import './AppHeader.scss';
import Login from './LogIn/LogIn';
import Signup from './SignUp/SingUp';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../../types';
import Logo from '../../assets/logo 4.svg';
import { RootState } from '../../redux/store';

function AppHeader() {
  //Quand je click sur Login, la modal SignUp disparait
  const { displayModalLogIn } = useSelector(
    (store: RootState) => store.settings
  );
  //Quand je click sur SignUp, la modal Login disparait
  const { displayModalSignUp } = useSelector(
    (store: RootState) => store.settings
  );
  return (
    <header className="header">
      <img src={Logo} alt="Logo Cardamom" className="header-logo" />
      <h1>CardAMom</h1>
      <div>
        {displayModalLogIn ? (
          <Login />
        ) : (
          <>
            {displayModalSignUp ? (
              <Signup />
            ) : (
              <>
                <Login />
                <Signup />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
