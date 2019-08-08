import { getPathObj } from "../../src/helpers";

describe("getPathObj", () => {
  test("should return the entire object if a null is passed", () => {
    const obj = { isThis: { here: true } }
    const path = null

    const pathedObj = getPathObj(obj, path)

    expect(pathedObj).toEqual(obj)
  })

  test("should return the entire object if a empty string is passed", () => {
    const obj = { isThis: { here: true } }
    const path = ""

    const pathedObj = getPathObj(obj, path)

    expect(pathedObj).toEqual(obj)
  })

  test("should return the section of object if a single level path is passed", () => {
    const obj = { isThis: { here: true } }
    const path = "isThis"

    const pathedObj = getPathObj(obj, path)

    expect(pathedObj).toEqual(obj.isThis)
  })

  test("should return the section of object if a two level path is passed", () => {
    const obj = { isThis: { here: true } }
    const path = "isThis.here"

    const pathedObj = getPathObj(obj, path)

    expect(pathedObj).toEqual(true)
  })

  test("should return the section of object if a three level path is passed", () => {
    const obj = { isThis: { here: { again: true } } }
    const path = "isThis.here.again"

    const pathedObj = getPathObj(obj, path)

    expect(pathedObj).toEqual(true)
  })

  test("should return undefined of object if an invalid path is passed on level one", () => {
    const obj = { isThis: { here: { again: true } } }
    const path = "isThis2.here.again"

    const pathedObj = getPathObj(obj, path)

    expect(pathedObj).toEqual(undefined)
  })

  test("should return undefined of object if an invalid path is passed on level two", () => {
    const obj = { isThis: { here: { again: true } } }
    const path = "isThis.here2.again"

    const pathedObj = getPathObj(obj, path)

    expect(pathedObj).toEqual(undefined)
  })

  test("should return undefined of object if an invalid path is passed on level three", () => {
    const obj = { isThis: { here: { again: true } } }
    const path = "isThis.here.again2"

    const pathedObj = getPathObj(obj, path)

    expect(pathedObj).toEqual(undefined)
  })
})
