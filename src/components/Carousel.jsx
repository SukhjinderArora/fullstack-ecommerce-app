import { useCallback, useEffect, useRef, useState, Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ArrowButton from './shared/ArrowButton';

const Container = styled.div`
  overflow: hidden;
  position: relative;
`;

const CarouselContainer = styled.div`
  display: flex;
  transform: translateX(
    ${(props) => props.itemWidth * props.currentItemIndexAtLeft * -1}px
  );
  transition: all 0.5s ease-in-out;
`;

const CarouselItem = styled.div``;

const Carousel = ({ children }) => {
  const [carouselItemWidth, setCarouselItemWidth] = useState(0);
  const [currentItemIndexAtLeft, setCurrentItemIndexAtLeft] = useState(0);
  const [isLastItemInViewport, setIsLastItemInViewport] = useState(false);
  const totalItems = Children.count(children);

  const itemRef = useCallback((node) => {
    if (node !== null) {
      setCarouselItemWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const lastElementIsInViewPort =
      totalItems * carouselItemWidth -
        carouselItemWidth * currentItemIndexAtLeft <=
      containerRect.right;
    setIsLastItemInViewport(lastElementIsInViewPort);
  }, [currentItemIndexAtLeft, carouselItemWidth, totalItems]);

  const carouselButtonHandler = (position) => {
    if (position === 'right') {
      setCurrentItemIndexAtLeft((prevIndex) => {
        if (isLastItemInViewport) {
          return 0;
        }
        return prevIndex + 1;
      });
      if (isLastItemInViewport) {
        setIsLastItemInViewport(false);
      }
    } else {
      setCurrentItemIndexAtLeft((prevIndex) => {
        if (prevIndex === 0) {
          return prevIndex;
        }
        return prevIndex - 1;
      });
    }
  };

  return (
    <Container ref={containerRef}>
      <CarouselContainer
        itemWidth={carouselItemWidth}
        totalItems={totalItems}
        currentItemIndexAtLeft={currentItemIndexAtLeft}
      >
        {Children.map(children, (child, index) => (
          <CarouselItem ref={index === 0 ? itemRef : null}>
            {child}
          </CarouselItem>
        ))}
      </CarouselContainer>
      <ArrowButton
        position="left"
        clickHandler={() => carouselButtonHandler('left')}
      />
      <ArrowButton
        position="right"
        clickHandler={() => carouselButtonHandler('right')}
      />
    </Container>
  );
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export default Carousel;
