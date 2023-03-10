import { createAgeCalculator } from "./age-calculator";

describe("ageCalculator", () => {
  describe("has had birthday this year", () => {
    test.each([
      {
        birthDate: "1979/02/15",
        targetDate: "2000/03/21",
        expected: 21,
      },
      {
        birthDate: "1950/01/31",
        targetDate: "2001/03/21",
        expected: 51,
      },
      {
        birthDate: "2015/03/10",
        targetDate: "2022/03/21",
        expected: 7,
      },
      {
        birthDate: "2000/02/29",
        targetDate: "2022/03/01",
        expected: 22,
      },
      {
        birthDate: "2004/02/28",
        targetDate: "2022/03/01",
        expected: 18,
      },
      {
        birthDate: "2000/02/28",
        targetDate: "2008/02/28",
        expected: 8,
      },
    ])(
      "birthDate: $birthDate, targetDate: $targetDate, expected: $expected",
      ({ birthDate, targetDate, expected }) => {
        const sut = createAgeCalculator();

        const actual = sut.calculateAge(
          new Date(birthDate),
          new Date(targetDate)
        );
        expect(actual).toBe(expected);
      }
    );
  });

  describe("has not had birthday this year", () => {
    describe("birthday in later month", () => {
      test.each([
        {
          birthDate: "1979/04/15",
          targetDate: "2000/03/21",
          expected: 20,
        },
        {
          birthDate: "1950/04/31",
          targetDate: "2001/03/21",
          expected: 50,
        },
        {
          birthDate: "2015/04/10",
          targetDate: "2022/03/21",
          expected: 6,
        },
        {
          birthDate: "2004/02/29",
          targetDate: "2005/03/01",
          expected: 1,
        },
      ])(
        "birthDate: $birthDate, targetDate: $targetDate, expected: $expected",
        ({ birthDate, targetDate, expected }) => {
          const sut = createAgeCalculator();

          const actual = sut.calculateAge(
            new Date(birthDate),
            new Date(targetDate)
          );
          expect(actual).toBe(expected);
        }
      );
    });

    describe("birthday in the same month", () => {
      test.each([
        {
          birthDate: "1979/03/22",
          targetDate: "2000/03/21",
          expected: 20,
        },
        {
          birthDate: "1950/04/31",
          targetDate: "2001/04/21",
          expected: 50,
        },
        {
          birthDate: "2015/03/22",
          targetDate: "2022/03/21",
          expected: 6,
        },
      ])(
        "birthDate: $birthDate, targetDate: $targetDate, expected: $expected",
        ({ birthDate, targetDate, expected }) => {
          const sut = createAgeCalculator();

          const actual = sut.calculateAge(
            new Date(birthDate),
            new Date(targetDate)
          );
          expect(actual).toBe(expected);
        }
      );
    });
  });
});
