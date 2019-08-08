import { getChanges } from "../../src/helpers";

describe("getChanges", () => {
  let state;
  beforeEach(() => {
    state = {
      user: {
        firstName: "Tom",
        lastName: "Brady",
        username: "TB12"
      },
      sports: ["Football"]
    };
  });

  test("returns an empty array if there are no followed paths", () => {
    const changes = getChanges();
    expect(changes).toEqual([]);
  });

  test("returns the state value from specified paths", () => {
    const paths = ["user.firstName", "sports"];
    const changes = getChanges(paths, state);

    expect(changes).toEqual([
      { path: "user.firstName", value: state.user.firstName },
      { path: "sports", value: state.sports }
    ]);
  });

  test("returns entire child object when referencing key or ending in .*", () => {
    const paths = ["user", "user.*"];
    const changes = getChanges(paths, state);

    expect(changes).toEqual([
      { path: "user", value: state.user },
      { path: "user.*", value: state.user }
    ]);
  });

  test("returns entire state when using a root path or root alias", () => {
    const paths = ["", "*", ".*", "root", "root.*"];
    const changes = getChanges(paths, state);

    expect(changes).toEqual([
      { path: "", value: state },
      { path: "*", value: state },
      { path: ".*", value: state },
      { path: "root", value: state },
      { path: "root.*", value: state }
    ]);
  });

  test("doesnt return a change object for nonexistent paths", () => {
    const paths = ["user.statistics", "vendors"];
    const changes = getChanges(paths, state);

    expect(changes).toEqual([]);
  });
});
