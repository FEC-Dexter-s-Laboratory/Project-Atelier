import React, {useState} from 'react';
import styled from 'styled-components';

const Star = styled.button`
  font-size: ${props => props.fontSize}px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => props.className === 'on' ? '#5d5d5d' : '#ccc'};
  text-shadow: ${props => props.className === 'on' ? '1px 1px 2px black' : 'none'};
`;

const StarButtons = function({fontSize, reportRating}) {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = function(index) {
    setRating(index);
    if (reportRating) {
      reportRating(index); // send back rating data to parent component
    }
  };

  return (
    <span className="star-buttons">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Star
            type="button"
            key={index}
            fontSize={fontSize}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </Star>
        );
      })}
    </span>
  );
};

export default StarButtons;