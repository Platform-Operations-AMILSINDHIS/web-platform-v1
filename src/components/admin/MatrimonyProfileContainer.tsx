import { Spinner } from "@chakra-ui/react";
import MatrimonyProfileViewLayout from "~/layouts/MatrimonyProfileViewLayout";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import MatrimonyProfileView from "./MatrimonyProfileView";

interface MatrimonyProfileContainerProps {
  submission: MatrimonyFormValues;
  user_id: string;
}

const MatrimonyProfileContainer: React.FC<MatrimonyProfileContainerProps> = ({
  submission,
  user_id,
}) => {
  return (
    <>
      {submission ? (
        <MatrimonyProfileViewLayout>
          <MatrimonyProfileView user_id={user_id} submission={submission} />
        </MatrimonyProfileViewLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MatrimonyProfileContainer;
