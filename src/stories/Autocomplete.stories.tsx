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

export const Regular = () => {
  const [search, setSearch] = useState("");

  return (
    <AutoComplete
      options={[
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
      ].filter((option) => {
        if (String(search).length > 0) {
          return (
            option.label.toLowerCase().includes(search) ||
            option.value.toLowerCase().includes(search)
          );
        }

        return option;
      })}
      value={search}
      onSelect={(e) => console.log(e)}
      onChange={(e) => setSearch(String(e))}
    />
  );
};

export default AutoCompleteStory;
