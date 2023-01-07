import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReducerType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/action';
import AuthStatus from '../../types/auth-status.enum';

export default function UserBlock() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const avatar = useAppSelector((state) => state[ReducerType.User].avatar);
  const authStatus = useAppSelector((state) => state[ReducerType.User].authorizationStatus);

  if (authStatus !== AuthStatus.Authorized) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link className="user-block__link" to={'/login'} data-testid='login-link'>
            Login
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={avatar || ''} alt="User avatar" width="63" height="63" onClick={() => navigate('/mylist')} data-testid='avatar'/>
        </div>
      </li>
      <li className="user-block__item">
        <Link
          to="/"
          className="user-block__link"
          onClick={(event) => {
            event.preventDefault();
            dispatch(logout());
          }}
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
}
