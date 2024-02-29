import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";
import React from "react";
import { error } from "console";
import { adminAtomBody } from "~/lib/atom";

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
      if (adminData[0].admin_password != password) {
        res
          .status(200)
          .json({ authenticated: false, authMessage: "Invalid Password" });
      }
      res.status(200).json({ loginValidated: true, message: "" });
    } else {
      res
        .status(200)
        .json({ loginValidated: false, message: "Account does not exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

export default AdminLoginHandler;
