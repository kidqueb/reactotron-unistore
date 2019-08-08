import { getActionValues } from "../../src/helpers";

describe("getActionValues", () => {
  let state;
  beforeEach(() => {
    state = {
      user: { firstName: "Tom" },
      sports: ["Football"]
    };
  });

  test('should return the values for each key in an action response object', async ()=> {
    const action = () => ({ user: undefined, sports: undefined })
    const params = await getActionValues(state, action)

    expect(params).toEqual({
      user: { firstName: "Tom" },
      sports: ["Football"]
    })
  })

  test('should return the values for each key in an action response promise', async ()=> {
    const action = () => new Promise((resolve) => resolve({ user: undefined, sports: undefined }))
    const params = await getActionValues(state, action)

    expect(params).toEqual({
      user: { firstName: "Tom" },
      sports: ["Football"]
    })
  })

  test('should return an empty object if the action doesnt return anything', async ()=> {
    const action = () => {}
    const params = await getActionValues(state, action)

    expect(params).toEqual({})
  })
});
