import { ChakraProvider } from '@chakra-ui/react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { AppRouter } from 'routes';

function App() {
  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
