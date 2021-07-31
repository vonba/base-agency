import React from 'react';
import SanityImage from "gatsby-plugin-sanity-image"
import styled from "styled-components"

const ImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function StyImage({sanityImage, width, height, className, alt, onClick}) {
  return <ImageStyles className={className} onClick={onClick}>
    <SanityImage
      {...sanityImage}
      width={width}
      height={height}
      alt={alt}
    />
  </ImageStyles>
}