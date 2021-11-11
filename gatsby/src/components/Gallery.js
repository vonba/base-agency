import React, { useState } from 'react';
import StyImage from './StyImage.js';
import styled from 'styled-components';
import '../styles/slick.css';
import Slider from 'react-slick';
import arrowLeft from '../images/Icon_Arrow_Left_White.svg';
import arrowRight from '../images/Icon_Arrow_Right_White.svg';
// import expand from '../assets/images/expand-peach.svg';
import close from '../images/close.svg';

const GalleryStyles = styled.div`
  position: relative;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);

  .galleryImage {
    cursor: pointer;

    img {
      // TODO: possible to instead of completely hiding preview image
      // instead do some positioning to force browser to lazy load the real image?
      /* &[data-loading] {
        position: relative;
        bottom: -20px;
      } */

      &:not([loading]) {
        display: none;
      }
    }
  }

  .toggleExpanded {
    display: none;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    background: var(--black) url(${close}) no-repeat right top;
    background-size: contain;
    border: none;
    text-indent: -9999px;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    transition: all 0.5s;
    outline: none;
    border-radius: 0;
  }

  /* Slick styles */
  .slick-slide {
    div {
      height: 100%;
      width: 100%;
    }
  }
  .slick-arrow {
    position: absolute;
    top: calc(100% - 2rem);
    z-index: 1;
    background-color: var(--black);
    background-repeat: no-repeat;
    background-size: contain;
    border: none;
    text-indent: -999em;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    transition: all 0.5s;
    outline: none;

    &:hover {
      transition: all 0.5s;
    }
  }

  .slick-prev {
    left: -1rem;
    background-image: url(${arrowLeft});
  }

  .slick-next {
    right: -1rem;
    background-image: url(${arrowRight});
  }

  &.expanded {
    margin-bottom: 100vh; // To avoid losing scroll position

    .toggleExpanded {
      position: fixed;
      display: block;
      z-index: 10;
      background-image: url(${close});
    }

    .slick-arrow {
      z-index: 10;
      top: calc(50% - 1rem);
    }

    .slick-prev {
      left: 0;
    }

    .slick-next {
      right: 0;
    }

    .slick-slider {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: black;
      z-index: 5;

      div {
        height: 100%;
        width: 100%;
      }

      .galleryImage {
        cursor: initial;
        
        img {
          transition: all 0.5s;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .slick-initialized .slick-slide {
    max-height: 80vh;
  }

  &.expanded {
    .slick-initialized .slick-slide {
      max-height: unset;
    }
  }
`;

const HandleToggleExpanded = (expanded, setExpanded) => {
  if (expanded) {
    document.body.classList.remove('expanded');
  } else {
    document.body.classList.add('expanded');
  }
  setExpanded(!expanded);
};

export default function Gallery({
  images,
  className,
  imageMaxWidth,
  autoplay = false,
  arrows = true,
}) {
  const [expanded, setExpanded] = useState(false);
  if (!images) return null;

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: !!autoplay,
    arrows: !!arrows,
  };

  return (
    <GalleryStyles className={expanded ? `${className} expanded` : className}>
      <Slider {...settings}>
        {images.map((image) => {
          return <StyImage 
            key={image.asset._id}
            className="galleryImage"
            sanityImage={image} 
            alt="Gallery image"
            width={1400}
            height={800}
            onClick={() => {if (!expanded) HandleToggleExpanded(expanded, setExpanded)}}
          />        
        })}
      </Slider>
      
      {arrows && (
        <button
          type="button"
          className="toggleExpanded"
          onClick={() => HandleToggleExpanded(expanded, setExpanded)}
        >
          {expanded ? 'Close' : 'Expand'}
        </button>
      )}

    </GalleryStyles>
  );
}
