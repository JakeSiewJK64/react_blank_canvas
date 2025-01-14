import { useState } from "react";
import { Meta } from "@storybook/react";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";

const Demo = (props: { withFooter?: boolean; withCloseButton?: boolean }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Show Modal
      </Button>
      <Modal
        showModal={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        onClose={() => {
          setShowModal(false);
        }}
        {...props}
      >
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </span>
      </Modal>
    </>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const ModalStory: Meta<typeof Modal> = {
  title: "Example/Modal",
  component: Modal,
  render: (args) => <Demo {...args} />,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard = {
  args: {},
};
export const WithCloseButton = {
  args: {
    withCloseButton: false,
  },
};
export const WithoutFooter = {
  args: {
    withFooter: false,
  },
};

export default ModalStory;
