import { useEffect } from 'react';
import styled from 'styled-components';

import Slider from '../components/Slider';
import Carousel from '../components/Carousel';
import Category from '../components/Category';
import FeaturedCategory from '../components/FeaturedCategory';
import ProductList from '../components/ProductList';
import PrimaryButton from '../components/shared/PrimaryButton';

import { newProducts, bestSellerProducts } from '../dummyData';

const Home = () => {
  useEffect(() => {
    document.title = 'Fashionista - Home';
  }, []);
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
      <Section>
        <SectionTitle>Shop By Category</SectionTitle>
        <Carousel>
          <Category
            name="Men's Shirt"
            imgUrl="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/7rh3LdvutCNGiaa8YeofXCPuNDQbu27XhCjIPjdrdGsr1OcKUAkLddEopWHC4iK9EUMpSyNR6Ch1628846506.jpg"
          />
          <Category
            name="Men's T-Shirt"
            imgUrl="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/Ah92XX7NsepbmzG43OIVJkNmOoMnVc5UxtCZHPxnGA4RLlPr3bxJsLHCynTw7SvoYdC9Q4hWD5d1628846522.jpg"
          />
          <Category
            name="Hoodies"
            imgUrl="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/dA07uUpUJPuLVixYOeJiddsbe0iRbEc5tR0m7nuhcU50XL0JuijEI5Ni6lSrPPgqmeTrElquOJH1628846538.jpg"
          />
          <Category
            name="Women's Night Suit"
            imgUrl="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/3WsOhHu7x7JChKhjyFpFovSq5jYDYDIKDkHJNmmKXuA1DmObcDEgXP8a9MxyKC3AQhWFLFa8iMx1628846553.jpg"
          />
          <Category
            name="Saree"
            imgUrl="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/category_images/QHmCjDkpJlaDM2txW8Fv3RWt1CUfKgd9lCE55F7xtp4pCNLVwspJzjbkogBcQSKeATMKjWjM5bI1628846595.jpg"
          />
          <Category
            name="Lehenga"
            imgUrl="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/product_images/1628849256.2.png"
          />
          <Category
            name="Men's Jackets & Cardigans"
            imgUrl="https://webmerx.sgp1.cdn.digitaloceanspaces.com/funkytrend/product_images/1638783960.17.jpg"
          />
        </Carousel>
      </Section>
      <Section>
        <SectionTitle>Popular Categories</SectionTitle>
        <FeaturedCategory
          categoryName="Men's shirt"
          description="NEW LAUNCHES EVERY DAY, STYLES THAT PROMISE TO CAPTURE YOUR HEART"
          imgUrl="https://funkytrend.in/themes/oxygen/assets/images/side-l-1.jpg"
          imagePosition="right"
        />
        <FeaturedCategory
          categoryName="MEN'S T-SHIRT"
          description="EXPLORE A SECTION OF BREEZY FLUID SILHOUETTES TO FLATTER YOUR BODY"
          imgUrl="https://funkytrend.in/themes/oxygen/assets/images/side-s-2.jpg"
          imagePosition="left"
        />
        <FeaturedCategory
          categoryName="HOODIES"
          description="FROM EVERYDAY CLASSICS TO FESTIVE OCCASIONWEAR, THESE ARE WARDROBE STAPLES FOR A REASON"
          imgUrl="https://funkytrend.in/themes/oxygen/assets/images/side-s-3.jpg"
          imagePosition="right"
        />
        <FeaturedCategory
          categoryName="WOMEN'S NIGHT SUIT"
          description="A CURATION OF VIVID ENSEMBLES LADEN WITH SPARKLES AND BRIGHT COLORS"
          imgUrl="https://funkytrend.in/themes/oxygen/assets/images/side-s-4.jpg"
          imagePosition="left"
        />
      </Section>
      <Section>
        <SectionTitle>New Arrivals</SectionTitle>
        <ProductList products={newProducts} />
        <ShowMoreButton>Show more</ShowMoreButton>
      </Section>
      <Section>
        <SectionTitle>Best Seller</SectionTitle>
        <ProductList products={bestSellerProducts} />
        <ShowMoreButton>Show more</ShowMoreButton>
      </Section>
    </Container>
  );
};

const Container = styled.div``;

const Section = styled.div`
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

const ShowMoreButton = styled(PrimaryButton)`
  display: block;
  margin: 0 auto;
`;

export default Home;
