import { mount } from 'enzyme';
import React from 'react';
import { wrapWithReduxProvider } from './helpers';
import PostEdit from '../pages/PostEdit/PostEdit';


const mockPostDetail = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
};

describe('Post Create / Edit Page', () => {

  test('Shows post create when the url is the create url', () => {
    const postEdit = mount( wrapWithReduxProvider(<PostEdit />, {}, '/posts') );
    const header = postEdit.find('h1[data-test="header"]');
    expect(header).toHaveText('Post Create');
  });

  test('Shows post edit when the url is the edit url', async () => {
    const successResponse = [
      JSON.stringify(mockPostDetail ),
      { status: 200 },
    ];
    fetch.mockResponseOnce(...successResponse);

    const postEdit = mount( wrapWithReduxProvider(<PostEdit />, {}, '/posts/1/edit') );
    const header = postEdit.find('h1[data-test="header"]');
    expect(header).toHaveText('Post Edit');
  });

});
