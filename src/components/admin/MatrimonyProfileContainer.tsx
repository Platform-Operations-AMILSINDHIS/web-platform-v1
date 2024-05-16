import { Spinner, Text } from "@chakra-ui/react";
import MatrimonyProfileViewLayout from "~/layouts/MatrimonyProfileViewLayout";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import MatrimonyProfileView from "./MatrimonyProfileView";

interface MatrimonyProfileContainerProps {
  submission: MatrimonyFormValues;
}

const MatrimonyProfileContainer: React.FC<MatrimonyProfileContainerProps> = ({
  submission,
}) => {
  return (
    <>
      {submission ? (
        <MatrimonyProfileViewLayout submission={submission}>
          <MatrimonyProfileView submission={submission} />
        </MatrimonyProfileViewLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MatrimonyProfileContainer;
