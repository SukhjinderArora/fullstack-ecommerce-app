import styled from 'styled-components';

import Slider from '../components/Slider';

const Container = styled.div``;

const Home = () => {
  return (
    <Container>
      <Slider
        items={[{ color: 'wheat' }, { color: 'green' }, { color: 'blue' }]}
        slideIntervalInSeconds={2.5}
      />
    </Container>
  );
};

export default Home;
