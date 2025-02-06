import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../CSS/theEnd.css';

function TheEnd() {
    const [fadeOut, setFadeOut] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setFadeOut(true); 
        }, 3000);

        const navigateTimer = setTimeout(() => {
            navigate('/'); 
        }, 5000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(navigateTimer);
        };
    }, [navigate]);

    return (
        <motion.div
            className="video-container"
            initial={{ opacity: 1 }} 
            animate={{ opacity: fadeOut ? 0 : 1 }}
            transition={{ duration: 2 }} 
        >
            <video
                className="background-video"
                autoPlay
                loop
                muted
            >
                <source src="/mp4/theEnd.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </motion.div>
    );
}

export default TheEnd;

