import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeroSection from '../../components/HeroSection/HeroSection';
import css from './HomePage.module.css';

const HomePage = () => {
  const [randomColor1, setRandomColor1] = useState('');
  const [randomColor2, setRandomColor2] = useState('');

  useEffect(() => {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const colors = ['#3470ff', '#fc832c', '#54be96'];

    const randomIndex1 = getRandomInt(0, colors.length - 1);
    let randomIndex2 = getRandomInt(0, colors.length - 1);

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = getRandomInt(0, colors.length - 1);
    }

    const randomColor1 = colors[randomIndex1];
    const randomColor2 = colors[randomIndex2];
    setRandomColor1(randomColor1);
    setRandomColor2(randomColor2);
  }, []);

  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;

  console.log('Ширина екрану:', screenWidth);
  console.log('Висота екрану:', screenHeight);

  return (
    <div>
      <HeroSection />
    </div>
  );
};
export default HomePage;
