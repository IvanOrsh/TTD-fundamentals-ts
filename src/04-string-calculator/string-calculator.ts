/*
  Task:
  Create a function that takes in string input and parses it to return the sum.

  subtasks:
  1. Numbers separated by a comma. ➕
  2. Numbers can also be separated by a newline character. ➕
  3. Numbers separated by a custom delimiter (specified in the first line of the string) ➕
  4. Calling add() with a negative number in the input will throw an exception “negatives not ➕
    allowed” - and the negative that was passed, if there are multiple negatives, show all of 
    them in the exception message - done with a separate 'add' function

  5. Ignore numbers over 1000. ➕
*/

export class StringCalculator implements StringCalculator {
  foundNumbers: number[] = [];

  start = 0;
  cursor = 0;

  constructor(private delimiters: string[] = [",", "\n"]) {}

  private eat() {
    this.cursor++;
  }

  private hasCustomDelimiter(input: string) {
    return input.startsWith("//");
  }

  private extractCustomDelimiters(input: string) {
    if (this.hasCustomDelimiter(input)) {
      this.delimiters.push(input[2]);
      return input.slice(3);
    }
    return input;
  }

  // Ignore numbers over 1000
  private pushNumber(input: string, start: number, qt: number) {
    const suspect = input.slice(start, qt);
    const expected = Number.parseInt(suspect, 10);
    if (!Number.isNaN(expected) && expected < 1000) {
      this.foundNumbers.push(expected);
    }
  }

  private parseString(input: string) {
    input = this.extractCustomDelimiters(input);

    for (let i = this.cursor; i < input.length; i++) {
      if (this.delimiters.includes(input[i])) {
        this.pushNumber(input, this.start, this.cursor);
        this.eat();
        this.start = this.cursor;
      } else {
        this.eat();
      }
    }

    if (this.start !== this.cursor) {
      this.pushNumber(input, this.start, this.cursor);
    }
  }

  private findNegativeNumbers() {
    return this.foundNumbers.filter((num) => num < 0);
  }

  private throwIfAnyNegativeNumbers(foundNegatives: number[]) {
    if (foundNegatives.length > 0) {
      throw new Error(
        `negatives not allowed, but found: ${foundNegatives.join(",")}`
      );
    }
  }

  private sumTotal() {
    return this.foundNumbers.reduce((sum, curr) => sum + curr, 0);
  }

  public calculateSum(input: string): number {
    if (input.length === 0) return 0;

    this.parseString(input);

    return this.sumTotal();
  }

  // throws on negative numbers
  public add(input: string) {
    if (input.length === 0) return 0;

    this.parseString(input);

    const foundNegatives = this.findNegativeNumbers();

    this.throwIfAnyNegativeNumbers(foundNegatives);

    return this.sumTotal();
  }
}
