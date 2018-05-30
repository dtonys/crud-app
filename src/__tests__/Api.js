// We need to test with superagent because the fetch api is mocked.
import superagent from 'superagent';
import querystring from 'querystring';


describe('API', () => {

  test('Get all posts API returns correct data', async ( done ) => {
    const response = await superagent.get(`https://jsonplaceholder.typicode.com/posts?${querystring.stringify({ _limit: 5 })}`);
    const firstItem = {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    expect(response.body[0]).toEqual(firstItem);
    done();
  });

  test('Get post by id API returns consistencly correct data', async ( done ) => {
    const response = await superagent.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.body).toMatchSnapshot();
    done();
  });

});
