import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productSlice';

import Product from '../components/Product';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useLocation } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';

function Home() {
  const { products, page, pages, isLoading, isError, message } = useSelector(
    (state) => state.product.productList
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const keyword = location.search;

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Message variant="danger">{message}</Message>;
  }

  return (
    <div>
      {(!keyword || keyword === '?page=1') && <ProductCarousel />}
      <h1>Latest products</h1>
      <div>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword} />
      </div>
    </div>
  );
}

export default Home;
