import { createRockPaperScissors, Move, Outcome } from "./rock-paper-scissors";

/* Test Cases

PlayerOne  PlayerTwo   Winner
================================
paper      rock        PlayerOne +
paper      scissors    PlayerTwo +
paper      spock       playerOne
paper      lizard      playerTwo
paper      paper       Tie +
================================
rock       scissors    PlayerOne +
rock       paper       PlayerTwo +
rock       spock       PlayerTwo
rock       lizard      PlayerOne
rock       rock        Tie +
================================
scissors   paper       PlayerOne +
scissors   rock        PlayerTwo +
scissors   spock       PlayerTwo
scissors   lizard      PlayerOne
scissors   scissors    Tie +
================================
*/

describe("determineWinner", () => {
  describe("play", () => {
    describe("paper beats rock / rock looses to paper", () => {
      test.each([
        {
          playerMove: Move.Paper,
          opponentMove: Move.Rock,
          expected: Outcome.Wins,
        },
        {
          playerMove: Move.Rock,
          opponentMove: Move.Paper,
          expected: Outcome.Looses,
        },
      ])(
        "Player move: $playerMove, Opponent move: $opponentMove, Expected outcome: $expected",
        ({ playerMove, opponentMove, expected }) => {
          const sut = createRockPaperScissors();

          const actual = sut.play(playerMove, opponentMove);

          expect(actual).toBe(expected);
        }
      );
    });

    describe("paper looses to scissors / scissors beats paper", () => {
      test.each([
        {
          playerMove: Move.Paper,
          opponentMove: Move.Scissors,
          expected: Outcome.Looses,
        },
        {
          playerMove: Move.Scissors,
          opponentMove: Move.Paper,
          expected: Outcome.Wins,
        },
      ])(
        "Player move: $playerMove, Opponent move: $opponentMove, Expected outcome: $expected",
        ({ playerMove, opponentMove, expected }) => {
          const sut = createRockPaperScissors();

          const actual = sut.play(playerMove, opponentMove);

          expect(actual).toBe(expected);
        }
      );
    });

    describe("rock beats scissors / scissors looses to rock", () => {
      test.each([
        {
          playerMove: Move.Rock,
          opponentMove: Move.Scissors,
          expected: Outcome.Wins,
        },
        {
          playerMove: Move.Scissors,
          opponentMove: Move.Rock,
          expected: Outcome.Looses,
        },
      ])(
        "Player move: $playerMove, Opponent move: $opponentMove, Expected outcome: $expected",
        ({ playerMove, opponentMove, expected }) => {
          const sut = createRockPaperScissors();

          const actual = sut.play(playerMove, opponentMove);

          expect(actual).toBe(expected);
        }
      );
    });

    describe("if moves equal - tie", () => {
      test.each([
        {
          playerMove: Move.Rock,
          opponentMove: Move.Rock,
          expected: Outcome.Tie,
        },
        {
          playerMove: Move.Paper,
          opponentMove: Move.Paper,
          expected: Outcome.Tie,
        },
        {
          playerMove: Move.Scissors,
          opponentMove: Move.Scissors,
          expected: Outcome.Tie,
        },
      ])(
        "Player move: $playerMove, Opponent move: $opponentMove, Expected outcome: $expected",
        ({ playerMove, opponentMove, expected }) => {
          const sut = createRockPaperScissors();

          const actual = sut.play(playerMove, opponentMove);

          expect(actual).toBe(expected);
        }
      );
    });
  });
});
