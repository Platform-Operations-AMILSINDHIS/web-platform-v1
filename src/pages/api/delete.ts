import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./auth/supabase";

interface DeleteHandlerRequest extends NextApiRequest {
  body: {
    user_auth_id: string;
  };
}

const deleteHandler = async (
  req: DeleteHandlerRequest,
  res: NextApiResponse
) => {
  const { user_auth_id } = req.body;

  try {
    const { error: AuthError } = await supabase.auth.admin.deleteUser(
      user_auth_id
    );

    if (AuthError) throw AuthError;

    const { error: DBError } = await supabase
      .from("general_accounts")
      .delete()
      .eq("id", 1);

    if (DBError) throw DBError;

    res.status(200).json({ message: "Account has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export default deleteHandler;
