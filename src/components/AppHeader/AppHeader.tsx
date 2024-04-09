import { userData } from '../../data';
import { loginAction } from '../../redux/Settings/action';
import './AppHeader.scss';
import Login from './LogIn/LogIn';
import Signup from './SignUp/SingUp';
import Logo from '../../assets/logo.svg';
import { ReactNode } from 'react';

interface AppHeaderProps {
  children: ReactNode;
}

function AppHeader({ children }: AppHeaderProps) {
  return (
    <header className="header">
      <div className="header-content">{children}</div>
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
