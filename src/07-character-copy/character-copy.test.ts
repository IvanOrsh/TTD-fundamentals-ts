/*
  Write a Copier class with a copy() method on it.
  When the copy() method is called, the copier should read from a Source one character at a time
  and write this character to a Destination.
  It should do this repeatedly until a newline ('\n') is encountered when reading,
  at which point it should stop, without writing the newline to the Destination.

  Do the above without using 'read' Source and 'Destination' implementations - test doubles should be used for these.

  interface Source     <------- Copier -------->  interface Destination
  +readChar(): string        -src: Source         +writeChar(string)
                             -dest: Destination   
                             +copy()
*/

// no characters + newline +
// one character + newline +
// two characters + newline +
// many characters + newline +
// the order of the characters +
// repeated characters +
// characters after the newline = should not be written

import { Copier, Destination, Source } from "./character-copy";

function createSource(chars: string[]): Source {
  const mockReadChar = jest.fn();
  mockReadChar.mockReturnValue("\n");
  chars.map((c) => mockReadChar.mockReturnValueOnce(c));

  return {
    readChar: mockReadChar,
  };
}

function createDestination() {
  const writtenCharacters: string[] = [];
  return {
    writeChar: jest.fn((c) => writtenCharacters.push(c)),
    getWrittenChars: () => writtenCharacters,
  };
}

describe("character-copy", () => {
  describe("copy", () => {
    function createCopier(source: Source, destination: Destination): Copier {
      return new Copier(source, destination);
    }

    describe("no character before newline", () => {
      test("", () => {
        // arrange
        const source = createSource([]);
        const destination = createDestination();
        const sut = createCopier(source, destination);

        // act
        sut.copy();

        // assert
        expect(destination.writeChar).toHaveBeenCalledTimes(0);
      });
    });

    describe("one character with newline", () => {
      test.each([{ char: "a" }, { char: "b" }, { char: "!" }])(
        "char: $char",
        ({ char }) => {
          // arrange
          const source = createSource([char]);
          const destination = createDestination();
          const sut = createCopier(source, destination);

          // act
          sut.copy();

          // assert
          expect(destination.writeChar).toHaveBeenCalledTimes(1);
          expect(destination.getWrittenChars()).toContain(char);
        }
      );
    });

    describe("multiple characters with newline", () => {
      test.each([
        { chars: ["a", "b"] },
        { chars: ["d", "e", "f"] },
        {
          chars: ["!", "$", "#", "n", "p"],
        },
        {
          chars: ["a", "a", "a", "b", "c"],
        },
      ])("chars: $chars", ({ chars }) => {
        // arrange
        const source = createSource(chars);
        const destination = createDestination();
        const sut = createCopier(source, destination);

        // act
        sut.copy();

        // assert
        expect(destination.writeChar).toHaveBeenCalledTimes(chars.length);
        chars.map((c) => expect(destination.getWrittenChars()).toContain(c));
      });
    });

    describe("multiple characters are written in the correct order", () => {
      test.each([{ chars: ["a", "b", "c", "a"] }])(
        "chars: $chars",
        ({ chars }) => {
          // arrange
          const source = createSource(chars);
          const destination = createDestination();
          const sut = createCopier(source, destination);

          // act
          sut.copy();

          // assert
          expect(destination.getWrittenChars()).toStrictEqual(chars);
        }
      );
    });

    describe("characters after newline are not written", () => {
      test.each([
        { chars: ["z", "t", "\n", "a", "b", "c"], expected: ["z", "t"] },
        { chars: ["z", "t", "d", "\n", "b"], expected: ["z", "t", "d"] },
      ])("chars: $chars", ({ chars, expected }) => {
        // arrange
        const source = createSource(chars);
        const destination = createDestination();
        const sut = createCopier(source, destination);

        // act
        sut.copy();

        // assert
        expect(destination.getWrittenChars()).toStrictEqual(expected);
      });
    });
  });
});
