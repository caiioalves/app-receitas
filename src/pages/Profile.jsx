import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile(props) {
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header { ...props } />
      { userLocalStorage ? (
        <h2 data-testid="profile-email">{ userLocalStorage.email }</h2>
      ) : null }
      <button
        type="button"
        data-testid="profile-done-btn"
        className="profile-buttons"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        className="profile-buttons"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      {' '}
      <button
        type="button"
        data-testid="profile-logout-btn"
        className="profile-buttons"
        onClick={ () => { clearLocalStorage(); history.push('/'); } }
      >
        Logout
      </button>
      <Footer />
    </div>);
}

export default Profile;
