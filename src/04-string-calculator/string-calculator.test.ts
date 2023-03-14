/*
  Task:
  Create a function that takes in string input and parses it to return the sum.

  subtasks:
  1. Numbers separated by a comma. +
  2. Numbers can also be separated by a newline character. +
  3. Numbers separated by a custom delimiter (specified in the first line of the string) +
  4. Reject negative numbers (throw an exception if there are any) - special method 'add', that rejects negative number +
  5. Ignore numbers over 1000. +
*/

// two separate methods: calculateSum and add
// add method throws with negative numbers in input string
import { StringCalculator } from "./string-calculator";

function createSut() {
  return new StringCalculator();
}

describe("string-calculator", () => {
  describe("calculateSum", () => {
    test("given empty string should return 0", () => {
      const sut = createSut();
      const input = "";
      const expected = 0;
      expect(sut.calculateSum(input)).toEqual(expected);
    });

    describe("given single number should return that number", () => {
      test.each([
        {
          input: "1",
          expected: 1,
        },
        {
          input: "22",
          expected: 22,
        },
        {
          input: "223",
          expected: 223,
        },
        {
          input: "-1",
          expected: -1,
        },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = createSut();

        const actual = sut.calculateSum(input);

        expect(actual).toBe(expected);
      });
    });

    describe("given multiple numbers, separated by comma", () => {
      test.each([
        {
          input: "1,1",
          expected: 2,
        },
        {
          input: "2,2,0,3",
          expected: 7,
        },
        {
          input: "0,-1,3,3,3",
          expected: 8,
        },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = createSut();

        const actual = sut.calculateSum(input);

        expect(actual).toBe(expected);
      });
    });

    describe("given multiple numbers, separated by newline character or a comma", () => {
      test.each([
        {
          input: "2\n2\n0\n3,7",
          expected: 14,
        },
        {
          input: "0,-1,3,3,3",
          expected: 8,
        },
        {
          input: "0,-1\n3,3\n3",
          expected: 8,
        },
        {
          input: "1,\n",
          expected: 1,
        },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = createSut();

        const actual = sut.calculateSum(input);

        expect(actual).toBe(expected);
      });
    });

    describe("supports custom delimiters as '//{delimiter}'", () => {
      test.each([
        {
          input: "//;\n1;2",
          expected: 3,
        },
        {
          input: "//x\n0,-1x3x3\n3",
          expected: 8,
        },
        {
          input: "///0,/1\n3/3\n3,2",
          expected: 12,
        },
        {
          input: "//*1,\n2*3*4*5",
          expected: 15,
        },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = createSut();

        const actual = sut.calculateSum(input);

        expect(actual).toBe(expected);
      });
    });
  });

  describe("ignores numbers greater than 1000", () => {
    test.each([
      {
        input: "//;\n1;999",
        expected: 1000,
      },
      {
        input: "//x0,-1x3x3\n3x1000",
        expected: 8,
      },
      {
        input: "///0,/1\n3/3\n3,2\n2000,3000,5000/1",
        expected: 13,
      },
      {
        input: "//*1,\n2*3*4*5*2500*2",
        expected: 17,
      },
    ])("input: $input, expected: $expected", ({ input, expected }) => {
      const sut = createSut();

      const actual = sut.calculateSum(input);

      expect(actual).toBe(expected);
    });
  });
});

describe("add - special function that throws and error on negative numbers found in input", () => {
  describe("expected to calculate sum", () => {
    test.each([
      {
        input: "//;\n1;2",
        expected: 3,
      },
      {
        input: "//x0,1x3x3\n3",
        expected: 10,
      },
      {
        input: "///0,/1\n3/3\n3,2",
        expected: 12,
      },
      {
        input: "//*1,\n2*3*4*5",
        expected: 15,
      },
    ])("input: $input, expected: $expected", ({ input, expected }) => {
      const sut = createSut();

      const actual = sut.add(input);

      expect(actual).toBe(expected);
    });
  });

  describe("expected to throw error", () => {
    test.each([
      {
        input: "//;\n1;-2;-3",
        foundNegatives: [-2, -3],
      },
      {
        input: "//x0,1x3x3\n3\n-10",
        foundNegatives: [-10],
      },
      {
        input: "///0,/1\n3/3\n3,2,-12",
        foundNegatives: [-12],
      },
      {
        input: "//*1,\n-2*-3*-4*-5",
        foundNegatives: [-2, -3, -4, -5],
      },
    ])(
      "input: $input, foundNegatives: $foundNegatives",
      ({ input, foundNegatives }) => {
        const sut = createSut();

        expect(() => sut.add(input)).toThrowError(
          `negatives not allowed, but found: ${foundNegatives.join(",")}`
        );
      }
    );
  });
});
