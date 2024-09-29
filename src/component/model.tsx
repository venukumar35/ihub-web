import { MantineSize, Modal, ScrollArea } from "@mantine/core";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  size: number | (string & {}) | MantineSize;
  onClose: () => void;
  opened: boolean;
  withCloseButton?: boolean;
};

function ModalComponent({
  children,
  title,
  size,
  onClose,
  opened,
  withCloseButton,
}: ModalProps) {
  return (
    <Modal
      size={size}
      radius={"sm"}
      opened={opened}
      onClose={onClose}
      title={<div className="text-xl font-bold">{title}</div>}
      padding="lg"
      overlayProps={{ backgroundOpacity: 0.1, blur: 2 }}
      yOffset={30}
      scrollAreaComponent={ScrollArea.Autosize}
      withCloseButton={withCloseButton}
      transitionProps={{ transition: "pop", duration: 300 }}
    >
      {children}
    </Modal>
  );
}

export default ModalComponent;
