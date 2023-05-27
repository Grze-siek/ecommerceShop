import { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';

function Cart() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const quantity = location.search
    ? new URLSearchParams(location.search).get('qty')
    : 1;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user.userLogin);

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, quantity }));
    }
  }, [dispatch, id, quantity]);

  const removeFromCartHandler = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart(id));

    navigate('/cart/');
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login', { state: { redirect: '/shipping' } });
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {!cartItems || cartItems.length === 0 ? (
          <Message variant="info">
            <div className="d-flex justify-content-evenly">
              <span className="fs-4">Your cart is empty.</span>
              <button
                type="button"
                className="btn text-decoration-underline"
                onClick={() => navigate('/')}
              >
                <span className="fs-5">Go Back</span>
              </button>
            </div>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        const itemData = {
                          id: item.product,
                          quantity: Number(e.target.value),
                        };
                        dispatch(addToCart(itemData));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={(e) => removeFromCartHandler(e, item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems
                  ? cartItems.reduce((acc, item) => acc + Number(item.qty), 0)
                  : '0'}
                ) item(s) $
                {cartItems
                  ? cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)
                  : '0'}
              </h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default Cart;
