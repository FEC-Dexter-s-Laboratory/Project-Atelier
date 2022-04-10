import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChooseStyle = styled.div`
  display: grid;
  position: relative;
  margin-top: 5%;
`;

const ChooseStyleComponent = (props) => {
  let { styleResults, changeStyle, enterThumb, leaveThumb } = props;
  let styleResultsColCounter = 0;
  let styleResultsRowCounter = 1;
  let checkStyle = '';
  let checkStyleIndex = 0;

  useEffect(() => {
    // watch props
  }, [props]);

  return (
    <>
      <ChooseStyle>
        {
          styleResults.map((style, index) => {
            checkStyleIndex += 1;
            styleResultsColCounter += 1;
            if (styleResultsColCounter > 4) {
              styleResultsColCounter = 1;
              styleResultsRowCounter += 1;
            }
            if (index === 0) {
              checkStyle = 'block';
            } else {
              checkStyle = 'none';
            }
            return (
              <div key={style.style_id} style={{gridColumn: styleResultsColCounter, gridRow: styleResultsRowCounter, margin: '4%', position: 'relative', width: 'fit-content'}} onClick={(event) => changeStyle(style.style_id)} className={style.style_id}>
                <img className={style.style_id}
                  src={!style.photos[0].thumbnail_url ? 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' : style.photos[0].thumbnail_url}
                  style={{borderRadius: '50%', width: '80px', height: '80px'}}
                  onMouseEnter={enterThumb} onMouseLeave={leaveThumb} />
                <img src="https://media.istockphoto.com/vectors/check-vector-id871478670?b=1&k=20&m=871478670&s=170667a&w=0&h=z-dZAr0bn8-IlGirxjJjqJcATVZWsHHr8UgEKxl1gtg=" style={{position: 'absolute', top: '0', right: '0', width: '30px', height: '30px', zIndex: '30', borderRadius: '50%', display: checkStyle}} id={style.style_id} />
              </div>
            );
          })
        }
      </ChooseStyle>
    </>
  );
};

export default ChooseStyleComponent;