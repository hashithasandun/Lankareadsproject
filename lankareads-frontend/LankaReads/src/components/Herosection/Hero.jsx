import React, { useState, useEffect, useContext } from 'react';
import './Hero.css';
import image1 from '../../img/Kutse.jpg';
import image3 from '../../img/wallpaper2.webp';
import image4 from '../../img/wallpaper1.jpg';
import CardSlider from '../CardSlider/CardSlider';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation in react-router-dom v6
import { LanguageContext } from '../../contexts/LanguageContext';

const images = [
  image1,
  image3,
  image4
];

const Hero = () => {
  const { t } = useContext(LanguageContext);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleReaderClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  const handleAuthorClick = () => {
    setShowAuthorModal(true);
  };

  const handleModalConfirm = () => {
    setShowAuthorModal(false);
    navigate('/author-request');
  };

  return (
    <div className="hero-container">
      <img src={images[currentImage]} alt="Hero" className="hero-image" />
      <div className="hero-overlay">
        <p className='welcome'>{t.welcome}</p>
        <p className='lanka'>{t.lankaReads}</p>
        <div className='hero-buttons-container'>
          <button className="reader-btn" onClick={handleReaderClick}>{t.beReader}</button>
          <button className="author-btn" onClick={handleAuthorClick}>{t.beAuthor}</button>
        </div>
        <p className='description'>
          {t.heroDescription}
        </p>
        <div className='card-slider-container'>
          <CardSlider />
        </div>
      </div>

      {showAuthorModal && (
        <div className="author-modal">
          <div className="modal-content">
            <p>{t.authorQuestion}</p>
            <button className="btn btn-success" onClick={handleModalConfirm}>{t.yes}</button>
            <button className="btn btn-danger" onClick={() => setShowAuthorModal(false)}>{t.no}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
