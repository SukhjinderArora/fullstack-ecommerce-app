import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Filter } from 'react-feather';

import ProductList from '../components/ProductList';
import PrimaryButton from '../components/shared/PrimaryButton';
import useInView from '../hooks/useInView';
import SideDrawer from '../components/SideDrawer';
import Filters from '../components/Filters';
import PageNotFound from './PageNotFound';
import Spinner from '../components/shared/SpinnerRect';

import usePageTitle from '../hooks/usePageTitle';

import { fetchProducts, clearProducts } from '../store/productsSlice';
import { fetchAllCategories } from '../store/categoriesSlice';
import { setSort, resetFilters } from '../store/filtersSlice';

const sortOptions = [
  {
    sortBy: 'price',
    orderBy: 'asc',
    name: 'Price: Low - High',
  },
  {
    sortBy: 'price',
    orderBy: 'desc',
    name: 'Price: High - Low',
  },
  {
    sortBy: 'date',
    orderBy: 'desc',
    name: `What's new`,
  },
];

const initialSortingOption = {
  sortBy: '',
  orderBy: '',
  name: '',
};

const Products = () => {
  const dispatch = useDispatch();
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { products, totalProducts, status } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);
  const { selectedSizes, priceRange } = useSelector((state) => state.filters);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [selectedSort, setSelectedSort] = useState(initialSortingOption);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isURLInvalid, setIsURLInvalid] = useState(false);

  const { inView: showMoreButtonInView, ref } = useInView();
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(clearProducts());
  // }, [selectedSort, selectedSizes, priceRange, dispatch]);

  useEffect(() => {
    if (categorySlug) {
      if (categories.length === 0) {
        dispatch(fetchAllCategories());
      } else {
        const productCategoryExist = categories.find(
          (cat) => cat.slug === categorySlug
        );
        if (productCategoryExist) {
          setIsPageLoading(false);
          dispatch(
            fetchProducts({
              category: productCategoryExist.category,
              sortBy: selectedSort.sortBy,
              orderBy: selectedSort.orderBy,
              priceRange,
              sizes: selectedSizes,
            })
          );
          setSelectedCategory(productCategoryExist.category);
          setPageTitle(`${productCategoryExist.category} | Fashionista`);
        } else {
          setIsPageLoading(false);
          setIsURLInvalid(true);
        }
      }
    } else {
      setIsPageLoading(false);
      dispatch(
        fetchProducts({
          category: '',
          sortBy: selectedSort.sortBy,
          orderBy: selectedSort.orderBy,
          priceRange,
          sizes: selectedSizes,
        })
      );
    }
    return () => {
      dispatch(clearProducts());
    };
  }, [
    categorySlug,
    dispatch,
    categories,
    navigate,
    setPageTitle,
    selectedSort,
    priceRange,
    selectedSizes,
  ]);

  useEffect(() => {
    if (showMoreButtonInView) {
      dispatch(
        fetchProducts({
          category: selectedCategory,
          sortBy: selectedSort.sortBy,
          orderBy: selectedSort.orderBy,
          sizes: selectedSizes,
          priceRange,
        })
      );
    }
  }, [
    showMoreButtonInView,
    selectedCategory,
    selectedSort,
    dispatch,
    selectedSizes,
    priceRange,
  ]);

  const showMoreProducts = () => {
    dispatch(
      fetchProducts({
        category: selectedCategory,
        sortBy: selectedSort.sortBy,
        orderBy: selectedSort.orderBy,
        sizes: selectedSizes,
        priceRange,
      })
    );
  };

  const onSortOptionChanged = (e) => {
    const newSortOption = sortOptions.find(
      (sort) => sort.name === e.target.value
    ) || {
      sortBy: '',
      orderBy: '',
      name: '',
    };
    setSelectedSort(newSortOption);
    dispatch(
      setSort({
        sortBy: newSortOption.sortBy,
        orderBy: newSortOption.orderBy,
      })
    );
  };

  if (isPageLoading || (status === 'loading' && products.length === 0))
    return <Spinner />;

  if (isURLInvalid) return <PageNotFound />;

  return (
    <Container>
      <SideDrawer
        direction="right"
        showSideDrawer={showSideDrawer}
        onSideDrawerClose={() => setShowSideDrawer(false)}
      >
        <Filters closeSideDrawer={() => setShowSideDrawer(false)} />
      </SideDrawer>
      <Wrapper>
        <Title>{selectedCategory || 'All Categories'}</Title>
        <FiltersContainer>
          <FilterButton
            onClick={() => {
              setShowSideDrawer(true);
            }}
          >
            <span>
              <Filter />
            </span>
            Filters
          </FilterButton>
          <SortBySelect
            value={selectedSort.name}
            onChange={onSortOptionChanged}
          >
            <SortByOption value="">Sort By</SortByOption>
            {sortOptions.map((sort) => (
              <SortByOption value={sort.name} key={sort.name}>
                {sort.name}
              </SortByOption>
            ))}
          </SortBySelect>
        </FiltersContainer>
      </Wrapper>
      <ProductsContainer>
        {status !== 'loading' && totalProducts === 0 && (
          <Paragraph>No Products Found!</Paragraph>
        )}
        <ProductList products={products} />
        {totalProducts > 0 && (
          <Paragraph>
            Showing {products.length} of {totalProducts} results
          </Paragraph>
        )}
        {products.length < totalProducts && (
          <ShowMoreButton onClick={showMoreProducts} ref={ref}>
            Load More
          </ShowMoreButton>
        )}
      </ProductsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 50px 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 500;
`;

const FiltersContainer = styled.div`
  display: flex;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  background: teal;
  color: white;
  border: none;
  padding: 12px 15px;
  text-transform: uppercase;
  margin-right: 10px;
  box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 20%);
  border: 1px solid transparent;
  cursor: pointer;
  & span {
    margin-right: 5px;
    display: flex;
  }
  & svg {
    width: 16px;
    height: 16px;
    stroke: white;
  }
