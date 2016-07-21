defmodule ElixirChallenge.CardTypeIdentifier do

    @doc """
    Checks card number and returns type

    +============+=============+===============+
    | Card Type  | Begins With | Number Length |
    +============+=============+===============+
    | AMEX       | 34 or 37    | 15            |
    +------------+-------------+---------------+
    | Discover   | 6011        | 16            |
    +------------+-------------+---------------+
    | MasterCard | 51-55       | 16            |
    +------------+-------------+---------------+
    | Visa       | 4           | 13 or 16      |
    +------------+-------------+---------------+

    ## Examples
    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("340000000000000")
    :amex

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("370000000000000")
    :amex

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("270000000000000")
    :unknown

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("6011000000000000")
    :discover

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("51000000000000")
    :master_card

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("52000000000000")
    :master_card

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("53000000000000")
    :master_card

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("54000000000000")
    :master_card

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("55000000000000")
    :master_card

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("56000000000000")
    :unknown

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("4000000000000")
    :visa

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("4000000000000000")
    :visa

    iex> ElixirChallenge.CardTypeIdentifier.get_card_type("40000000000")
    :unknown
    """
    def get_card_type(card_number) do
      cond do
        _amex?(card_number) -> :amex
        _discover?(card_number) -> :discover
        _master_card?(card_number) -> :master_card
        _visa?(card_number) -> :visa
        true -> :unknown
      end
    end

    defp _amex?(card_number), do: Regex.match?(~r/(34\d{13})|(37\d{13})/, card_number)
    defp _discover?(card_number), do: Regex.match?(~r/6011\d{12}/, card_number)
    defp _master_card?(card_number), do: Regex.match?(~r/(51|52|53|54|55)\d{12}/, card_number)
    defp _visa?(card_number), do: Regex.match?(~r/4(\d{12}|\d{15})/, card_number)
end
