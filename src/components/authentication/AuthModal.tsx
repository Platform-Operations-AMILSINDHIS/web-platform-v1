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
import ProfilePicture from "./ProfilePicture";

import { Values } from "~/hooks/useForm";

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
  const [signUpFormValues, setSignUpFormValues] = useState<Values | null>(null);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    if (closeModal) handleModal();
  }, [closeModal, handleModal]);

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
          ) : authState === "addprofilepic" ? (
            <ProfilePicture
              signUpFormValues={signUpFormValues}
              setSignUpFormValues={setSignUpFormValues}
              authStateHandleFunction={authStateHandleFunction}
              setCloseModal={setCloseModal}
            />
          ) : (
            <Signup
              signUpFormValues={signUpFormValues}
              authStateHandleFunction={authStateHandleFunction}
              setSignUpFormValues={setSignUpFormValues}
              setCloseModal={setCloseModal}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