`;

const SortBySelect = styled.select`
  font-size: 18px;
  cursor: pointer;
`;

const SortByOption = styled.option``;

const ProductsContainer = styled.div`
  margin-top: 40px;
`;

const Paragraph = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const ShowMoreButton = styled(PrimaryButton)`
  display: block;
  margin: 20px auto;
`;

export default Products;

// import { useCallback, useEffect, useState, useLayoutEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import { Filter } from 'react-feather';

// import { fetchProducts, clearProducts } from '../store/productsSlice';
// import { setSelectedCategory } from '../store/filtersSlice';
// import ProductList from '../components/ProductList';
// import PrimaryButton from '../components/shared/PrimaryButton';
// import useInView from '../hooks/useInView';
// import SideDrawer from '../components/SideDrawer';
// import Filters from '../components/Filters';
// import useQuery from '../hooks/useQuery';

// const sortOptions = [
//   {
//     sortBy: 'price',
//     orderBy: 'asc',
//     name: 'Price: Low - High',
//   },
//   {
//     sortBy: 'price',
//     orderBy: 'desc',
//     name: 'Price: High - Low',
//   },
//   {
//     sortBy: 'date',
//     orderBy: 'desc',
//     name: `What's new`,
//   },
// ];

// const Products = () => {
//   const dispatch = useDispatch();
//   const { products, totalProducts, status } = useSelector(
//     (state) => state.products
//   );
//   const { selectedCategory, selectedSizes, priceRange } = useSelector(
//     (state) => state.filters
//   );
//   const { inView: showMoreButtonInView, ref } = useInView();
//   const [showSideDrawer, setShowSideDrawer] = useState(false);
//   const [selectedSort, setSelectedSort] = useState({
//     sortBy: '',
//     orderBy: '',
//     name: '',
//   });

