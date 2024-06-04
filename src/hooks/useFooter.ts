import { useState } from "react";

interface useFooterProps {
  modalHandler: () => void;
}

const useFooter = ({ modalHandler }: useFooterProps) => {
  const [modalText, setModalText] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const handleSetTCModal = () => {};
  const handleSetPPModal = () => {};
  const handleSetRPModal = () => {};
  return {
    handleSetPPModal,
    handleSetTCModal,
    handleSetRPModal,
    modalTitle,
    modalText,
  };
};

export default useFooter;
