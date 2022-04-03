import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx';

const CaroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CaroWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const ContentStyle = styled.div`
  display: flex;
  transition: all 250ms linear;
  width: 50%;
  flex-shrink: 0;
  flex-grow: 1;
`;

const Arrow = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
`;

// class Carousel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       children: [],
//       currentIndex: 0
//     }
//     this.nextButton = this.nextButton.bind(this);
//     this.backButton = this.backButton.bind(this);
//   }
//   nextButton() {
//     if (this.state.currentIndex < (this.state.children.length - 1)) {
//       this.setState({
//         currentIndex: this.state.currentIndex + 1
//       });
//     }
//   };
//   backButton() {
//     if (this.state.currentIndex > 0) {
//       this.setState({
//         currentIndex: this.state.currentIndex - 1
//       });
//     }
//   };
//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       children: nextProps.children
//     })
//   }
//   render() {
//     return (
//       <CaroContainer>
//         <CaroWrapper>
//           <Arrow style={{left: '24px'}} onClick={this.backButton}> &lt; </Arrow>
//           <ContentWrapper>
//             <ContentStyle style={{transform: `translateX(-${this.state.currentIndex * 100}%)`}}>
//               {this.state.children}
//             </ContentStyle>
//           </ContentWrapper>
//           <Arrow style={{right: '24px'}} onClick={this.nextButton}> &gt; </Arrow>
//         </CaroWrapper>
//       </CaroContainer>
//     );
//   }
// }
const Carousel = (props) => {
  const { products } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextButton = () => {
    if (currentIndex < (products.length - 2)) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const backButton = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <CaroContainer>
      <CaroWrapper>
        <Arrow style={{left: '24px'}} onClick={backButton}> &lt; </Arrow>
        <ContentWrapper>
          {products.map(product =>
            <ContentStyle style={{transform: `translateX(-${currentIndex * (100)}%)`}}>
              <RelatedCard product={product} key={product.id} />
            </ContentStyle>
          )}
        </ContentWrapper>
        <Arrow style={{right: '24px'}} onClick={nextButton}> &gt; </Arrow>
      </CaroWrapper>
    </CaroContainer>
  );
};

export default Carousel;
