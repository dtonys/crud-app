import { mount } from 'enzyme';
import React from 'react';
import { wrapWithReduxProvider, delay } from './helpers';
import PostList from '../pages/PostList/PostList';


const mockPostList = [
  {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
];

describe('Post List Page', () => {

  test('Should mount and render', () => {
    const postList = mount( wrapWithReduxProvider(<PostList />) );
    expect(postList).toEqual(expect.anything());
  });

  test('Should load a list of entries on page load', async () => {
    const successResponse = [
      JSON.stringify(mockPostList ),
      { status: 200 },
    ];
    fetch.mockResponseOnce(...successResponse);

    const postList = mount( wrapWithReduxProvider(<PostList />) );
    await delay(100);
    postList.update();
    const jsonText = JSON.parse(postList.find('div[data-test="listItem"]').at(0).text());
    expect(jsonText).toEqual(mockPostList[0]);
  });

  test('Should filter by title and body properly', async () => {
    const successResponse = [
      JSON.stringify(mockPostList ),
      { status: 200 },
    ];
    fetch.mockResponseOnce(...successResponse);

    const postList = mount( wrapWithReduxProvider(<PostList />) );
    await delay(100);
    postList.update();
    // After the first render, we should see two list items
    expect(postList.find('div[data-test="listItem"]').length).toBe(2);
    const searchInput = postList.find('div[data-test="searchFilter"] input');
    const searchInputBtn = postList.find('button[data-test="searchFilterBtn"]');
    searchInput.simulate('change', { target: { value: 'sunt aut facere' } });
    searchInputBtn.simulate('click');
    await delay(100);
    postList.update();
    // After filtering results, we should see one item
    expect(postList.find('div[data-test="listItem"]').length).toBe(1);
  });

});
