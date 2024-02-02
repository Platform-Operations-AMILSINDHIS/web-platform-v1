import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

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
      .eq("auth_id", user_auth_id);

    if (DBError) throw DBError;

    res.status(200).json({ status: true, message: "Account has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
    console.log(err);
  }
};

export default deleteHandler;
