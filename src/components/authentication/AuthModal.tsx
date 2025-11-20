import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

interface AuthModalProps {
  modalState: boolean;
  authState: "login" | "signup" | "forgotPassword" | "addprofilepic";
  handleModal: () => void;
  authStateHandleFunction: (
    authState: "login" | "signup" | "forgotPassword" | "addprofilepic"
  ) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  modalState,
  authState,
  handleModal,
  authStateHandleFunction,
}) => {
  // needs better handling next time for a carry on state
  const [userId, setUserId] = useState<string>("");
  const [closeModal, setCloseModal] = useState(false);
  useEffect(() => {
    if (closeModal) {
      handleModal();
    }
  }, [closeModal]);
  return (
    <Modal onClose={handleModal} isOpen={modalState}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          {authState === "login" ? (
            <Login
              authStateHandleFunction={authStateHandleFunction}
              setCloseModal={setCloseModal}
            />
          ) : authState === "forgotPassword" ? (
            <ForgotPassword
              authStateHandleFunction={authStateHandleFunction}
              setCloseModal={setCloseModal}
            />
          ) : (
            <Signup
              authStateHandleFunction={authStateHandleFunction}
              setCloseModal={setCloseModal}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
