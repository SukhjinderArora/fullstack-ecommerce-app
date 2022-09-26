import styled, { keyframes } from 'styled-components';

const stretchdelay = keyframes`
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Rect = styled.div`
  background-color: teal;
  height: 100%;
  width: 6px;
  margin: 0 3px 0 0;
  display: inline-block;
  animation: ${stretchdelay} 1.2s infinite ease-in-out;
`;

const Rect1 = styled(Rect)``;

const Rect2 = styled(Rect)`
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
`;

const Rect3 = styled(Rect)`
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
`;

const Rect4 = styled(Rect)`
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
`;

const Rect5 = styled(Rect)`
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
`;

const SpinnerRect = () => {
  return (
    <SpinnerContainer>
      <Spinner>
        <Rect1 />
        <Rect2 />
        <Rect3 />
        <Rect4 />
        <Rect5 />
      </Spinner>
    </SpinnerContainer>
  );
};

export default SpinnerRect;
