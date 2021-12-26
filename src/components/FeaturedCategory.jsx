import { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';

import useInView from '../hooks/useInView';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) =>
    props.position === 'left' ? 'row' : 'row-reverse'};
  overflow: hidden;
  min-height: 500px;
  margin: 50px 0;
`;

const ImageContainer = styled(motion.div)`
  flex: 1;
  text-align: ${(props) => (props.position === 'left' ? 'right' : 'left')};
`;

const Image = styled.img`
  width: 400px;
`;

const ContentContainer = styled.div`
  margin: 0 20px;
  padding: 0 20px;
  flex: 1;
  text-align: ${(props) => props.position};
`;

const Title = styled.h1`
  font-size: 64px;
  color: #444;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 20px;
  color: #444;
  margin-bottom: 12px;
`;

const ShowMoreButton = styled.button`
  background-color: teal;
  border: none;
  color: white;
  padding: 15px 20px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
`;

const FeaturedCategory = ({
  categoryName,
  description,
  imgUrl,
  categoryUrl,
  imagePosition,
}) => {
  const { inView, ref } = useInView({
    threshold: 0.05,
  });
  const animationControl = useAnimation();
  const imageVariant = {
    hidden: {
      opacity: 0,
      x: imagePosition === 'right' ? '200px' : '-200px',
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        duration: 2,
        ease: 'easeOut',
      },
    },
  };
  useEffect(() => {
    if (inView) {
      animationControl.start('visible');
    }
  }, [inView, animationControl]);
  return (
    <Container position={imagePosition} ref={ref}>
      {inView && (
        <ImageContainer
          position={imagePosition}
          variants={imageVariant}
          initial="hidden"
          animate={animationControl}
        >
          <Image src={imgUrl} />
        </ImageContainer>
      )}
      <ContentContainer position={imagePosition}>
        <Title>{categoryName}</Title>
        <Description>{description}</Description>
        <ShowMoreButton>Show More</ShowMoreButton>
      </ContentContainer>
    </Container>
  );
};

FeaturedCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  categoryUrl: PropTypes.string.isRequired,
  imagePosition: PropTypes.string.isRequired,
};

export default FeaturedCategory;
