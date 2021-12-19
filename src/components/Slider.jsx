import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, Minus } from 'react-feather';

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  width: ${(props) => props.slidesCount * 100}vw;
  transform: translateX(${(props) => props.currentSlideIndex * -100}vw);
  transition: all 0.5s ease-in-out;
`;

const Slide = styled.div`
  height: 100%;
  background-color: ${(props) => props.bg};
  width: 100vw;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.position === 'left' && 0};
  right: ${(props) => props.position === 'right' && 0};
  cursor: pointer;
  background-color: white;
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 6px -3px #9a9a9a;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const SlideIndicatorContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const SlideIndicatorButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SlideIndicatorIcon = styled(Minus)`
  stroke: ${(props) => (props.active ? '#919090' : '#ccc')};
  transition: all 0.5s ease-in-out;
`;

const Slider = ({ items = [], slideIntervalInSeconds = 2 }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slidesCount = items.length;

  const intervalID = useRef(null);
  useEffect(() => {
    if (intervalID.current) {
      clearInterval(intervalID.current);
    }
    intervalID.current = setInterval(() => {
      setSlideIndex((prevIndex) => {
        if (prevIndex === slidesCount - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, slideIntervalInSeconds * 1000);
  }, [slideIndex, slideIntervalInSeconds, slidesCount]);

  const slideButtonHandler = (position) => {
    setSlideIndex((prevIndex) => {
      if (position === 'left') {
        if (prevIndex === 0) {
          return slidesCount - 1;
        }
        return prevIndex - 1;
      }
      if (position === 'right') {
        if (prevIndex === slidesCount - 1) {
          return 0;
        }
        return prevIndex + 1;
      }
      return 0;
    });
  };

  const slideIndicatorHandler = (index) => {
    setSlideIndex(index);
  };

  return (
    <Container>
      <SliderContainer slidesCount={slidesCount} currentSlideIndex={slideIndex}>
        {items.map((item) => (
          <Slide bg={item.color} key={item.color} />
        ))}
      </SliderContainer>
      <ArrowButton position="left" onClick={() => slideButtonHandler('left')}>
        <ChevronLeft stroke="#2c4152" />
      </ArrowButton>
      <ArrowButton position="right" onClick={() => slideButtonHandler('right')}>
        <ChevronRight stroke="#2c4152" />
      </ArrowButton>
      <SlideIndicatorContainer>
        {items.map((item, index) => (
          <SlideIndicatorButton
            key={item.color}
            onClick={() => slideIndicatorHandler(index)}
          >
            <SlideIndicatorIcon active={index === slideIndex} />
          </SlideIndicatorButton>
        ))}
      </SlideIndicatorContainer>
    </Container>
  );
};

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  slideIntervalInSeconds: PropTypes.number,
};

Slider.defaultProps = {
  slideIntervalInSeconds: 2,
};

export default Slider;
