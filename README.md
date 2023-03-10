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
