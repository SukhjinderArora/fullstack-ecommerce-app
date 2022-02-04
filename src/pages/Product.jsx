import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus } from 'react-feather';

import PrimaryButton from '../components/shared/PrimaryButton';
import Carousel from '../components/Carousel';
import ProductView from '../components/Product';
import Spinner from '../components/shared/SpinnerRect';

import { fetchProduct, clearProduct } from '../store/productSlice';
import { fetchProducts, clearProducts } from '../store/productsSlice';

import { checkIfEmpty } from '../utils/index';

const Product = () => {
  const params = useParams();
  const id = Number(params.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.product);
  const { products: relatedProducts } = useSelector((state) => state.products);
  const { title, img, price, description, sizes, category, colors } = product;

  useEffect(() => {
    dispatch(
      fetchProduct({
        id,
      })
    );
    return () => {
      dispatch(clearProduct());
      dispatch(clearProducts());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (category) {
      dispatch(
        fetchProducts({
          category,
          limit: 10,
        })
      );
    }
  }, [category, dispatch, id]);

  if (status === 'loading' || checkIfEmpty(product)) return <Spinner />;

  return (
    <Container>
      <ProductContainer>
        <ImagesContainer>
          <Thumbnails>
            <ThumbnailContainer selected>
              <Thumbnail src={img} />
            </ThumbnailContainer>
          </Thumbnails>
          <ImageContainer>
            <Image src={img} />
          </ImageContainer>
        </ImagesContainer>
        <ProductInfoContainer>
          <Title>{title}</Title>
          <PriceContainer>
            <NewPrice>INR {price}</NewPrice>
          </PriceContainer>
          <SizeLabel>Size:</SizeLabel>
          <SizesContainer>
            {sizes.map((size) => (
              <SizeBox key={size.id}>{size.size.toUpperCase()}</SizeBox>
            ))}
          </SizesContainer>
          <ColorLabel>Color:</ColorLabel>
          <ColorsContainer>
            {colors.map((color) => (
              <Color
                key={color.id}
                color={color.color}
                active={color.id === id}
                onClick={() =>
                  navigate(`/product/${color.id}`, { replace: true })
                }
              />
            ))}
          </ColorsContainer>
          <QuantityContainer>
            <QuantityLabel>Qty:</QuantityLabel>
            <QuantityBox>
              <DecreaseQtyButton>
                <Minus />
              </DecreaseQtyButton>
              <Quantity value={1} />
              <IncreaseQtyButton>
                <Plus />
              </IncreaseQtyButton>
            </QuantityBox>
          </QuantityContainer>
          <ProductButtonsContainer>
            <AddToCartButton>Add to Cart</AddToCartButton>
            <BuyNowButton>Buy Now</BuyNowButton>
          </ProductButtonsContainer>
        </ProductInfoContainer>
      </ProductContainer>
      <DescriptionContainer>
        <p>DESCRIPTION</p>
        <p>{description}</p>
      </DescriptionContainer>
      <Section>
        <SectionTitle>Related Products</SectionTitle>
        <Carousel>
          {relatedProducts.map(
            (p) =>
              p.id !== id && (
                <div
                  key={p.id}
                  style={{
                    margin: '0 20px',
                  }}
                >
                  <ProductView
                    title={p.title}
                    img={p.img}
                    priceNew={p.price}
                    priceOld={p.price}
                    id={p.id}
                  />
                </div>
              )
          )}
        </Carousel>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 50px 20px;
`;

const ProductContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ImagesContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
`;

const Thumbnails = styled.div``;

const ThumbnailContainer = styled.div`
  border: 2px solid ${(props) => (props.selected ? 'teal' : 'transparent')};
  display: flex;
  width: 100px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 450px;
`;

const ProductInfoContainer = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 300;
  color: rgb(27, 40, 57);
  text-transform: uppercase;
`;

const PriceContainer = styled.div`
  margin: 10px 0;
`;

const NewPrice = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: teal;
  margin-right: 10px;
`;

const OldPrice = styled.del`
  font-weight: 500;
  color: grey;
  font-size: 18px;
`;

const SizeLabel = styled.span`
  font-size: 18px;
`;

const SizesContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

const SizeBox = styled.div`
  min-width: 50px;
  height: 50px;
  padding: 10px;
  border: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
`;

const ColorsContainer = styled.div`
  margin: 20px 0;
`;

const ColorLabel = styled.p`
  font-size: 18px;
`;

const Color = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 3px solid ${(props) => (props.active ? 'teal' : '#ccc')};
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const QuantityLabel = styled.span`
  font-size: 18px;
`;

const QuantityBox = styled.div`
  display: flex;
  margin-left: 10px;
`;

const DecreaseQtyButton = styled.button`
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid grey;
`;

const Quantity = styled.input`
  width: 50px;
  height: 30px;
  font-size: 18px;
  padding: 5px;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  margin: 0 8px;
`;

const IncreaseQtyButton = styled.button`
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid grey;
`;

const ProductButtonsContainer = styled.div``;

const AddToCartButton = styled(PrimaryButton)`
  font-size: 18px;
  padding: 10px 15px;
  display: inline-block;
  margin-right: 20px;
  border: 1px solid transparent;
`;

const BuyNowButton = styled(PrimaryButton)`
  font-size: 18px;
  padding: 10px 15px;
  color: teal;
  background: white;
  border: 1px solid teal;
`;

const DescriptionContainer = styled.div`
  color: #262626;
  border: 1px solid #cfcfcf;
  padding: 20px;

  & p {
    margin-bottom: 30px;
  }

  & p br {
    display: block;
    content: '';
    margin-bottom: 10px;
  }
`;

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

export default Product;
