import React from 'react';
import styled from 'styled-components';

const CharsContainer = styled.div`
  grid-row-start: 3;
`;

const Characteristic = styled.span`
  display: grid;
  margin: 0% 10% 5% 0;
  &:first {
    margin-top: 0;
  }
`;

const SliderContainer = styled.div`
  grid-row-start: 2;
  position: relative;
  width: 100%;
  justify-self: center;
  background-color: #ddd;
  height: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px black;
  margin: 10px 0;
`;

const Slider = styled.span`
  position: absolute;
  text-align: center;
  vertical-align: middle;
  font-size: 25px;
  transform: translateX(-50%);
  transform: translateY(-10%);
  left: ${props => props.value * 100}%;
  color: #1151AB;
  text-shadow: 1px 1px 2px black;
`;

const CharLabels = styled.div`
  grid-row-start: 3;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  text-align: center;
  font-size: 12px;
  height: 40px;
`;

const Characteristics = function({ chars }) {

  const charLabels = {
    Size: ['runs small', 'true', 'runs big'],
    Width: ['narrow', 'standard', 'wide'],
    Comfort: ['less comfortable', 'comfortable', 'very comfortable'],
    Quality: ['poor', 'good', 'great'],
    Length: ['runs short', 'standard', 'runs long'],
    Fit: ['slim', 'standard', 'loose']
  };

  let charsArray = [];
  for (let char in chars) {
    if (chars[char].value !== null) {
      charsArray.push({
        name: char,
        value: chars[char].value,
        labels: charLabels[char]
      });
    }
  }

  return (
    <CharsContainer className="characteristics">
      {charsArray.map((char) => {
        return (
          <Characteristic key={char.name}>
            <strong style={{marginLeft: '10px'}}>{char.name}</strong>
            <SliderContainer>
              <Slider value={char.value / 5}>&#9660;</Slider>
            </SliderContainer>
            <CharLabels>
              <span>{char.labels[0]}</span>
              <span>{char.labels[1]}</span>
              <span>{char.labels[2]}</span>
            </CharLabels>
          </Characteristic>
        );
      })}
    </CharsContainer>
  );
};

export default Characteristics;
