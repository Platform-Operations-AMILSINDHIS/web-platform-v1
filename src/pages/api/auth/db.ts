// DBHandler.ts - Fixed with proper error handling
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";
import hasher from "~/utils/hasher";

interface DBHandlerRequest extends NextApiRequest {
  body: {
    email: string;
    authID: string;
    password: string;
    account_name: string;
    KAP_member: boolean;
    YAC_member: boolean;
    membership_id: string;
    date_of_birth: string;
    gender: string;
    first_name: string;
    last_name: string;
  };
}

const DBHandler = async (req: DBHandlerRequest, res: NextApiResponse) => {
  const {
    email,
    authID,
    password,
    account_name,
    membership_id,
    gender,
    first_name,
    last_name,
    KAP_member,
    YAC_member,
    date_of_birth,
  } = req.body;

  try {
    const hashed_password = await hasher(password)
    const { data, error } = await supabase
      .from("general_accounts")
      .insert([
        {
          email_id: email,
          auth_id: authID,
          password: hashed_password,
          membership_id: null,
          account_name,
          KAP_member,
          YAC_member,
          date_of_birth,
          gender,
          first_name,
          last_name,
        },
      ])
      .select();

    if (error) {
      console.error("Database insertion error:", error.message);
      return res.status(500).json({
        message: "Failed to create user account",
        error: error.message,
        authenticated: false,
      });
    }

    // Validate data exists
    if (!data || data.length === 0) {
      return res.status(500).json({
        message: "User creation failed - no data returned",
        authenticated: false,
      });
    }

    return res.status(200).json({
      message: "User added to database",
      data,
      authenticated: true,
    });
  } catch (error) {
    console.error("Unexpected error in DBHandler:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
      authenticated: false,
    });
  }
};

export default DBHandler;
