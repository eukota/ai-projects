# Testing

Validating the solution with AI.

## The Approach

- Ask AI to write tests for the core functionality
- Focus on happy path and main flows (skip edge cases initially for speed)
- Get code/tests into a runnable state (actual file, not chat)
- **Review the tests critically, especially test inputs:** AI-generated tests often have gaps
  - Limited test cases (e.g., only uppercase/lowercase, not long strings or special characters)
  - Incomplete coverage of bad inputs
  - Missing character/data types that should be tested
  - Ask AI to expand and improve test coverage based on what you identify
- **Add edge cases:** After reviewing, you add specific edge cases you know matter
  - Shows critical thinking and domain knowledge
  - Demonstrates you're directing the test suite, not just accepting AI output
- Run the tests to validate the solution works
- Ask AI to adjust if tests fail

## Interview Signaling

- Tell AI to write different types of tests: unit tests, integration tests, regression tests
- This signals: you understand test strategy, not just "write tests"
- Shows you're thinking about different aspects of validation

## Advanced Strategies

### Focus on integration tests

Regression tests are hard to do in an interview; unit tests show individual pieces. Integration tests are where you control and demonstrate the system working as a whole

- **Interviewers want to see:** integration tests
- **Shows:** system mastery and understanding of how components fit together

### Parallel testing tasks

Spin up AI to write comprehensive tests (unit, regression, edge cases) in background while you validate core integration tests

