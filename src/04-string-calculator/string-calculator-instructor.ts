// regexp, nice!

export class StringCalculator {
  private hasCustomDelimiter(input: string) {
    return input.startsWith("//");
  }

  private extractCustomDelimiter(input: string): string | RegExp {
    return input[2];
  }

  private removeCustomDelimiter(input: string): string {
    return input.slice(3);
  }

  private throwIfAnyNegativeNumbers(negativeNumbers: number[]) {
    if (negativeNumbers.length > 0)
      throw `negatives not allowed: ${negativeNumbers}`;
  }

  public add(input: string) {
    if (input.length === 0) {
      return 0;
    }

    let delimiter: string | RegExp = /,|\n/;
    if (this.hasCustomDelimiter(input)) {
      delimiter = this.extractCustomDelimiter(input);
      input = this.removeCustomDelimiter(input);
    }

    let parsedNumbers = input.split(delimiter).map((s) => Number.parseInt(s));

    parsedNumbers = parsedNumbers.filter((n) => n < 1000);

    const negativeNumbers = parsedNumbers.filter((n) => n < 0);

    this.throwIfAnyNegativeNumbers(negativeNumbers);

    return parsedNumbers.reduce((n, total) => total + n);
  }
}
