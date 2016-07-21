defmodule ElixirChallenge.CreditCardValidator do
  alias ElixirChallenge.CardTypeIdentifier
  alias ElixirChallenge.LuhnValidator

  @doc """
  Validates whether a credit card number is valid based on:

  1. matching a known credit card type
  2. passing the Luhn algorithm validation

  And returns tuple with validation information
  
  # Examples

  iex> ElixirChallenge.CreditCardValidator.validate_number("4111111111111111")
  {:ok, :visa, "4111111111111111"}

  iex> ElixirChallenge.CreditCardValidator.validate_number("4111111111111")
  {:invalid, :visa, "4111111111111"}

  iex> ElixirChallenge.CreditCardValidator.validate_number("4012888888881881")
  {:ok, :visa, "4012888888881881"}

  iex> ElixirChallenge.CreditCardValidator.validate_number("378282246310005")
  {:ok, :amex, "378282246310005"}

  iex> ElixirChallenge.CreditCardValidator.validate_number("6011111111111117")
  {:ok, :discover, "6011111111111117"}

  iex> ElixirChallenge.CreditCardValidator.validate_number("5105105105105100")
  {:ok, :master_card, "5105105105105100"}

  iex> ElixirChallenge.CreditCardValidator.validate_number("5105105105105106")
  {:invalid, :master_card, "5105105105105106"}

  iex> ElixirChallenge.CreditCardValidator.validate_number("9111111111111111")
  {:invalid, :unknown, "9111111111111111"}

  """
  def validate_number(number) do
    card_type = CardTypeIdentifier.get_card_type(number)

    cond do
      card_type == :unknown -> {:invalid, :unknown, number}
      LuhnValidator.number_valid?(number) -> {:ok, card_type, number}
      true -> {:invalid, card_type, number}
    end
  end

end