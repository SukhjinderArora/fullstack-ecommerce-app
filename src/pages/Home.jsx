import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Slider from '../components/Slider';
import Carousel from '../components/Carousel';
import Category from '../components/Category';
import FeaturedCategory from '../components/FeaturedCategory';
import ProductList from '../components/ProductList';
import PrimaryButton from '../components/shared/PrimaryButton';

import usePageTitle from '../hooks/usePageTitle';
import { fetchAllCategories } from '../store/categoriesSlice';

const Home = () => {
  usePageTitle('Fashionista - Home');
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    axios
      .get('/api/shop/products', {
        params: {
          offset: 0,
          limit: 4,
          sortBy: 'date',
          orderBy: 'desc',
        },
      })
      .then((response) => {
        setNewProducts(response.data.products);
      });

    axios
      .get('/api/shop/products', {
        params: {
          offset: 0,
          limit: 4,
          sortBy: 'price',
          orderBy: 'desc',
        },
      })
      .then((response) => {
        setBestSellerProducts(response.data.products);
      });
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
          imgUrl="https://firebasestorage.googleapis.com/v0/b/ecommerce-app-d78cc.appspot.com/o/side-l-1.jpg?alt=media&token=b3722265-0558-4cca-ba60-36cdc61a6a16"
          categoryUrl="/products/mens-shirt"
          imagePosition="right"
        />
        <FeaturedCategory
          categoryName="MEN'S T-SHIRT"
          description="EXPLORE A SECTION OF BREEZY FLUID SILHOUETTES TO FLATTER YOUR BODY"
          imgUrl="https://firebasestorage.googleapis.com/v0/b/ecommerce-app-d78cc.appspot.com/o/side-s-2.jpg?alt=media&token=f64b43d2-6da6-4853-aa61-fce2450a9afc"
          categoryUrl="/products/mens-t-shirt"
          imagePosition="left"
        />
        <FeaturedCategory
          categoryName="HOODIES"
          description="FROM EVERYDAY CLASSICS TO FESTIVE OCCASIONWEAR, THESE ARE WARDROBE STAPLES FOR A REASON"
          imgUrl="https://firebasestorage.googleapis.com/v0/b/ecommerce-app-d78cc.appspot.com/o/side-s-3.jpg?alt=media&token=b927cee4-92ed-4dc1-93b0-b99cc1f3d29b"
          categoryUrl="/products/hoodies"
          imagePosition="right"
        />
        <FeaturedCategory
          categoryName="WOMEN'S NIGHT SUIT"
          description="A CURATION OF VIVID ENSEMBLES LADEN WITH SPARKLES AND BRIGHT COLORS"
          imgUrl="https://firebasestorage.googleapis.com/v0/b/ecommerce-app-d78cc.appspot.com/o/side-s-4.jpg?alt=media&token=8cd44a71-e6ab-4766-8881-919ccf099637"
          categoryUrl="/products/womens-night-suit"
          imagePosition="left"
        />
      </Section>
      <Section>
        <SectionTitle>New Arrivals</SectionTitle>
        <ProductList products={newProducts} />
        <ShowMoreButton to="/products">Show more</ShowMoreButton>
      </Section>
      <Section>
        <SectionTitle>Best Seller</SectionTitle>
        <ProductList products={bestSellerProducts} />
        <ShowMoreButton to="/products">Show more</ShowMoreButton>
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

const ShowMoreButton = styled(Link)`
  display: block;
  margin: 0 auto;
  background-color: teal;
  border: none;
  color: white;
  padding: 15px 20px;
  font-size: 16px;
  text-transform: uppercase;
  text-decoration: none;
  width: fit-content;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Home;
