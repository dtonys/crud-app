import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ROUTE_POST_CREATE, ROUTE_POST_EDIT } from 'redux/routesMap';
import { Button, Form, Header } from 'semantic-ui-react';


const MODE_EDIT = 'MODE_EDIT';
const MODE_CREATE = 'MODE_CREATE';
@connect(
  (globalState) => ({
    location: globalState.location,
  })
)
class PostEdit extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor( props ) {
    super(props);

    let mode = null;
    if ( props.location.type === ROUTE_POST_CREATE ) {
      mode = MODE_CREATE;
    }
    if ( props.location.type === ROUTE_POST_EDIT ) {
      mode = MODE_EDIT;
    }

    this.state = {
      mode,
      formData: {
        title: '',
        body: '',
      },
      postSuccessId: null,
      updateSuccess: false,
    };
  }

  componentDidMount() {
    const { mode } = this.state;

    // In edit mode, preload the post detail
    if ( mode === MODE_EDIT ) {
      this.preloadPost();
    }
  }

  preloadPost = async () => {
    const { location } = this.props;
    const id = location.payload.id;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const { title, body } = await response.json();
    this.setState({
      formData: {
        title,
        body,
      },
    });
  }

  createPost = async () => {
    const { formData } = this.state;
    this.setState({
      postSuccessId: null,
    });
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        body: JSON.stringify(formData),
        mode: 'cors',
      }
    );
    const data = await response.json();
    this.setState({
      postSuccessId: data.id,
    });
  }

  updatePost = async () => {
    const { formData } = this.state;
    const { location } = this.props;
    const id = location.payload.id;
    this.setState({
      updateSuccess: false,
    });
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(formData),
      }
    );
    this.setState({
      updateSuccess: true,
    });
  }

  updateFormData = ( event ) => {
    const name = event.target.getAttribute('name');
    const value = event.target.value;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  }

  render() {
    const {
      mode, formData, postSuccessId, updateSuccess,
    } = this.state;
    const headerMessageMap = {
      [ MODE_CREATE ]: 'Create',
      [ MODE_EDIT ]: 'Edit',
    };
    const submitFnMap = {
      [ MODE_CREATE ]: this.createPost,
      [ MODE_EDIT ]: this.updatePost,
    };

    return (
      <div>
        <Header as="h1" textAlign="center" data-test="header">
          Post { headerMessageMap[mode] }
        </Header>
        <br />
        <Form onSubmit={ submitFnMap[mode] } >
          <Form.Field>
            <label>title</label>
            <input
              name="title"
              placeholder="title"
              onChange={this.updateFormData}
              value={formData.title}
            />
          </Form.Field>
          <Form.Field>
            <label>body</label>
            <input
              name="body"
              placeholder="body"
              onChange={this.updateFormData}
              value={formData.body}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
        <br />
        { postSuccessId &&
          `New post created with id ${postSuccessId}`
        }
        { updateSuccess &&
          'This post was updated successfully'
        }
      </div>
    );
  }
}

if ( module.hot ) {
  const { hot } = require('react-hot-loader');
  PostEdit = hot(module)(PostEdit);
}

export default PostEdit;
