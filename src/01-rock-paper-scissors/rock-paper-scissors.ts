export enum Move {
  Paper = "paper",
  Rock = "rock",
  Scissors = "scissors",
}

export enum Outcome {
  Wins = "player wins",
  Looses = "player looses",
  Tie = "tie",
}

interface RockPaperScissors {
  play(p1move: Move, p2move: Move): Outcome;
}

export function createRockPaperScissors(): RockPaperScissors {
  const scenarios = [
    // paper
    {
      playerMove: Move.Paper,
      opponentMove: Move.Rock,
      outcome: Outcome.Wins,
    },
    {
      playerMove: Move.Paper,
      opponentMove: Move.Scissors,
      outcome: Outcome.Looses,
    },

    // rock
    {
      playerMove: Move.Rock,
      opponentMove: Move.Scissors,
      outcome: Outcome.Wins,
    },
    {
      playerMove: Move.Rock,
      opponentMove: Move.Paper,
      outcome: Outcome.Looses,
    },

    // scissors
    {
      playerMove: Move.Scissors,
      opponentMove: Move.Paper,
      outcome: Outcome.Wins,
    },
    {
      playerMove: Move.Scissors,
      opponentMove: Move.Rock,
      outcome: Outcome.Looses,
    },
  ];

  return {
    play(playerMove: Move, opponentMove: Move): Outcome {
      const result = scenarios.find(
        (scenario) =>
          scenario.playerMove === playerMove &&
          scenario.opponentMove === opponentMove
      );

      return result ? result.outcome : Outcome.Tie;
    },
  };
}
