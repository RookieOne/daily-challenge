defmodule ElixirChallenge.CreditCardValidatorTest do
  use ExUnit.Case
  alias ElixirChallenge.CreditCardValidator
  doctest ElixirChallenge.CreditCardValidator

  test "should handle sample input and return expected output" do
    results = CreditCardValidator.process_file("test/sample.txt")

    assert length(results) == 8
  end
end
