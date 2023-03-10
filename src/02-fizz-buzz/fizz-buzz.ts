// import { checkPrimeSync } from "node:crypto";

interface FizzBuzz {
  go(num: number): string;
}

export function createFizzBuzz(): FizzBuzz {
  // const isPrime = (num: number): boolean => {
  //   const numBuffer = BigInt(num);
  //   return checkPrimeSync(numBuffer);
  // };

  function isPrime(num: number): boolean {
    if (num === 1) return false;
    for (let factor = 2; factor <= Math.sqrt(num); factor++) {
      if (num % factor === 0) return false;
    }
    return true;
  }

  return {
    go: function (num: number): string {
      if (num === 3) return "FizzWhizz";
      if (num === 5) return "BuzzWhizz";
      if (num % 15 === 0) return "FizzBuzz";
      if (num % 5 === 0) return "Buzz";
      if (num % 3 === 0) return "Fizz";
      if (isPrime(num)) return "Whizz";
      return num.toString();
    },
  };
}
