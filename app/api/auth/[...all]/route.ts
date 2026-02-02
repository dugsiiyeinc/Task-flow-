
import { auth } from "@/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET, PUT, DELETE } = toNextJsHandler(auth);