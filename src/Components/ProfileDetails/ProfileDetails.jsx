import React from 'react';

const ProfileDetails = ({ userProfile }) => {
  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <p><strong>Name:</strong> {userProfile.name}</p>
      <p><strong>Email:</strong> {userProfile.email}</p>
    </div>
  );
};

export default ProfileDetails;
