import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

interface AdminLoginHandlerRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const AdminLoginHandler = async (
  req: AdminLoginHandlerRequest,
  res: NextApiResponse
) => {
  const { email, password } = req.body;
  try {
    const { data: adminData, error: authError } = await supabase
      .from("admin_accounts")
      .select("*")
      .eq("admin_email", email);

    if (authError) throw authError;

    if (adminData && adminData?.length > 0) {
      if (
        (adminData[0] as { admin_password: string })?.admin_password ??
        "" !== password
      ) {
        res.status(200).json({
          adminData: null,
          authenticated: false,
          message: "Invalid Password",
          type: "password",
        });
      } else {
        res.status(200).json({
          adminData: adminData,
          authenticated: true,
          message: "",
          type: "",
        });
      }
    } else {
      res.status(200).json({
        adminData: null,
        authenticated: false,
        message: "Account does not exist",
        type: "email",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      adminData: null,
      authenticated: false,
      message: "Internal Server Error",
      type: "server",
    });
  }
};

export default AdminLoginHandler;
