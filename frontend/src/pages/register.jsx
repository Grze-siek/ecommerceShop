import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { register, reset } from '../features/user/userSlice';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = location.search
    ? new URLSearchParams(location.search).get('redirect')
    : '/';

  const {
    userRegister,
    isLoading,
    isError,
    isSuccess,
    message: error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (isSuccess || Object.keys(userRegister).length !== 0) {
      navigate(redirect);
    }

    // dispatch(reset());
  }, [dispatch, redirect, isSuccess, navigate, userRegister]);

  const sumbitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <FormContainer>
      <h2>Register</h2>
      {message && <Message variant="danger">{message}</Message>}
      {isError && <Message variant="danger">{error}</Message>}
      <Form onSubmit={sumbitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Passsword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Passsword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Register
        </Button>

        <Row className="py-3">
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Sign In
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default Register;
