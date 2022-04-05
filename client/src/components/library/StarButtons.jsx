import React, {useState} from 'react';
import styled from 'styled-components';

const Star = styled.button`
  font-size: ${props => props.fontSize}px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => props.className === 'on' ? '#000' : '#ccc'}
`;

const StarButtons = function({fontSize}) {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-buttons">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Star
            type="button"
            key={index}
            fontSize={fontSize}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </Star>
        );
      })}
    </div>
  );
};

export default StarButtons;