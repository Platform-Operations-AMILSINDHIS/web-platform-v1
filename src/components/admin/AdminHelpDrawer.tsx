import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

interface HelpSection {
  title: string;
  icon: string;
  content: React.ReactNode;
}

const helpSections: HelpSection[] = [
  {
    title: "Dashboard Overview",
    icon: "🗂️",
    content: (
      <VStack align="start" spacing={2} fontSize="sm" color="gray.600">
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Tab Switcher:</Text>{" "}
          Use the dropdown (top right) to switch between <Text as="span" fontWeight="semibold">Memberships</Text> and{" "}
          <Text as="span" fontWeight="semibold">Matrimony</Text> views.
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Search:</Text>{" "}
          Type a member's name in the search bar to filter the list in real time.
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Status Filter:</Text>{" "}
          Filter by <Text as="span" fontWeight="semibold">Approved</Text>, <Text as="span" fontWeight="semibold">Pending</Text>, or{" "}
          <Text as="span" fontWeight="semibold">All</Text> using the Status dropdown.
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Membership Filters (Members tab only):</Text>{" "}
          Further narrow results by applicant type (New / Existing) or membership type (KAP / YAC).
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Row Count:</Text>{" "}
          The "Showing X of Y entries" indicator above each table tells you how many rows match the current filters.
        </Text>
      </VStack>
    ),
  },
  {
    title: "Reviewing Applications",
    icon: "✅",
    content: (
      <VStack align="start" spacing={2} fontSize="sm" color="gray.600">
        <Text>
          Click the <Text as="span" fontWeight="semibold" color="orange.600">View</Text> button on any row to open the applicant's full profile and form submission.
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Approve:</Text>{" "}
          Clicking <Text as="span" fontWeight="semibold">Approve</Text> will automatically generate a membership ID, update the applicant's account, and send them a confirmation email with their membership card PDF.
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Reject:</Text>{" "}
          Clicking <Text as="span" fontWeight="semibold">Reject</Text> will send the applicant a rejection email and mark their application accordingly.
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Matrimony Applications:</Text>{" "}
          Matrimony approvals require no payment ID. Approving creates a matrimony profile and sends a confirmation email.
        </Text>
        <Text color="orange.600" fontWeight="medium">
          ⚠️ Approval/rejection actions are irreversible. Review carefully before acting.
        </Text>
      </VStack>
    ),
  },
  {
    title: "Profile Requests",
    icon: "💌",
    content: (
      <VStack align="start" spacing={2} fontSize="sm" color="gray.600">
        <Text>
          The <Text as="span" fontWeight="semibold" color="orange.600">Profile Requests</Text> button (top right, with a count badge) shows all pending matrimony profile requests.
        </Text>
        <Text>
          Each card shows the <Text as="span" fontWeight="semibold">requester</Text> (left) and the{" "}
          <Text as="span" fontWeight="semibold">requested profile</Text> (right), along with their matrimony IDs, requester's email, and when the request was made.
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Accept:</Text>{" "}
          Sends the requested person's full matrimony profile as a PDF to the requester's email. The request is then removed from the list.
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.800">Decline:</Text>{" "}
          Sends a polite decline email to the requester and removes the request. The office email (amilsindhis@gmail.com) is CC'd on accepted requests for record keeping.
        </Text>
      </VStack>
    ),
  },
  {
    title: "Deleting Entries",
    icon: "🗑️",
    content: (
      <VStack align="start" spacing={2} fontSize="sm" color="gray.600">
        <Text>
          Each row in the membership and matrimony tables has a{" "}
          <Text as="span" fontWeight="semibold" color="red.500">Delete</Text> icon (🗑️) next to the View button.
        </Text>
        <Text>
          Use this to remove <Text as="span" fontWeight="semibold">duplicate submissions</Text> or{" "}
          <Text as="span" fontWeight="semibold">incorrect entries</Text> from the dashboard.
        </Text>
        <Text>
          A confirmation dialog will appear before deleting. Once confirmed, the entry is permanently removed from the form buffer.
        </Text>
        <Text color="red.600" fontWeight="medium">
          ⚠️ Deletion only removes the submission record. It does NOT delete the user's account or any approved membership.
        </Text>
      </VStack>
    ),
  },
  {
    title: "Uploading Matrimony Photos",
    icon: "📷",
    content: (
      <VStack align="start" spacing={2} fontSize="sm" color="gray.600">
        <Text>
          After approving a matrimony application, an{" "}
          <Text as="span" fontWeight="semibold" color="orange.600">Upload Photo</Text> section will appear at the bottom of that applicant's detail page.
        </Text>
        <Text>
          You can upload up to <Text as="span" fontWeight="semibold">3 photos</Text> per member. The photos are stored in S3 and linked to their matrimony profile.
        </Text>
        <Text>
          Navigate to the applicant: click <Text as="span" fontWeight="semibold">View</Text> on an{" "}
          <Text as="span" color="green.600" fontWeight="semibold">Approved</Text> matrimony entry → scroll to the bottom.
        </Text>
        <Text>
          Supported formats: JPEG, PNG. Max size: 5 MB per photo.
        </Text>
      </VStack>
    ),
  },
  {
    title: "Adding New Admins",
    icon: "👤",
    content: (
      <VStack align="start" spacing={2} fontSize="sm" color="gray.600">
        <Text>
          Click the <Text as="span" fontWeight="semibold">Add Admin</Text> button (top right of the dashboard) to create a new admin account.
        </Text>
        <Text>
          New admins are provisioned immediately. Share the credentials securely with the new admin and ask them to log in at <Text as="span" fontWeight="mono" color="orange.600">/admin/auth</Text>.
        </Text>
        <Text color="orange.600" fontWeight="medium">
          ⚠️ Only share admin credentials over a secure channel. Do not send passwords in plain text email or WhatsApp.
        </Text>
      </VStack>
    ),
  },
];

const AdminHelpDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Floating help button */}
      <Tooltip label="Admin Help Guide" placement="left" hasArrow>
        <IconButton
          aria-label="Open help guide"
          icon={<QuestionOutlineIcon boxSize={5} />}
          position="fixed"
          bottom={6}
          right={6}
          zIndex={999}
          borderRadius="full"
          size="lg"
          bg="#FF4D00"
          color="white"
          _hover={{ bg: "#E03A00", transform: "scale(1.05)" }}
          _active={{ transform: "scale(0.97)" }}
          boxShadow="lg"
          transition="all 0.15s"
          onClick={onOpen}
        />
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.100">
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Admin Help Guide
            </Text>
            <Text fontSize="xs" color="gray.400" fontWeight="normal" mt={0.5}>
              Click a section to expand it
            </Text>
          </DrawerHeader>

          <DrawerBody px={0} py={4}>
            <Accordion allowMultiple defaultIndex={[0]}>
              {helpSections.map((section, i) => (
                <AccordionItem key={i} border="none" mb={1}>
                  <AccordionButton
                    px={5}
                    py={3}
                    _hover={{ bg: "orange.50" }}
                    _expanded={{ bg: "orange.50", borderLeft: "3px solid", borderLeftColor: "#FF4D00" }}
                    transition="all 0.15s"
                  >
                    <Box flex={1} textAlign="left">
                      <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                        <Text as="span" mr={2}>{section.icon}</Text>
                        {section.title}
                      </Text>
                    </Box>
                    <AccordionIcon color="gray.400" />
                  </AccordionButton>
                  <AccordionPanel px={5} pb={4} bg="gray.50" borderBottom="1px solid" borderColor="gray.100">
                    {section.content}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>

            <Box px={5} pt={6} pb={2}>
              <Text fontSize="xs" color="gray.400" textAlign="center">
                Need more help? Contact the site developer or check the project documentation.
              </Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AdminHelpDrawer;
