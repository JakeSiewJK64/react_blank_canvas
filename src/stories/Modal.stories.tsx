import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Modal, ModalProvider, useModal } from "../components/Modal";
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

const DemoModalsEvent = () => {
  const modal = useModal();

  return (
    <Button
      variant="outline"
      onClick={() => {
        modal?.openModal({
          children: (
            <>
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </span>
              <Button
                size="sm"
                onClick={() =>
                  modal.openModal({
                    title: "Sub Dialog",
                    children: "this is a sub dialog",
                    onClose: modal.closeModal,
                  })
                }
              >
                Open Sub-Dialog
              </Button>
            </>
          ),
          onCancel: modal.closeModal,
          onClose: modal.closeModal,
        });
      }}
    >
      Open Confirm
    </Button>
  );
};

const ModalStory: Meta<typeof Modal> = {
  title: "Core/Modal",
  component: Modal,
  render: (args) => <Demo {...args} />,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { type: "string", description: "title of the modal" },
    onCancel: { type: "function", description: "on confirm callback" },
    onConfirm: { type: "function", description: "on confirm callback" },
    onClose: { type: "function", description: "on close callback" },
    className: { type: "string", description: "styling class names" },
    children: {
      description: "react components to be rendered inside the modal",
    },
  },
};

export const Standard = {
  args: {
    title: "Standard Modal",
  },
};
export const WithoutCloseButton = {
  args: {
    withCloseButton: false,
  },
};
export const WithoutFooter = {
  args: {
    withFooter: false,
  },
};
export const UseModalsHook: StoryFn = () => (
  <ModalProvider>
    <DemoModalsEvent />
  </ModalProvider>
);

export default ModalStory;
