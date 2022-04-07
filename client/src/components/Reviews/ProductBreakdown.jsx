import React from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  width: 200px;
  background-color: #ddd;
  height: 10px;
  font-family: Comfortaa
`;

const Slider = styled.span`
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  left: ${props => props.value * 100}%;
  font-family: Comfortaa
`;

const ProductBreakdown = function({ chars }) {

  let charArray = [];
  for (let char in chars) {
    if (chars[char].value !== null) {
      charArray.push({ char, value: chars[char].value });
    }
  }

  return (
    <div className="product-breakdown">
      {charArray.map((factor) => {
        return (
          <div key={factor.char}>
            <span>{factor.char}</span>
            <SliderContainer>
              <Slider value={factor.value / 5}>&#9660;</Slider>
            </SliderContainer>
          </div>
        );
      })}
    </div>
  );
};

export default ProductBreakdown;