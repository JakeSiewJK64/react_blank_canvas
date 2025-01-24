import { useState } from "react";
import { Meta } from "@storybook/react";
import { AutoComplete } from "../components/Input";

const AutoCompleteStory: Meta<typeof AutoComplete> = {
  title: "Core/AutoComplete",
  component: AutoComplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

const options = [
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Orange",
    value: "orange",
  },
  {
    label: "Melon",
    value: "melon",
  },
  {
    label: "Something very long but it could be a name at some point",
    value: "Something very long but it could be a name at some point",
  },
  {
    label: "Banana",
    value: "banana",
  },
  {
    label: "Grapes",
    value: "grapes",
  },
  {
    label: "Watermelon",
    value: "watermelon",
  },
  {
    label: "Pineapple",
    value: "pineapple",
  },
  {
    label: "Mango",
    value: "mango",
  },
  {
    label: "Strawberry",
    value: "strawberry",
  },
];

export const Regular = () => {
  const [search, setSearch] = useState("");

  return (
    <AutoComplete
      options={options.filter((option) => {
        if (String(search).length > 0) {
          return (
            option.label.toLowerCase().includes(search) ||
            option.value.toLowerCase().includes(search)
          );
        }

        return option;
      })}
      value={search}
      onSelect={(e) => setSearch(e.value)}
      onChange={(e) => setSearch(String(e))}
    />
  );
};

export default AutoCompleteStory;
