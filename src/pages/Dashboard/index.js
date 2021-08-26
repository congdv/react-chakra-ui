import { Button } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'stores/account';
import { useHistory } from 'react-router-dom';
import { BASE_ROUTE } from 'routes';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogOut = () => {
    dispatch(logout());
    history.push(BASE_ROUTE);
  }
  return (<>
    <div>Dashboard</div>
    <Button onClick={handleLogOut}>Logout</Button>
  </>)
}