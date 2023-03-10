import { greeter } from "./greeter";

describe("greeter", () => {
  it('helloworld given default should return "hello world"', () => {
    // Arrange
    const expected = "hello world";
    const sut = greeter();

    // Act
    const actual = sut.helloworld(); // or result

    // Assert
    expect(actual).toBe(expected);
  });
});
