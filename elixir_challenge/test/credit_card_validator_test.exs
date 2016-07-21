defmodule ElixirChallenge.CreditCardValidatorTest do
  use ExUnit.Case
  alias ElixirChallenge.CreditCardValidator
  doctest ElixirChallenge.CreditCardValidator

  test "should handle sample input and return expected output" do
    # I know this test outpus to console but based on requirements, I felt this is ok
    # I probably would change this to accept a function to decide how to handle each credit card output
    # and by default I would output to console (in test would use map -> List)
    results = CreditCardValidator.process_file("test/sample.txt")

    assert length(results) == 8
  end
end
