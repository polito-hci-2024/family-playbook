import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/SelectActivity.css';

const SelectActivity = () => {
  const navigate = useNavigate();
  const activities = [
    { name: 'Painting', img: 'img/lumi_senzasfondo.png' },
    { name: 'Puzzle', img: 'img/lumi_senzasfondo.png' },
    { name: 'Reading', img: 'img/lumi_senzasfondo.png' },
  ];
  const [selectedActivity, setSelectedActivity] = useState(activities[0].name);
  const [showConfirm, setShowConfirm] = useState(false); 
  const [activityToNavigate, setActivityToNavigate] = useState('');

  const handleActivityChange = (direction) => {
    let currentIndex = activities.findIndex(activity => activity.name === selectedActivity);
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % activities.length;
    } else {
      currentIndex = (currentIndex - 1 + activities.length) % activities.length;
    }
    setSelectedActivity(activities[currentIndex].name);
  };

  const handlePuzzlePage = () => {
    navigate('/unexpected');
  };

  const handleActivityClick = (activityName) => { 
    setActivityToNavigate(activityName); 
    setShowConfirm(true); 
  };

  const handleConfirm = () => { 
    navigate(`/${activityToNavigate.toLowerCase()}`); 
  };

  const handleCancel = () => { 
    setShowConfirm(false); 
    setActivityToNavigate(''); 
  };

  return ( 
    <div className="container"> 
      <div className="header"> 
        <h1 className="title">The Challenges of the Enchanted Forest</h1> 
        <p className="subtitle"> <b>Welcome to the world of Eldora! In this magical realm, your mission is to help the fairy find her way home. Along the way, you'll encounter exciting challenges, discover hidden treasures, and unlock the secrets of Eldora.</b></p> 
      </div> 
    
      <br></br> <br></br>
      <h2 className="select-activity-title">Select Your Activity</h2>

      <div className="activity-selector"> 
        <button onClick={() => handleActivityChange('prev')}> 
          <img src="img/right-arrow.png" alt="Previous" /> 
        </button> 
        
        <div className="activity-details"> 
          <h2>{selectedActivity}</h2> 
          <img src={activities.find(activity => activity.name === selectedActivity).img} alt={selectedActivity} onClick={() => handleActivityClick(selectedActivity)} style={{ cursor: 'pointer' }}/> 
        </div> 
        
        <button onClick={() => handleActivityChange('next')}> 
          <img src="img/right-arrow.png" alt="Next" /> 
        </button> 
      </div> 
      
      <button className="puzzle-button" onClick={handlePuzzlePage}> 
        <img src="img/puzzle_senzasfondo.png" alt="Unexpected Page" /> 
      </button> 

      {showConfirm && ( 
        <div className="confirm-modal"> 
          <div className="confirm-modal-content"> 
            <p>Are you sure?</p> 
            <button onClick={handleConfirm}>Yes</button> 
            <button onClick={handleCancel}>No</button> 
          </div> 
        </div> 
      )}
    </div>
  );
};

export default SelectActivity;