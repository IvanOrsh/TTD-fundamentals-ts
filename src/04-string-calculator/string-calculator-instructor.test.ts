import { StringCalculator } from "./string-calculator-instructor";

describe("string-calculator", () => {
  function createSut() {
    return new StringCalculator();
  }

  describe("calculateSum", () => {
    test("given empty string should return 0", () => {
      const sut = createSut();
      const input = "";
      const expected = 0;
      expect(sut.add(input)).toEqual(expected);
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
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = createSut();

        const actual = sut.add(input);

        expect(actual).toBe(expected);
      });
    });

    describe("comma as delimiter", () => {
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
          input: "0,1,3,3,3",
          expected: 10,
        },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = createSut();

        const actual = sut.add(input);

        expect(actual).toBe(expected);
      });
    });

    describe("new line as delimiter", () => {
      test("1,2\\n3", () => {
        const input = "1,2\n3";
        const expected = 6;
        const sut = createSut();
        const actual = sut.add(input);
        expect(actual).toBe(expected);
      });
      test("1,\\n2,3,4\n50", () => {
        const input = "1\n2,3,4\n50";
        const expected = 60;
        const sut = createSut();
        const actual = sut.add(input);
        expect(actual).toBe(expected);
      });
    });

    describe("custom delimiter", () => {
      test("//\\n;1;2;n3", () => {
        const input = "//;\n1;2;3";
        const expected = 6;
        const sut = createSut();
        const actual = sut.add(input);
        expect(actual).toBe(expected);
      });
    });

    describe("throw on negative numbers", () => {
      describe("one negative number in input", () => {
        test("1,2,-3", () => {
          const input = "1,2,-3";
          const sut = createSut();

          expect(() => sut.add(input)).toThrow("negatives not allowed: -3");
        });
      });

      describe("multiple negative numbers in input", () => {
        test("1,2,-3,4,-5,6,-222", () => {
          const input = "1,2,-3,4,-5,-222";
          const sut = createSut();

          expect(() => sut.add(input)).toThrow(
            "negatives not allowed: -3,-5,-222"
          );
        });
      });

      describe("large numbers (>1000) should be filtered out", () => {
        test.each([
          {
            input: "1,1,1001",
            expected: 2,
          },
          {
            input: "999, 1, 2, 3",
            expected: 1005,
          },
          {
            input: "0,1,3000,3,3,3",
            expected: 10,
          },
        ])("input: $input, expected: $expected", ({ input, expected }) => {
          const sut = createSut();

          const actual = sut.add(input);

          expect(actual).toBe(expected);
        });
      });
    });
  });
});
