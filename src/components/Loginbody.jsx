import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthMutation, useGetProfileMutation } from '../rtk/ApiSlice';
import { setToken, setUser } from '../rtk/AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [auth, { isLoading: authIsLoading, isSuccess: authIsSuccess, data: authData, error: authError }] = useAuthMutation();
  const [getProfile, { data: profileData, isSuccess: profileIsSuccess }] = useGetProfileMutation();

  const handleLogin = () => {
    auth({ email, password });
  };

  useEffect(() => {
    if (authIsSuccess && authData) {
      dispatch(setToken(authData.body.token));
      getProfile();
    }
  }, [authIsSuccess, authData, dispatch, getProfile]);

  useEffect(() => {
    if (profileIsSuccess && profileData) {
        dispatch(setUser(profileData.body)); // Store user profile info in Redux
        //console.log(profileData.body);
        navigate('/profile');
      }
    }, [profileIsSuccess, profileData, dispatch, navigate]);

    return (
        <div className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="input-wrapper">
                        <label>Username</label>
                        <input type="text" id="email" placeholder="email@address.com" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <label>Password</label>
                        <input type="password" id="password" placeholder="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label>Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit" disabled={authIsLoading}>{authIsLoading ? 'Signing in...' : 'Sign in'}</button>
                </form>
                {authError && <p className='perror'>{authError.data.message.replace("Error: ", "")}</p>}
                {authIsSuccess && <p className='psuccess'>{authData.message}</p>}
                {/* <Link to="/profile">
                  {authIsSuccess && <button>Go to Profile Page</button>}
                </Link> */}
            </section>
        </div>
    );
}