defmodule ElixirChallenge.CreditCardValidator do
  alias ElixirChallenge.CardTypeIdentifier
  alias ElixirChallenge.LuhnValidator

  @doc """
  Process the credit cards from a file. Assumes each credit card is on a separate line in the file

  # Example
  4111111111111111
  4111111111111
  4012888888881881
  378282246310005
  6011111111111117
  5105105105105100
  5105 1051 0510 5106
  9111111111111111

  """
  def process_file(filename) do
    File.stream!(filename)
    |> Stream.map(fn line -> 
      line 
      |> String.rstrip
      |> String.replace(" ", "")
      |> validate_number
      |> output_number_validation
    end)
    |> Stream.each(fn result -> IO.puts result end)
    |> Enum.to_list
  end

  @doc """
  Create a custom sigil to validate credit card number and return tuple
  
  Just did this as an exercise in making a custom sigil. I was hoping for ~cc but apparently sigils can only be one letter

  ## Examples
  iex> import ElixirChallenge.CreditCardValidator
  iex> ~v/4111111111111111/
  {:ok, :visa, "4111111111111111"}
  """
  def sigil_v(number, []), do: validate_number(number)

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

  @doc """
  Returns string from validation data

  # Examples

  iex> ElixirChallenge.CreditCardValidator.output_number_validation({:ok, :visa, "4111111111111111"})
  "VISA: 4111111111111111       (valid)"

  iex> ElixirChallenge.CreditCardValidator.output_number_validation({:invalid, :visa, "4111111111111"})
  "VISA: 4111111111111          (invalid)"

  iex> ElixirChallenge.CreditCardValidator.output_number_validation({:ok, :visa, "4012888888881881"})
  "VISA: 4012888888881881       (valid)"

  iex> ElixirChallenge.CreditCardValidator.output_number_validation({:ok, :discover, "6011111111111117"})
  "Discover: 6011111111111117   (valid)"

  iex> ElixirChallenge.CreditCardValidator.output_number_validation({:ok, :master_card, "5105105105105100"})
  "MasterCard: 5105105105105100 (valid)"

  iex> ElixirChallenge.CreditCardValidator.output_number_validation({:invalid, :master_card, "5105105105105106"})
  "MasterCard: 5105105105105106 (invalid)"

  iex> ElixirChallenge.CreditCardValidator.output_number_validation({:invalid, :unknown, "9111111111111111"})
  "Unknown: 9111111111111111    (invalid)"
  """
  def output_number_validation({status, card_type, number}) do
    status_string = case status do
      :ok -> "(valid)"
      _ -> "(invalid)"
    end
    card_type_string = case card_type do
      :visa -> "VISA"
      :amex -> "AMEX"
      :discover -> "Discover"
      :master_card -> "MasterCard"
      _ -> "Unknown"
    end
    result = card_type_string <> ": " <> number
    result = result <> _get_spacing(String.length(result))
    result <> status_string
  end

  defp _get_spacing(output_length) do
    Enum.map(0..28-output_length, fn _ -> " " end)
    |> Enum.join()
  end

end