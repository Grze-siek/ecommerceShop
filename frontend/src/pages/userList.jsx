import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { getUserList, deleteUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.user.userList);
  const { isLoading, isError, message: error, users } = userList;

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const deletedUser = useSelector((state) => state.user.deletedUser);
  const { isSuccess: successDelete } = deletedUser;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      navigate('/login');
    }
  }, [dispatch, successDelete, userInfo]);
  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-check" style={{ color: 'red' }}></i>
                  )}
                </td>

                <td className="d-flex justify-content-evenly">
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserList;
