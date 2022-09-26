import { useEffect, useState, lazy } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Minus, Plus } from 'react-feather';

import PrimaryButton from '../components/shared/PrimaryButton';
import Carousel from '../components/Carousel';
import ProductView from '../components/Product';
import Spinner from '../components/shared/SpinnerRect';
import SpinnerCircle from '../components/shared/SpinnerCircle';

import PageNotFound from './PageNotFound';

import { fetchProduct, clearProduct } from '../store/productSlice';
import { fetchProducts, clearProducts } from '../store/productsSlice';
import { addProductToCart } from '../store/cartSlice';

import { checkIfEmpty } from '../utils/index';
import device from '../utils/device';

const Product = () => {
  const params = useParams();
  const id = Number(params.id);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.product);
  const { products: relatedProducts } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { title, img, price, description, sizes, category, colors } = product;

  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [navigateToCart, setNavigateToCart] = useState(false);

  useEffect(() => {
    dispatch(
      fetchProduct({
        id,
      })
    );
    return () => {
      dispatch(clearProduct());
      dispatch(clearProducts());
      setSelectedSize(null);
      setProductQuantity(1);
      setNavigateToCart(false);
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

  const productSizeChangeHandler = (size) => {
    setSelectedSize(size);
  };

  const addToCartHandler = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/login', {
        state: {
          from: location,
        },
      });
      return;
    }
    if (!selectedSize) {
      toast.error('Please select the product size');
      return;
    }
    if (productQuantity < 1) {
      toast.error('Product quantity cannot be less than 1');
      return;
    }
    try {
      await dispatch(
        addProductToCart({
          productId: selectedSize.id,
          quantity: productQuantity,
        })
      ).unwrap();
      toast.success('Product successfully added to the cart');
      setNavigateToCart(true);
      setTimeout(() => {
        navigate('/checkout/cart');
      }, 1000);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  if (status === 'failed') return <PageNotFound />;

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
              <SizeBox
                key={size.id}
                onClick={() => productSizeChangeHandler(size)}
                className={selectedSize?.id === size.id && 'selected'}
              >
                {size.size.toUpperCase()}
              </SizeBox>
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
              <DecreaseQtyButton
                onClick={() =>
                  setProductQuantity((qty) => (qty > 1 ? qty - 1 : qty))
                }
              >
                <Minus />
              </DecreaseQtyButton>
              <Quantity
                type="number"
                value={productQuantity}
                min="1"
                required
                onChange={(evt) => setProductQuantity(Number(evt.target.value))}
              />
              <IncreaseQtyButton
                onClick={() => setProductQuantity((qty) => qty + 1)}
              >
                <Plus />
              </IncreaseQtyButton>
            </QuantityBox>
          </QuantityContainer>
          <ProductButtonsContainer>
            <AddToCartButton onClick={addToCartHandler}>
              {navigateToCart ? (
                <>
                  <SpinnerCircle width="20px" height="20px" />
                  <span>Going To Cart</span>
                </>
              ) : (
                'Add to Cart'
              )}
            </AddToCartButton>
            <BuyNowButton>Buy Now</BuyNowButton>
          </ProductButtonsContainer>
        </ProductInfoContainer>
      </ProductContainer>
      <DescriptionContainer>
        <DescriptionText>DESCRIPTION</DescriptionText>
        <DescriptionContent>{description}</DescriptionContent>
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
                    priceNew={Number(p.price)}
                    priceOld={Number(p.price)}
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
  @media ${device.mobileM} {
    flex-direction: column;
  }
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
  @media ${device.tablet} {
    width: 70px;
  }
  @media ${device.mobileM} {
    width: 50px;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  @media ${device.tablet} {
    text-align: center;
  }
  @media ${device.mobileM} {
    text-align: center;
  }
`;

const Image = styled.img`
  width: 450px;
  @media ${device.tablet} {
    width: 250px;
  }
  @media ${device.mobileM} {
    width: 250px;
  }
`;

const ProductInfoContainer = styled.div`
  flex: 1;
  padding: 0 20px;
  @media ${device.tablet} {
    margin-top: 20px;
  }
  @media ${device.mobileM} {
    margin-top: 20px;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 300;
  color: rgb(27, 40, 57);
  text-transform: uppercase;
  @media ${device.tablet} {
    font-size: 18px;
    font-weight: 700;
  }
  @media ${device.mobileM} {
    font-size: 18px;
    font-weight: 700;
  }
`;

const PriceContainer = styled.div`
  margin: 10px 0;
`;

const NewPrice = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: teal;
  margin-right: 10px;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.mobileM} {
    font-size: 16px;
  }
`;

const OldPrice = styled.del`
  font-weight: 500;
  color: grey;
  font-size: 18px;
`;

const SizeLabel = styled.span`
  font-size: 18px;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.mobileM} {
    font-size: 16px;
  }
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
  &.selected {
    border: 1px solid teal;
    background: teal;
    color: white;
  }
`;

const ColorsContainer = styled.div`
  margin: 20px 0;
`;

const ColorLabel = styled.p`
  font-size: 18px;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.mobileM} {
    font-size: 16px;
  }
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
  @media ${device.tablet} {
    width: 30px;
    height: 30px;
  }
  @media ${device.mobileM} {
    width: 30px;
    height: 30px;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const QuantityLabel = styled.span`
  font-size: 18px;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.mobileM} {
    font-size: 16px;
  }
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.tablet} {
    width: 25px;
    height: 25px;
  }
  @media ${device.mobileM} {
    width: 25px;
    height: 25px;
  }
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.tablet} {
    width: 25px;
    height: 25px;
  }
  @media ${device.mobileM} {
    width: 25px;
    height: 25px;
  }
`;

const ProductButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AddToCartButton = styled(PrimaryButton)`
  font-size: 16px;
  padding: 10px 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-right: 20px;
  border: 1px solid transparent;
  height: 50px;
  width: 200px;
  @media ${device.tablet} {
    font-size: 14px;
  }
  @media ${device.mobileM} {
    font-size: 14px;
  }
`;

const BuyNowButton = styled(PrimaryButton)`
  font-size: 16px;
  padding: 10px 15px;
  color: teal;
  background: white;
  border: 1px solid teal;
  height: 50px;
  width: 200px;
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

const DescriptionText = styled.p`
  @media ${device.tablet} {
    font-size: 16px;
    font-weight: 700;
  }
  @media ${device.mobileM} {
    font-size: 16px;
    font-weight: 700;
  }
`;

const DescriptionContent = styled.p``;

const Section = styled.div`
  padding: 0 20px;
  margin: 40px 0;
  @media ${device.tablet} {
    padding: 0;
  }
  @media ${device.mobileM} {
    padding: 0;
  }
`;

const SectionTitle = styled.h1`
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
  color: rgb(27, 40, 57);
  margin-bottom: 40px;
  @media ${device.tablet} {
    font-size: 20px;
    font-weight: 700;
  }
  @media ${device.mobileM} {
    font-size: 20px;
    font-weight: 700;
  }
`;

export default Product;
