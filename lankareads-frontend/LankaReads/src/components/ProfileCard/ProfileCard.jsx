import React from 'react';
import './ProfileCard.css';
import ProPic from '../../img/PP.png';

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card-container">
      <div className="profile-card-inner">
        {/* <div className="profile-pic-container">
          <img src={ProPic} className="profile-pic" alt="User" />
        </div> */}
        <div className="profile-info">
          <div className="profile-card-body">
            {user ? (
              <>
                <h5 className="profile-card-title">Hi, {user.name}</h5>
                <p className="profile-card-text">{user.email}</p>
              </>
            ) : (
              <>
                <h5 className="profile-card-title">Hi, User</h5>
                <p className="profile-card-text">Example@gmail.com</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
