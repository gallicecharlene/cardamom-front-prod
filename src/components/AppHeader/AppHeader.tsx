import { userData } from '../../data';
import { loginAction } from '../../redux/Settings/action';
import './AppHeader.scss';
import Login from './LogIn/LogIn';
import Signup from './SignUp/SingUp';
import { useDispatch } from 'react-redux';
import { UserData } from '../../types';
import { ReactNode } from 'react';

interface AppHeaderProps {
  children: ReactNode;
}

function AppHeader({ children }: AppHeaderProps) {
  return (
    <header className="header">
      <div className="header-content">{children}</div>

      <h1>CardAMom</h1>
      <div>
        <Login />
        <Signup />
      </div>
    </header>
  );
}

export default AppHeader;
