import styled from 'styled-components';

import Slider from '../components/Slider';

const Container = styled.div``;

const Home = () => {
  return (
    <Container>
      <Slider slideIntervalInSeconds={5}>
        <img
          src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/banner_images/1628935453.TROPICAL%20BANNNER.jpg"
          alt=""
        />
        <img
          src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/banner_images/1629362689.night%20suit%20banner.jpg"
          alt=""
        />
      </Slider>
    </Container>
  );
};

export default Home;
