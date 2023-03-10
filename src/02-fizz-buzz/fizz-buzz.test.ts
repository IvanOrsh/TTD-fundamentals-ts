/**
 * if the number is divisible by 3, return "Fizz"
 * if the number is divisible by 5, return "Buzz"
 * if the number is divisible by 3 and 5, return "FizzBuzz"
 * otherwise, return the number itself (as a string)
 *
 * 4 equivalence partitions:
 *
 * Fizz: 3, 6, 9, 12, 18, ....
 * Buzz: 5, 10, 20, 25, 35, 40, ....
 * FizzBuzz: 15, 30, 45, ...
 * other: 1, 2, 4, 7, 8, 11, ...
 *
 * new feature: add Whizz if prime!
 *
 * whiz:
 * 1: 1
 * 2: Whiz
 * 3: FizzWhiz
 * 4: 4
 * 5: BuzzWhiz
 * 6: Fizz
 * 7: Whiz
 * 8: 8
 * 9: Fizz
 * 11: Whiz
 * 12: Fizz
 * 13: Whiz
 * 14: 14
 * 15: FizzBuzz
 * 16: 16
 */
import { createFizzBuzz } from "./fizz-buzz";

describe("fizz-buzz", () => {
  describe("Fizz", () => {
    test.each([
      {
        input: 6, // not prime
      },
      {
        input: 9, // not prime
      },
      {
        input: 12,
      },
    ])("$input", ({ input }) => {
      const sut = createFizzBuzz();
      const expected = "Fizz";

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });

  describe("Buzz", () => {
    test.each([
      {
        input: 10, // not prime
      },
      {
        input: 20, // not prime
      },
      {
        input: 25,
      },
    ])("$input", ({ input }) => {
      const sut = createFizzBuzz();
      const expected = "Buzz";

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });

  // these are never prime
  describe("FizzBuzz", () => {
    test.each([
      {
        input: 15,
      },
      {
        input: 30,
      },
      {
        input: 45,
      },
    ])("$input", ({ input }) => {
      const sut = createFizzBuzz();
      const expected = "FizzBuzz";

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });

  describe("number itself", () => {
    test.each([
      {
        input: 1,
        expected: "1",
      },
      {
        input: 4,
        expected: "4",
      },
      {
        input: 8,
        expected: "8",
      },
      {
        input: 14,
        expected: "14",
      },
      {
        input: 16,
        expected: "16",
      },
      {
        input: 76,
        expected: "76",
      },
      {
        input: 76,
        expected: "76",
      },
      {
        input: 169,
        expected: "169",
      },
      {
        input: 289,
        expected: "289",
      },
    ])("$input", ({ input, expected }) => {
      const sut = createFizzBuzz();

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });

  describe("FizzWhizz", () => {
    test.each([
      {
        input: 3,
      },
    ])("$input", ({ input }) => {
      const sut = createFizzBuzz();
      const expected = "FizzWhizz";

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });

  describe("BuzzWhizz", () => {
    test.each([
      {
        input: 5,
      },
    ])("$input", ({ input }) => {
      const sut = createFizzBuzz();
      const expected = "BuzzWhizz";

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });

  describe("Whizz", () => {
    test.each([
      {
        input: 2,
      },
      {
        input: 7,
      },
      {
        input: 11,
      },
      {
        input: 13,
      },
      {
        input: 17,
      },
    ])("$input", ({ input }) => {
      const sut = createFizzBuzz();
      const expected = "Whizz";

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });
});
