import BoardContainer from '../../src/containers/BoardContainer';
import BoardSidebar   from '../../src/components/BoardSidebar';

describe('BoardContainer', () => {

//// SETUP /////////////////

  let wrapper;

  let testBoard = {
    "boardData": {
      id: 1,
      name: "Red as the Dawn",
      description: "A description",
      author_id: 1,
      created_at: "2017-12-19T18:06:56.205Z",
      updated_at: "2017-12-19T19:35:41.544Z",
      image: "an_image.jpg"
    },
    "currentAuthor": {
      id: 2,
      lastVisit: "2017-12-19T18:06:56.205Z",
      currentVisit: "2017-12-19T19:35:41.544Z"
    },
    characters: [{
      "id":2,
      "name":"Mare Barrow",
      "backstory":"",
      "age":"17",
      "avatar_url":"https://i.ytimg.com/vi/jV4svvcZJRE/maxresdefault.jpg",
      "author_id":1,
      "board_id":1,
      "created_at":"2017-12-20T18:07:36.609Z",
      "updated_at":"2017-12-28T20:29:15.876Z"
    },{
      "id":3,
      "name":"Kilorn Warren",
      "backstory":"",
      "age":"17",
      "avatar_url":"https://pbs.twimg.com/media/CvV1dlwUIAA5b8a.jpg",
      "author_id":1,
      "board_id":1,
      "created_at":"2017-12-20T20:35:16.432Z",
      "updated_at":"2017-12-28T20:36:16.498Z"
    }]
  }

  beforeEach(() => {
    spyOn(global, 'fetch').and.callFake(() => {
      let responseBody = JSON.stringify(testBoard);
      let response = new Response(responseBody, {
        status: '200',
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
      return Promise.resolve(response);
    });

    wrapper = mount(<BoardContainer />);
  })

//// RENDERING AND STATE /////////////////

  it('should have initial state with empty values', () => {
    expect(wrapper.state()).toEqual({
      name: '',
      description: '',
      image: '',
      boardId: '0',
      boardAuthorId: '',
      currentAuthor: 0,
      currentVisit: 0,
      lastVisit: 0,
      characters: [],
      currentCharacter: {}
    })
  })

  it('should fetch data from the api and update the board details in state', (done) => {
    setTimeout(() => {
      expect(wrapper.state().name).toEqual('Red as the Dawn');
      expect(wrapper.state().description).toEqual('A description');
      expect(wrapper.state().image).toEqual('an_image.jpg');
      expect(wrapper.state().boardAuthorId).toEqual(1);

      done();
    }, 0)
  })

  it("should fetch data and update the author's session details in state", (done) => {
    setTimeout(() => {
      expect(wrapper.state().currentVisit).toEqual('2017-12-19T19:35:41.544Z');
      expect(wrapper.state().lastVisit).toEqual('2017-12-19T18:06:56.205Z');

      done();
    }, 0)
  })

  it("should fetch data and set currentCharacter state to the first character in the JSON response", (done) => {
    setTimeout(() => {
      expect(wrapper.state().currentCharacter.name).toEqual('Mare Barrow');
      expect(wrapper.state().currentCharacter.id).toEqual(2);

      done();
    }, 0)
  })

  it("should fetch data and store all characters in state with all 9 keys", (done) => {
    setTimeout(() => {
      expect(wrapper.state().characters.length).toEqual(2);

      expect(wrapper.state().characters[0].name).toEqual('Mare Barrow');
      expect(Object.keys(wrapper.state().characters[0]).length).toEqual(9)

      expect(wrapper.state().characters[1].name).toEqual('Kilorn Warren');
      expect(Object.keys(wrapper.state().characters[1]).length).toEqual(9)

      done();
    }, 0)
  })

//// SUB-COMPONENT RENDERING /////////////////

  // BoardSidebar

  it("should render the BoardSidebar component", () => {
      expect(wrapper.find(BoardSidebar)).toBePresent();
  })

  // CharacterMenu

  it("should render the CharacterMenu component", () => {
    setTimeout(() => {
      expect(wrapper.find(CharacterMenu)).toBePresent();
      done();
    }, 0)
  })
})
