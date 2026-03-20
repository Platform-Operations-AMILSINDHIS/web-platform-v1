import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { useRef, useState, useMemo } from "react";
import { DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import TableLayout from "~/layouts/TableLayout";
import { useProfileAtom } from "~/lib/atom";
import type { MembershipBufferDataType } from "~/types/tables/dataBuffer";
import { Status } from "~/types/tables/dataBuffer";
import { formMembershipBufferDataTableHeaders } from "~/utils/tableHeaders";
import { api } from "~/utils/api";

interface MembershipBufferTableProps {
  membershipBufferData: MembershipBufferDataType[];
  filterState: string;
  searchTerm: string;
  membershipType: string;
  applicantType: string;
}

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
};

const MembershipBufferTable: React.FC<MembershipBufferTableProps> = ({
  membershipBufferData,
  filterState,
  applicantType,
  membershipType,
  searchTerm,
}) => {
  const [, setProfileAtom] = useProfileAtom();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const deleteEntry = api.formBuffer.deleteFormBufferEntry.useMutation({
    onSuccess: () => {
      toast({ title: "Entry deleted", status: "success", duration: 3000, isClosable: true });
      onClose();
    },
    onError: (err) => {
      toast({ title: "Failed to delete", description: err.message, status: "error", duration: 4000, isClosable: true });
      onClose();
    },
  });

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
    onOpen();
  };

  const confirmDelete = () => {
    if (pendingDeleteId !== null) {
      deleteEntry.mutate({ id: pendingDeleteId });
    }
  };

  const filteredData = useMemo(() => {
    let data = membershipBufferData;

    if (searchTerm && searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      data = data.filter((buffer) => {
        const fullName = `${buffer?.submission.personalInfo.firstName} ${buffer?.submission.personalInfo.lastName}`.toLowerCase();
        return fullName.includes(lower);
      });
    }

    data = data.filter((buffer) =>
      filterState === "All"
        ? true
        : filterState === "Approved"
        ? buffer.status === Status.APPROVED
        : buffer.status === Status.PENDING
    );

    data = data.filter((buffer) =>
      applicantType === "All applicants"
        ? true
        : applicantType === "New applicants"
        ? buffer.isMember === false
        : buffer.isMember === true
    );

    data = data.filter((buffer) =>
      membershipType === "All members"
        ? true
        : membershipType === "KAP members"
        ? buffer.formType === "KAP"
        : buffer.formType === "YAC"
    );

    return data;
  }, [membershipBufferData, searchTerm, filterState, applicantType, membershipType]);

  return (
    <>
      <Flex justify="space-between" align="center" mb={2} px={1}>
        <Text fontSize="sm" color="gray.500">
          Showing{" "}
          <Text as="span" fontWeight="semibold" color="gray.700">
            {filteredData.length}
          </Text>{" "}
          of{" "}
          <Text as="span" fontWeight="semibold" color="gray.700">
            {membershipBufferData.length}
          </Text>{" "}
          entries
        </Text>
      </Flex>

      <TableLayout tableHeaders={formMembershipBufferDataTableHeaders}>
        {filteredData.map((buffer, index) => (
          <Tr
            fontSize="sm"
            key={buffer?.id ?? index}
            _hover={{ bg: "orange.50", transition: "background 0.15s" }}
            cursor="default"
          >
            <Td color="gray.400" fontWeight="medium">{index + 1}</Td>
            <Td>
              <Badge
                colorScheme={buffer?.formType === "KAP" ? "purple" : "blue"}
                variant="subtle"
                borderRadius="full"
                px={2}
              >
                {buffer?.formType}
              </Badge>
            </Td>
            <Td>
              <Badge
                colorScheme={buffer?.status === Status.APPROVED ? "green" : "yellow"}
                variant="subtle"
                borderRadius="full"
                px={2}
              >
                {buffer?.status}
              </Badge>
            </Td>
            <Td>
              <Text fontWeight="medium">
                {`${buffer?.submission.personalInfo.firstName} ${buffer?.submission.personalInfo.lastName}`}
              </Text>
              {buffer?.isMember && (
                <Text fontSize="xs" color="orange.500" fontWeight="semibold">
                  Existing Member
                </Text>
              )}
            </Td>
            <Td color="gray.600" fontSize="xs">{buffer?.submission.personalInfo.emailId}</Td>
            <Td color="gray.600" fontSize="xs">{`+91 ${buffer?.submission.personalInfo.mobileNumber}`}</Td>
            <Td>
              <Tooltip
                label={buffer?.created_at ? new Date(buffer.created_at).toLocaleString("en-IN") : ""}
                placement="top"
                hasArrow
              >
                <Text fontSize="xs" color="gray.500" cursor="default">
                  {buffer?.created_at ? formatRelativeTime(buffer.created_at) : "—"}
                </Text>
              </Tooltip>
            </Td>
            <Td>
              <Flex align="center" gap={1}>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="orange"
                  rightIcon={<ExternalLinkIcon />}
                  onClick={() => {
                    window.location.href = `/admin/${buffer?.user_id}.${buffer?.formType}`;
                    setProfileAtom({
                      selected_profile: {
                        form_id: buffer?.id,
                        user_id: buffer?.user_id,
                        formType: buffer?.formType,
                        status: buffer?.status,
                        isMember: buffer?.isMember,
                        paymentID: buffer?.paymentID,
                      },
                    });
                  }}
                >
                  View
                </Button>
                <IconButton
                  aria-label="Delete entry"
                  icon={<DeleteIcon />}
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDeleteClick(buffer?.id)}
                />
              </Flex>
            </Td>
          </Tr>
        ))}
      </TableLayout>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Entry
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this submission? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3} isLoading={deleteEntry.isLoading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default MembershipBufferTable;
