import { env } from "~/env.mjs";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";

interface DBHandlerRequest extends NextApiRequest {
  body: {
    email: string;
    account_name: string;
    KAP_member: boolean;
    YAC_member: boolean;
    age: number;
    membership_id: string;
    gender: string;
    first_name: string;
    last_name: string;
  };
}

const DBHandler = async (req: DBHandlerRequest, res: NextApiResponse) => {
  const {
    email,
    account_name,
    gender,
    first_name,
    last_name,
    KAP_member,
    YAC_member,
    age,
  } = req.body;
  try {
    const { data, error } = await supabase.from("general_accounts").upsert([
      {
        email_id: email,
        account_name,
        KAP_member,
        YAC_member,
        age,
        membership_id: "",
        gender,
        first_name,
        last_name,
      },
    ]);

    if (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }

    res.status(200).send({ message: "User added to database", data });
  } catch (error) {
    console.log(error);
  }
};

export default DBHandler;
