import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Slider from '../components/Slider';
import Carousel from '../components/Carousel';
import Category from '../components/Category';
import FeaturedCategory from '../components/FeaturedCategory';
import ProductList from '../components/ProductList';
import PrimaryButton from '../components/shared/PrimaryButton';

import usePageTitle from '../hooks/usePageTitle';
import { fetchAllCategories } from '../store/categoriesSlice';

import { newProducts, bestSellerProducts } from '../dummyData';

const Home = () => {
  usePageTitle('Fashionista - Home');
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
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
          {categories.map(({ id, category, img, slug }) => (
            <StyledLink to={`/products/${slug}`} key={id}>
              <Category name={category} imgUrl={img} />
            </StyledLink>
          ))}
        </Carousel>
      </Section>
      <Section>
        <SectionTitle>Popular Categories</SectionTitle>
        <FeaturedCategory
          categoryName="MEN'S SHIRT"
          description="NEW LAUNCHES EVERY DAY, STYLES THAT PROMISE TO CAPTURE YOUR HEART"
          imgUrl="https://funkytrend.in/themes/oxygen/assets/images/side-l-1.jpg"
          categoryUrl="/products/mens-shirt"
          imagePosition="right"
        />
        <FeaturedCategory
          categoryName="MEN'S T-SHIRT"
          description="EXPLORE A SECTION OF BREEZY FLUID SILHOUETTES TO FLATTER YOUR BODY"
          imgUrl="https://funkytrend.in/themes/oxygen/assets/images/side-s-2.jpg"
          categoryUrl="/products/mens-t-shirt"
          imagePosition="left"
        />
        <FeaturedCategory
          categoryName="HOODIES"
          description="FROM EVERYDAY CLASSICS TO FESTIVE OCCASIONWEAR, THESE ARE WARDROBE STAPLES FOR A REASON"
          imgUrl="https://funkytrend.in/themes/oxygen/assets/images/side-s-3.jpg"
          categoryUrl="/products/hoodies"
          imagePosition="right"
        />
        <FeaturedCategory
          categoryName="WOMEN'S NIGHT SUIT"
          description="A CURATION OF VIVID ENSEMBLES LADEN WITH SPARKLES AND BRIGHT COLORS"
          imgUrl="https://funkytrend.in/themes/oxygen/assets/images/side-s-4.jpg"
          categoryUrl="/products/womens-night-suit"
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Home;
