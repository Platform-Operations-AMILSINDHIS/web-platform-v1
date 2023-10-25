import { env } from "~/env.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase_URL = env.SUPABASE_URL;
const supabase_API_KEY = env.SUPABASE_API_KEY;

const supabase = createClient(supabase_URL, supabase_API_KEY);
