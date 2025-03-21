import React, { useState } from 'react';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { NavLink, useLocation } from 'react-router-dom';

import css from './HeroSection.module.css';
import Find from '../Find/Find';
import FlightResults from '../FlightResults/FlightResults';
import light_1 from 'images/light_1.png';
import hero_1x from 'images/hero_1x.png';
import hero_2x from 'images/hero_2x.png';
import hero_1x_webp from 'images/hero_1x.webp';
import hero_2x_webp from 'images/hero_2x.webp';
import image_top from 'images/image_top.png';

const HeroSection = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const dispatch = useDispatch();

  return (
    <div>
      <section className={css.section1}>
        <img className={css.image_top} src={image_top} alt="image_top" />
        <img className={css.light_1} src={light_1} alt="light" />
        <div className={css.heroContainer}>
          <div className={css.aboutHero}>
            <h1 className={css.hero}>Immerse Yourself in Virtual Reality</h1>
            <p className={css.about}>
              Experience Unforgettable Events in VR. Bring your events to life
              like never before with our VR services
            </p>
            <NavLink
              to="/"
              className={`${currentPath === '/' ? css.active : css.discover}`}
            >
              discover more
            </NavLink>
            <Find />
            <FlightResults />
          </div>

          <div>
            <picture className={css.picture}>
              <source
                srcSet={`${hero_1x_webp} 1x, ${hero_2x_webp} 2x`}
                type="image/webp"
              />

              <source
                srcSet={`${hero_1x} 1x, ${hero_2x} 2x`}
                media="(min-width:1158px)"
              />

              <img className={css.hero} src={hero_1x} alt="hero" />
            </picture>
          </div>
        </div>
        <svg
          width="1097"
          height="721"
          viewBox="0 0 1097 721"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.2"
            d="M-88.1929 0L1408.61 728.783"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-176.241 42.8691L1320.57 771.652"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-264.289 85.7393L1232.52 814.522"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-352.336 128.608L1144.47 857.391"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-440.383 171.479L1056.42 900.261"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-528.43 214.348L968.377 943.13"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-616.478 257.218L880.33 986.001"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-704.526 300.087L792.281 1028.87"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-792.574 342.957L704.234 1071.74"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-880.62 385.826L616.187 1114.61"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-968.668 428.695L528.139 1157.48"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-1056.71 471.565L440.093 1200.35"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-1144.76 514.435L352.045 1243.22"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-1232.81 557.305L263.996 1286.09"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-1320.86 600.174L175.949 1328.96"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-1408.91 643.044L87.9019 1371.83"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M-1496.95 685.913L-0.145237 1414.7"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M87.9022 85.7393L-1408.91 814.522"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M175.949 128.608L-1320.86 857.391"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M263.997 171.479L-1232.81 900.261"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M352.045 214.348L-1144.76 943.13"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M440.092 257.218L-1056.72 986.001"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M528.139 300.087L-968.668 1028.87"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M616.187 342.957L-880.621 1071.74"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M704.217 385.826L-792.59 1114.61"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M792.265 428.695L-704.543 1157.48"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M880.312 471.565L-616.496 1200.35"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M968.359 514.435L-528.448 1243.22"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M1056.41 557.305L-440.401 1286.09"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M1144.45 600.174L-352.353 1328.96"
            stroke="white"
            stroke-opacity="0.4"
          />
          <path
            opacity="0.2"
            d="M1232.5 643.044L-264.306 1371.83"
            stroke="white"
            stroke-opacity="0.4"
          />
        </svg>
      </section>

      <section className={css.section3}>Section 3 Content</section>
    </div>
  );
};

export default HeroSection;
