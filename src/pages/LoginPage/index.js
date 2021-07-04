import React from 'react';
import { Button, Flex, Heading, Input, FormControl, FormLabel, Form, FormErrorMessage, Field } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
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
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum length should be 8' },
              })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Button mt={6} colorScheme="teal" isLoading={isSubmitting} type="submit" w="100%">
            Login
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
