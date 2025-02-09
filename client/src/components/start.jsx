import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Start() {
    const navigate = useNavigate();

    return (
        <div
            className="video-container"
            onClick={() => navigate('/chapter-zero')}
        >
            <video
                className="background-video"
                autoPlay
                loop
                muted
            >
                <source src="/mp4/start.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Start;