import styled from 'styled-components';

import Slider from '../components/Slider';
import Carousel from '../components/Carousel';

const Container = styled.div``;

const CategoriesSection = styled.div`
  padding: 0 20px;
  margin: 40px 0;
`;

const SectionTitle = styled.h1`
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
  color: rgb(27, 40, 57);
  margin-bottom: 40px;
`;

const CategoryContainer = styled.div`
  display: block;
  margin-right: 30px;
`;

const CategoryImageContainer = styled.div`
  width: 300px;
  height: 360px;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CategoryName = styled.h3`
  color: rgb(27, 40, 57);
  text-align: center;
  text-transform: uppercase;
  margin-top: 5px;
`;

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
      <CategoriesSection>
        <SectionTitle>Shop By Category</SectionTitle>
        <Carousel>
          <CategoryContainer>
            <CategoryImageContainer>
              <CategoryImage src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/7rh3LdvutCNGiaa8YeofXCPuNDQbu27XhCjIPjdrdGsr1OcKUAkLddEopWHC4iK9EUMpSyNR6Ch1628846506.jpg" />
            </CategoryImageContainer>
            <CategoryName>Men&apos;s Shirt</CategoryName>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryImageContainer>
              <CategoryImage src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/Ah92XX7NsepbmzG43OIVJkNmOoMnVc5UxtCZHPxnGA4RLlPr3bxJsLHCynTw7SvoYdC9Q4hWD5d1628846522.jpg" />
            </CategoryImageContainer>
            <CategoryName>Men&apos;s T-Shirt</CategoryName>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryImageContainer>
              <CategoryImage src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/dA07uUpUJPuLVixYOeJiddsbe0iRbEc5tR0m7nuhcU50XL0JuijEI5Ni6lSrPPgqmeTrElquOJH1628846538.jpg" />
            </CategoryImageContainer>
            <CategoryName>Hoodies</CategoryName>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryImageContainer>
              <CategoryImage src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/3WsOhHu7x7JChKhjyFpFovSq5jYDYDIKDkHJNmmKXuA1DmObcDEgXP8a9MxyKC3AQhWFLFa8iMx1628846553.jpg" />
            </CategoryImageContainer>
            <CategoryName>Women&apos;s Night Suit</CategoryName>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryImageContainer>
              <CategoryImage src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/QHmCjDkpJlaDM2txW8Fv3RWt1CUfKgd9lCE55F7xtp4pCNLVwspJzjbkogBcQSKeATMKjWjM5bI1628846595.jpg" />
            </CategoryImageContainer>
            <CategoryName>Saree</CategoryName>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryImageContainer>
              <CategoryImage src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/product_images/1628849256.2.png" />
            </CategoryImageContainer>
            <CategoryName>Lehenga</CategoryName>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryImageContainer>
              <CategoryImage src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/product_images/1638783960.17.jpg" />
            </CategoryImageContainer>
            <CategoryName>Men&apos;s Jackets & Cardigans</CategoryName>
          </CategoryContainer>
        </Carousel>
      </CategoriesSection>
    </Container>
  );
};

export default Home;
