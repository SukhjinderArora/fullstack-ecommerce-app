import { useState } from 'react';
import styled from 'styled-components';
import { Minus, Plus } from 'react-feather';

import PrimaryButton from '../components/shared/PrimaryButton';
import Carousel from '../components/Carousel';
import ProductView from '../components/Product';

import { product, relatedProducts } from '../dummyData';

const Product = () => {
  const { title, images, priceNew, priceOld } = product;
  const [image, setImage] = useState(images[0]);

  const imageChangeHandler = (imageUrl) => {
    setImage(imageUrl);
  };

  return (
    <Container>
      <ProductContainer>
        <ImagesContainer>
          <Thumbnails>
            {images.map((imageURL, index) => (
              <ThumbnailContainer
                selected={image === imageURL}
                onClick={() => imageChangeHandler(imageURL)}
                key={index}
              >
                <Thumbnail src={imageURL} />
              </ThumbnailContainer>
            ))}
          </Thumbnails>
          <ImageContainer>
            <Image src={image} />
          </ImageContainer>
        </ImagesContainer>
        <ProductInfoContainer>
          <Title>{title}</Title>
          <PriceContainer>
            <NewPrice>INR 499.00</NewPrice>
            <OldPrice>INR 1499.00</OldPrice>
          </PriceContainer>
          <SizeLabel>Size:</SizeLabel>
          <SizesContainer>
            <SizeBox>S</SizeBox>
            <SizeBox>M</SizeBox>
            <SizeBox>L</SizeBox>
            <SizeBox>XL</SizeBox>
          </SizesContainer>
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
        <p>
          Knitted stretch fabric. Regular collar. Long buttoned sleeve. Button
          fastening on the front section. Patch pocket with button on the chest.
        </p>
        <p>
          -A classic pique dobby shirt in Yellow
          <br />
          -Can be worn for from office to after meeting evening get together.
          <br />
          -Liked by Father and Son age groups -Regular collar
          <br />
          -100% premium Cotton pique dobby solid shirt
          <br />
          -Full Sleeves
          <br />
          -Tailored Fit / Perfected pattern after extensive research on body
          measurements.
          <br />- Hand Wash - For detailed instructions- follow the wash-care
          label on the garment.
        </p>
        <p>
          <strong>SIZE</strong>
          <br />
          Model height 188cm. The model (Chest-39,Waist-32,Hips-38) is wearing a
          size M
        </p>
      </DescriptionContainer>
      <Section>
        <SectionTitle>Related Products</SectionTitle>
        <Carousel>
          {relatedProducts.map((p) => (
            <div
              style={{
                margin: '0 20px',
              }}
            >
              <ProductView
                title={p.title}
                img={p.img}
                priceNew={p.priceNew}
                priceOld={p.priceOld}
                id={p.id}
              />
            </div>
          ))}
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
  width: 50px;
  height: 50px;
  border: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
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
