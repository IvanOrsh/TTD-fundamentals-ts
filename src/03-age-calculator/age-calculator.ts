// Calculates a person's age at a given date.
// Function takes a person's birth date and a target date to compare
// and returns their age as an integer.

// example: 30 sept 1982, in 5 october 2001 -> 19

interface AgeCalculator {
  calculateAge(birthDate: Date, targetDate: Date): number;
}

export function createAgeCalculator(): AgeCalculator {
  function hasNotYetHadBirthday(birthDate: Date, targetDate: Date) {
    return (
      targetDate.getMonth() < birthDate.getMonth() ||
      (targetDate.getMonth() === birthDate.getMonth() &&
        birthDate.getDate() > targetDate.getDate())
    );
  }

  function hasHadBirthday(targetDate: Date, birthDate: Date) {
    return !hasNotYetHadBirthday(targetDate, birthDate);
  }

  return {
    calculateAge: function (birthDate: Date, targetDate: Date): number {
      const completedYears = targetDate.getFullYear() - birthDate.getFullYear();

      if (hasHadBirthday(birthDate, targetDate)) return completedYears;
      return completedYears - 1;
    },
  };
}
