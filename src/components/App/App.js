import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './App.scss';
import Link from 'redux-first-router-link';
import { NOT_FOUND } from 'redux-first-router';
import {
  ROUTE_POST_LIST,
  ROUTE_POST_EDIT,
  ROUTE_POST_CREATE,
} from 'redux/routesMap';
import {
  Menu,
  Container,
} from 'semantic-ui-react';


const actionToComponentPath = {
  [ ROUTE_POST_LIST ]: 'PostList/PostList',
  [ ROUTE_POST_EDIT ]: 'PostEdit/PostEdit',
  [ ROUTE_POST_CREATE ]: 'PostEdit/PostEdit',
  [ NOT_FOUND ]: 'NotFound/NotFound',
};

@connect(
  (state) => ({
    routeAction: state.location.type,
  }),
)
class App extends Component {
  static propTypes = {
    routeAction: PropTypes.string.isRequired,
  };

  constructor( props ) {
    super(props);
    this.state = {
      PageComponent: null,
    };
  }

  loadComponent = async () => {
    const { routeAction } = this.props;
    const componentPath = actionToComponentPath[routeAction];
    const component = await import(`../../pages/${componentPath}`);
    this.setState({
      PageComponent: component.default,
    });
  }

  componentDidMount() {
    this.loadComponent();
  }

  componentDidUpdate( prevProps /* , prevState */ ) {
    const routeChanged = ( prevProps.routeAction !== this.props.routeAction );
    if ( routeChanged ) {
      this.loadComponent();
    }
  }

  render() {
    const { PageComponent } = this.state;

    return (
      <div className={ styles.app } >
        <Menu
          inverted
          size="massive"
          fixed="top"
        >
          <Container>
            <Menu.Item as={Link} to="/" header>
              CRUD App
            </Menu.Item>
          </Container>
        </Menu>
        <Container text className={ styles.app__container }>
          { PageComponent && <PageComponent /> }
        </Container>
      </div>
    );
  }
}

if ( module.hot ) {
  const { hot } = require('react-hot-loader');
  App = hot(module)(App);
}

export default App;
