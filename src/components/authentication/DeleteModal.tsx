import { Button, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import ModalLayout from "~/layouts/ModalLayout";
import { useUserAtom } from "~/lib/atom";

interface DeleteModalProps {
  modalState: boolean;
  handleModal: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  handleModal,
  modalState,
}) => {
  const [{ user }] = useUserAtom();
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(input);
    if (e.target.value === "") {
      setError(false);
    }
  };

  const handleConfirmDelete = async (input: string) => {
    setError(false);
    if (user?.email_id === input) {
      alert("matched");
    } else {
      setError(true);
    }
  };

  return (
    <ModalLayout handleModal={handleModal} modalState={modalState}>
      <Flex py={3} gap={3} align="center" flexDir="column">
        <Flex gap={3} align="center" flexDir="column">
          <Text fontSize="25px" fontWeight={800}>
            Delete Account ?
          </Text>
          <Text fontWeight={500} maxW={400} textAlign="center">
            Deleting your amount will remove you from our database and will
            unsubscribe you from our mailing list
          </Text>
        </Flex>
        <Flex my={2} gap={1} w="full" flexDir="column">
          <Text color={input === "" ? "" : "red.500"} fontWeight={600}>
            {input === ""
              ? "Enter email ID to confirm deletion"
              : "Note: Action is irreversible"}
          </Text>
          <InputGroup>
            <Input
              fontWeight={500}
              onChange={(e) => handleInput(e)}
              focusBorderColor="red.500"
            />
          </InputGroup>
          {error ? (
            <Text fontWeight={600} color="red.500" fontSize="14px">
              Invalid mail ID
            </Text>
          ) : (
            <></>
          )}
        </Flex>
        <Flex gap={3}>
          <Button
            onClick={() => handleConfirmDelete(input)}
            _hover={{
              border: "none",
              bg: "red.500",
              color: "white",
              fontWeight: "600",
            }}
            fontWeight={700}
            border="2px solid"
            borderColor="red.500"
            bg="white"
            color="red.500"
          >
            Confirm Delete
          </Button>
          <Button
            onClick={() => handleModal()}
            _hover={{
              border: "none",
              bg: "gray.800",
              color: "white",
            }}
            fontWeight={600}
            border="2px solid"
            bg="gray.700"
            color="white"
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </ModalLayout>
  );
};

export default DeleteModal;
