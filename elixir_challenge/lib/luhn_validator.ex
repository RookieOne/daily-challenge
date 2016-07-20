defmodule ElixirChallenge.LuhnValidator do

  @doc """
  Validates a number based on the Luhn Algorithm

  The steps are:

  1. Starting with the next to last digit and continuing with every other digit going back to the beginning of the card, double the digit
  2. Sum all doubled and untouched digits in the number. For digits greater than 9 you will need to split them and sum the independently (i.e. "10", 1 + 0).
  3. If that total is a multiple of 10, the number is valid.

  # Examples
  iex> ElixirChallenge.LuhnValidator.number_valid?("4408041234567893")
  true
  iex> ElixirChallenge.LuhnValidator.number_valid?("4417123456789112")
  false
  """
  def number_valid?(number) do
    number
    |> _convert_string_to_digits
    |> step1
    |> step2
    |> step3?
  end

  defp _convert_string_to_digits(number) do
    String.graphemes(number)
    |> Enum.map(fn n -> Integer.parse(n) |> elem(0) end)
  end

  @doc """
  Performs the first step in the Luhn Algorithm:
  Starting with the next to last digit and continuing with every other digit going back to the beginning of the card, double the digit
  
  # Examples
  iex> ElixirChallenge.LuhnValidator.step1([4,4,0,8,0,4,1,2,3,4,5,6,7,8,9,3])
  [8,4,0,8,0,4,2,2,6,4,10,6,14,8,18,3]

  """
  def step1(numbers), do: _step1(numbers |> Enum.reverse, false, [])

  defp _step1([], _, result), do: result
  defp _step1([number|numbers], take, result) do
    result = cond do
      take -> [number*2|result]
      true -> [number|result]
    end
    _step1(numbers, !take, result)
  end

  @doc """
  Performs the second step in the Luhn Algorithm:
  Sum all doubled and untouched digits in the number. For digits greater than 9 you will need to split them and sum the independently (i.e. "10", 1 + 0).

  # Examples
  iex> ElixirChallenge.LuhnValidator.step2([8,4,0,8,0,4,2,2,6,4,10,6,14,8,18,3])
  70
  """
  def step2(numbers), do: Enum.reduce(numbers, 0, &(_sum_digit(&1,&2)))

  defp _sum_digit(number,result) when number >= 10 do
    value = Integer.digits(number) |> Enum.reduce(0, &+/2)
    result + value
  end
  defp _sum_digit(number, result), do: result + number

  @doc """
  Performs the third step in the Luhn Algorithm:
  If that total is a multiple of 10, the number is valid.

  # Examples
  iex> ElixirChallenge.LuhnValidator.step3?(70)
  true

  iex> ElixirChallenge.LuhnValidator.step3?(10)
  true

  iex> ElixirChallenge.LuhnValidator.step3?(123)
  false

  iex> ElixirChallenge.LuhnValidator.step3?(1)
  false

  iex> ElixirChallenge.LuhnValidator.step3?(1089021480)
  true
  """
  def step3?(number), do: rem(number, 10) == 0

end