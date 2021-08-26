import React, { useEffect } from 'react';
import { Button, Flex, Heading, Input, FormControl, FormLabel, Form, FormErrorMessage, Field } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useApi from 'utils/hooks/useApi';
import { BASE_ROUTE, WORKSPACE_BASE_ROUTE } from 'routes';
import { useDispatch } from 'react-redux';
import { getStoredAccessToken, storeAccessToken, storeRefreshToken } from 'utils/authToken';
import { useHistory } from 'react-router-dom';
import { setUser } from 'stores/account';

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiState, authenticateUser] = useApi();
  const { data, errors: apiErrors, isLoading, success } = apiState;

  useEffect(() => {
    if (success) {
      dispatch(setUser(data.user));
      storeAccessToken(data.access_token);
      storeRefreshToken(data.refresh_token);
      history.push(WORKSPACE_BASE_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success]);

  function onSubmit(payload) {
    return authenticateUser('/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: payload.email,
        password: payload.password,
      }),
    });
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              placeholder="example@mail.com"
              type="email"
              {...register('email', {
                required: 'Email is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} mt={5}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              placeholder="*******"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum length should be 8' },
              })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Button mt={6} colorScheme="teal" isLoading={apiState.isLoading} type="submit" w="100%">
            Login
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
