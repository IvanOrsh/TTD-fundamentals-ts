- [Intro:](#intro)
- [Four-Phase Test:](#four-phase-test)
- [AAA](#aaa)
- [F.I.R.S.T Principles](#first-principles)
- [The 3 "Laws" of TDD (uncle bob)](#the-3-laws-of-tdd-uncle-bob)
- [The Red-Green-Reflect-Refactor Cycle](#the-red-green-reflect-refactor-cycle)
- [Green Bar Pattern: Fake it](#green-bar-pattern-fake-it)
- [Equivalence Partitions and Boundaries](#equivalence-partitions-and-boundaries)
- [Green Bar Pattern: Triangulation](#green-bar-pattern-triangulation)
- [The Stages of Naming](#the-stages-of-naming)
- [Green Bar Patterns](#green-bar-patterns)
  - [Green Bar Pattern: One-to-many](#green-bar-pattern-one-to-many)
  - [Green Bar Pattern: Obvious (most tempting one to use)](#green-bar-pattern-obvious-most-tempting-one-to-use)
  - [Green Bar Pattern: Backout](#green-bar-pattern-backout)
  - [Green Bar Pattern: Learning Test](#green-bar-pattern-learning-test)
- [TTD Gears](#ttd-gears)
- [Test Doubles](#test-doubles)
  - [Test Doubles: Fakes](#test-doubles-fakes)
  - [Test Doubles: Stubs](#test-doubles-stubs)
  - [Test Doubles: Mock](#test-doubles-mock)
  - [Test Doubles: Summary](#test-doubles-summary)

## Intro:

init `jest.config.js`: `npx ts-jest config:init`

---

## Four-Phase Test:

- Setup
- Exercise
- Verify
- Teardown

---

## AAA

- **Arrange**: state, services, or SUT (expected, sut)
- **Act**
- **Assert**

---

## F.I.R.S.T Principles

- Principles, not rules
- Better quality tests, that we trust more
- FIRST > DRY or SOLID or (other)
- weight them (FIRST principles) differently for unit/integration/acceptance level tests

- **FAST** - The faster the better (run more ofter, more feedbacK)

  - most tests should be small & in process
  - monitor test speed
  - break out slower tests

- **INDEPENDENT** - independent / isolated form

  - no shared state between tests - use transient fixture
  - isolated / independent from the external environment
  - use AAA
  - no sequence dependencies

- **REPEATABLE** - deterministic results (beware the flickering test)

  - no time dependency
  - no random data dependency
  - each test: set up and arrange its own data
  - Note: in tension with FAST!

- **SELF-VALIDATING** - test either pass or fail

  - the test runner always reports the result

- **THOROUGH** - aim to cover every scenario (raw code coverage is not sufficient)

  - A few acceptance tests (acceptance tests)
  - some integration tests
  - MANY unit tests

---

## The 3 "Laws" of TDD (uncle bob)

1. You are not allowed to write any production code unless it is to make a failing unit test pass.
2. You are not allowed to write any more of a unit test than it is sufficient to fail; and compilation failures are failures.
3. You are not allowed to write any more production code that is sufficient to pass the one failing unit test.

---

## The Red-Green-Reflect-Refactor Cycle

Red -> Green -> Reflect -> Refactor

---

## Green Bar Pattern: Fake it

Green Bar Pattern: Known ways to get to Green

- Fake it (till you make it): do a fake implementation to get the current test to pass

---

## Equivalence Partitions and Boundaries

- **Equivalence Partition** - A group of values for which the behavior of the code is the same
- **Boundary** - Where two equivalence partitions meet (where code changes from one behavior to another)

- for testing just pick values **at the boundary** and some within

---

## Green Bar Pattern: Triangulation

- **Green Bar Pattern**: Known ways to get to green
- **Triangulation**: Write three tests around a concept to draw the solution
- Fake it -> Fake it -> Make it (triangulate) or just continue faking it

---

## The Stages of Naming

- Naming is important, and difficult!
- Stages:
  1. Nonsense (cake)
  2. Accurate (sum, repository)
  3. Precise (sumOfAllTran, sactionsForA, ccount)
  4. Meaningful (balance) - **intention revealing**, **domain concepts**

---

## Green Bar Patterns

- Green Bar Pattern: Known ways to get to Green

### Green Bar Pattern: One-to-many

- One-to-many: Start with a single item before moving to a collection

### Green Bar Pattern: Obvious (most tempting one to use)

- Obvious: Go ahead and write the obvious implementation
- If it fails, undo and try another path
- Remember to refactor

### Green Bar Pattern: Backout

- Backout: Undo to get back to green
- Ways forward after backout:
  - Learning test (see next pattern)
  - Use Fake It and Triangulation

### Green Bar Pattern: Learning Test

- Learning Test: Try writing an implementation directly in a test to see if it work
- Some Scenarios:
  - During refactoring
  - After a Backout
  - Exploring a new module / API

---

## TTD Gears

- core: FIRST, RedGreenRefactor, Equivalence Partitions and Boundaries
- low: 3 laws of TTD, the stages of naming, Fake It, Triangulation, One-to-many, Learning Test (uncertain, not confident)
- med: Obvious (some familiarity, confidence)
- hight: (familiar domain, confidence)

- rev(reverse): Red / Red / Reverse! (Backout)

---

## Test Doubles

- Two main styles:
  - **London**: heavy use of test doubles
  - **Chicago**: minimize use of test doubles

### Test Doubles: Fakes

- **Fake**: an object with a simplified working implementation (for example, FakeUserRepository that uses in memory list instead of UserRepository that uses db)

**Rules**:

1. Only for indirect input
2. Not used for control
3. Not used for assertions

- Only there because the SUP has to have it to function, but not actually involved.

### Test Doubles: Stubs

- **Stub** - an object that provides predefined data

**Rules**:

1. Can be used for indirect input
2. Can be used for control
3. Not used for assertions

### Test Doubles: Mock

- **Mock** - an object that records calls received, and verifies them against expected calls

**Rules**:

1. Can be used for indirect input
2. Can be used for control
3. Used for assertion

### Test Doubles: Summary

- **Test Double** - A piece of code that replaces some "real" code for purpose of testing.
- **Why?** - So that our tests can be Fast, Isolated and Repeatable
- **Fake** - an object with a simplified working implementation
- **Stub** - an object that provides the predefined data
- **Mock** - an object that records calls received, and verifies them against expected calls.
