import { NextApiRequest, NextApiResponse } from "next";
import supabase from "./supabase";
import { userS3 } from "~/lib/aws/s3";
import { DeleteObjectsCommand, ListObjectsCommand } from "@aws-sdk/client-s3";

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
    const { data: UIDData, error: UIDError } = await supabase
      .from("general_accounts")
      .select("id")
      .eq("auth_id", user_auth_id)
      .single();

    const bucket_name = "kap-application-images";
    const s3_user_folder = `users/${UIDData?.id}`;

    const listObjectsResponse = await userS3.send(
      new ListObjectsCommand({
        Bucket: bucket_name,
        Prefix: s3_user_folder,
      })
    );

    const fileKeys = listObjectsResponse.Contents?.map(
      (content) => content.Key
    );

    // Validate on fileKeys
    if (fileKeys && fileKeys.length > 0) {
      console.log(
        `Removing S3 File Objects for user, auth_id --> ${user_auth_id}`
      );
      await userS3.send(
        new DeleteObjectsCommand({
          Bucket: bucket_name,
          Delete: {
            Objects: fileKeys.map((key) => ({ Key: key })),
            Quiet: true,
          },
        })
      );
    } else {
      console.log(`No S3 Meta to remove`);
    }

    if (UIDError) throw UIDError;

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
