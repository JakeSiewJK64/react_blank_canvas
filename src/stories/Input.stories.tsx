import { Meta } from "@storybook/react";
import { HTMLInputTypeAttribute, useState } from "react";
import { AutoComplete, Input, TreeSelect } from "../components/Input";

const InputTypesOptions: HTMLInputTypeAttribute[] = [
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week",
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const InputStory: Meta<typeof Input> = {
  title: "Core/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: "select",
      options: InputTypesOptions,
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Small = {
  args: {},
};

const EXAMPLE_OPTIONS = [
  { label: "Snacks", value: "snacks", children: [] },
  { label: "Dairy", value: "dairy", children: [] },
  {
    label: "Fruit",
    value: "fruit",
    children: [
      { label: "Apple", value: "apple" },
      { label: "Watermelon", value: "watermelon" },
      {
        label: "Grape",
        value: "grape",
        children: [
          {
            label: "Seedless Grape",
            value: "seedless grape",
          },
          {
            label: "Normal Grape",
            value: "normal grape",
          },
        ],
      },
    ],
  },
  {
    label: "Vegetable",
    value: "vegetable",
    children: [
      { label: "Parsley", value: "parsley" },
      { label: "Lemongrass", value: "lemongrass" },
      { label: "Cabbage", value: "cabbage" },
    ],
  },
];

export const TreeSelectExample = () => {
  const [search, setSearch] = useState("");

  return (
    <TreeSelect
      options={EXAMPLE_OPTIONS}
      onChange={() => {}}
      onSelect={(e) => {
        setSearch(e.value);
      }}
      value={search}
    />
  );
};

export const Autocomplete = () => {
  const [search, setSearch] = useState("");

  return (
    <AutoComplete
      options={EXAMPLE_OPTIONS.filter((option) => {
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

export default InputStory;
