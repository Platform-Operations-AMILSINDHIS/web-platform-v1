import { useState } from "react";
import { footerTCPPModalContent } from "~/constants/LandingConstants";

interface useFooterProps {
  modalHandler: () => void;
}

const useFooter = ({ modalHandler }: useFooterProps) => {
  const [modalText, setModalText] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  const handleSetTCModal = () => {
    setModalText(footerTCPPModalContent[0]?.modalText ?? "");
    setModalTitle(footerTCPPModalContent[0]?.modalTitle ?? "");
    modalHandler();
  };

  const handleSetPPModal = () => {
    setModalText(footerTCPPModalContent[1]?.modalText ?? "");
    setModalTitle(footerTCPPModalContent[1]?.modalTitle ?? "");
    modalHandler();
  };

  const handleSetRPModal = () => {
    setModalText(footerTCPPModalContent[2]?.modalText ?? "");
    setModalTitle(footerTCPPModalContent[2]?.modalTitle ?? "");
    modalHandler();
  };

  return {
    handleSetPPModal,
    handleSetTCModal,
    handleSetRPModal,
    modalTitle,
    modalText,
  };
};

export default useFooter;
