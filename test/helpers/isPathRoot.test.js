import { isPathRoot } from "../../src/helpers";

describe("isPathRoot", () => {
  test('shoudl return true for root values', ()=> {
    expect(isPathRoot("")).toEqual(true)
    expect(isPathRoot("*")).toEqual(true)
    expect(isPathRoot(".*")).toEqual(true)
    expect(isPathRoot("root")).toEqual(true)
    expect(isPathRoot("root.*")).toEqual(true)
  })
});