//   const getProducts = useCallback(() => {
//     dispatch(
//       fetchProducts({
//         sortBy: selectedSort.sortBy,
//         orderBy: selectedSort.orderBy,
//       })
//     );
//   }, [selectedSort, dispatch]);

//   useEffect(() => {
//     dispatch(clearProducts());
//     dispatch(
//       fetchProducts({
//         sortBy: selectedSort.sortBy,
//         orderBy: selectedSort.orderBy,
//       })
//     );
//   }, [selectedCategory, selectedSizes, priceRange, selectedSort, dispatch]);

//   const showMoreProducts = () => {
//     getProducts();
//   };

//   useEffect(() => {
//     if (showMoreButtonInView) {
//       getProducts();
//     }
//   }, [showMoreButtonInView, dispatch, getProducts]);

//   const handleSelectInputChange = (e) => {
//     setSelectedSort(
//       sortOptions.find((sort) => sort.name === e.target.value) || {
//         sortBy: '',
//         orderBy: '',
//         name: '',
//       }
//     );
//   };

//   return (
//     <Container>
//       <SideDrawer
//         direction="right"
//         showSideDrawer={showSideDrawer}
//         onSideDrawerClose={() => setShowSideDrawer(false)}
//       >
//         <Filters closeSideDrawer={() => setShowSideDrawer(false)} />
//       </SideDrawer>
//       <Wrapper>
//         <Title>{selectedCategory || 'All Categories'}</Title>
//         <FiltersContainer>
//           <FilterButton
//             onClick={() => {
//               setShowSideDrawer(true);
//             }}
//           >
//             <span>
//               <Filter />
//             </span>
//             Filters
//           </FilterButton>
//           <SortBySelect
//             value={selectedSort.name}
//             onChange={handleSelectInputChange}
//           >
//             <SortByOption value="">Sort By</SortByOption>
//             {sortOptions.map((sort) => (
//               <SortByOption value={sort.name} key={sort.name}>
//                 {sort.name}
//               </SortByOption>
//             ))}
//           </SortBySelect>
//         </FiltersContainer>
//       </Wrapper>
//       <ProductsContainer>
//         {status !== 'loading' && totalProducts === 0 && (
//           <Paragraph>No Products Found!</Paragraph>
//         )}
//         <ProductList products={products} />
//         {totalProducts > 0 && (
//           <Paragraph>
//             Showing {products.length} of {totalProducts} results
//           </Paragraph>
//         )}
//         {products.length < totalProducts && (
//           <ShowMoreButton onClick={showMoreProducts} ref={ref}>
//             Load More
//           </ShowMoreButton>
//         )}
//       </ProductsContainer>
//     </Container>
//   );
// };

// const Container = styled.div`
//   padding: 50px 20px;
// `;

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Title = styled.h1`
//   font-size: 25px;
//   font-weight: 500;
// `;

// const FiltersContainer = styled.div`
//   display: flex;
// `;

// const FilterButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   font-size: 18px;
//   background: teal;
//   color: white;
//   border: none;
//   padding: 12px 15px;
//   text-transform: uppercase;
//   margin-right: 10px;
//   box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 20%);
//   border: 1px solid transparent;
//   cursor: pointer;
//   & span {
//     margin-right: 5px;
//     display: flex;
//   }
//   & svg {
//     width: 16px;
//     height: 16px;
//     stroke: white;
//   }
// `;

// const SortBySelect = styled.select`
//   font-size: 18px;
//   cursor: pointer;
// `;

// const SortByOption = styled.option``;

// const ProductsContainer = styled.div`
//   margin-top: 40px;
// `;

// const Paragraph = styled.p`
//   text-align: center;
//   margin-top: 20px;
// `;

// const ShowMoreButton = styled(PrimaryButton)`
//   display: block;
//   margin: 20px auto;
// `;

// export default Products;
