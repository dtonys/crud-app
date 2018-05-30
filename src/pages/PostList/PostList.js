import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { LOAD_POST_LIST_REQUESTED } from 'redux/posts/actions';
import { extractState as extractPostState } from 'redux/posts/reducer';
import {
  Segment,
  Header,
  Grid,
  Button,
  Input,
} from 'semantic-ui-react';


@connect(
  (globalState) => ({
    postList: extractPostState(globalState).postList.data,
  })
)
class PostList extends Component {
  static propTypes = {
    postList: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
  }
  static defaultProps = {
    postList: null,
  }

  constructor( props ) {
    super(props);
    this.state = {
      inputValue: '',
      filteredPosts: null,
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: LOAD_POST_LIST_REQUESTED });
  }

  updateInputValue = ( event ) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  filterResults = () => {
    const { postList } = this.props;
    const { inputValue } = this.state;
    if ( inputValue ) {
      const filteredPosts = postList.filter(( post ) => (
        post.title.includes(inputValue) || post.body.includes(inputValue)
      ));
      this.setState({
        filteredPosts,
      });
      return;
    }
    this.setState({
      filteredPosts: null,
    });
  }

  render() {
    const { postList } = this.props;
    const { inputValue, filteredPosts } = this.state;
    const posts = filteredPosts || postList;

    return (
      <div>
        <Header as="h1" textAlign="center">
          PostList Page
        </Header>
        <br />
        <Input
          value={ inputValue }
          onChange={ this.updateInputValue }
          action={
            <Button onClick={this.filterResults} data-test="searchFilterBtn" >
              Filter results
            </Button>
          }
          placeholder="Search..."
          data-test="searchFilter"
        />
        <Button as={Link} to="/posts" floated="right" > Create Post </Button>
        <br />
        <br />
        <hr />
        <br />
        <Grid columns={3} divided>
          { posts && posts.map((item) => (
            <Grid.Row key={item.id} stretched>
              <Grid.Column width={12}>
                <Segment data-test="listItem">
                  { JSON.stringify(item, null, 2) }
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <Link to={`/posts/${item.id}/edit`} >
                  <Button>Edit</Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </div>
    );
  }
}

if ( module.hot ) {
  const { hot } = require('react-hot-loader');
  PostList = hot(module)(PostList);
}

export default PostList;
