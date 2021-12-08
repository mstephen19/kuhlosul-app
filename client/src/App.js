import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import { GlobalProvider } from './utils/GlobalContext/GlobalProvider';

const Nav = React.lazy(() => import('./components/NavBar/Nav'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const Home = React.lazy(() => import('./pages/Home'));
const Tracks = React.lazy(() => import('./pages/Tracks'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Contact = React.lazy(() => import('./pages/Contact'));

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <React.Suspense fallback={<p>Loading...</p>}>
          <Router>
            <Nav />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/tracks' component={Tracks} />
              <Route exact path='/login' component={AdminLogin} />
              <Route exact path='/dashboard' component={AdminDashboard} />
              <Route exact path='/contact' component={Contact} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Router>
        </React.Suspense>
      </GlobalProvider>
    </ApolloProvider>
  );
}
