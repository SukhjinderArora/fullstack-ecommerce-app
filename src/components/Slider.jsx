import { useEffect, useState, Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Minus } from 'react-feather';

import ArrowButton from './shared/ArrowButton';

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  width: ${(props) => props.slidesCount * 100}vw;
  transform: translateX(${(props) => props.currentSlideIndex * -100}vw);
  transition: all 0.6s ease-in-out;
`;

const Slide = styled.div`
  height: 100%;
  width: 100vw;
  & > * {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  stroke: ${(props) => (props.$active ? '#919090' : '#ccc')};
  transition: all 0.5s ease-in-out;
`;

const Slider = ({ children, slideIntervalInSeconds = 2 }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slidesCount = Children.count(children);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setSlideIndex((prevIndex) => {
        if (prevIndex === slidesCount - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, slideIntervalInSeconds * 1000);
    return () => clearInterval(intervalID);
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
        {Children.map(children, (child) => (
          <Slide>{child}</Slide>
        ))}
      </SliderContainer>
      <ArrowButton
        position="left"
        clickHandler={() => slideButtonHandler('left')}
      />
      <ArrowButton
        position="right"
        clickHandler={() => slideButtonHandler('right')}
      />
      <SlideIndicatorContainer>
        {Children.map(children, (child, index) => (
          <SlideIndicatorButton onClick={() => slideIndicatorHandler(index)}>
            <SlideIndicatorIcon $active={index === slideIndex} />
          </SlideIndicatorButton>
        ))}
      </SlideIndicatorContainer>
    </Container>
  );
};

Slider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  slideIntervalInSeconds: PropTypes.number,
};

Slider.defaultProps = {
  slideIntervalInSeconds: 2,
};

export default Slider;
