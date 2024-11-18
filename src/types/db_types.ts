import { GeneratedAlways } from "kysely";
import { AdapterAccountType } from "next-auth/adapters";

export interface Database {
  User: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    hashed_password: string | null;
  };
  Account: {
    id: GeneratedAlways<string>;
    userId: string;
    type: AdapterAccountType;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | undefined;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  };
  Session: {
    id: GeneratedAlways<string>;
    userId: string;
    sessionToken: string;
    expires: Date;
  };
  VerificationToken: {
    identifier: string;
    token: string;
    expires: Date;
  };
}
