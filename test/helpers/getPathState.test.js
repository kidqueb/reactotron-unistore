import { getPathState } from "../../src/helpers";

describe("getPathState", () => {
  let state;
  beforeEach(() => {
    state = {
      user: {
        firstName: "Tom",
        lastName: "Brady",
        username: "TB12",
        likes: ["Football", "Basketball"]
      },
      sports: ["Football"]
    };
  });

  test('should return state if its a root path', ()=> {
    const pathState = getPathState("*", state)
    expect(pathState).toEqual(state)
  })

  test('should return state at paths', ()=> {
    let pathState = getPathState("sports", state)
    expect(pathState).toEqual(state.sports)

    pathState = getPathState("user.firstName", state)
    expect(pathState).toEqual(state.user.firstName)
  })

  test('should return array items at specific index', ()=> {
    const pathState = getPathState("user.likes.1", state)
    expect(pathState).toEqual(state.user.likes[1])
  })

  test('should return undefined for nonexistent path', ()=> {
    let pathState = getPathState("check", state)
    expect(pathState).toEqual(undefined)
  })
});
