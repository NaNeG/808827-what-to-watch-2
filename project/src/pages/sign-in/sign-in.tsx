import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { login } from '../../store/action';
import { AuthData } from '../../types/auth-data.type';

export default function SignIn() {
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthData) => {
    dispatch(login(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailField !== null && passwordField !== null) {
      onSubmit({
        email: emailField,
        password: passwordField,
      });
      navigate('/');
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={'/'} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={emailField}
                onChange={(event) => setEmailField(event.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={passwordField}
                onChange={(event) => setPasswordField(event.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={'/'} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
