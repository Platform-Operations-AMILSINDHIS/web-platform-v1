import { useState } from "react";

const useFooter = () => {
  const [modalText, setModalText] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const handleSetTCModal = (modalTitle, modalText) => {};
  const handleSetPPModal = (modalTitle, modalText) => {};
  const handleSetRPModal = (modalTitle, modalText) => {};
  return {
    modalTitle,
    modalText,
  };
};

export default useFooter;
