import { GeneratedAlways } from "kysely";
import { AdapterAccountType } from "next-auth/adapters";
import { Database as KyselyDatabase } from "@auth/kysely-adapter";
export interface Database extends KyselyDatabase {
  User: {
    id: string;
    name: string | undefined;
    email: string;
    emailVerified: Date | null;
    image: string | undefined;
    hashed_password: string | undefined;
  };
  Account: {
    id: GeneratedAlways<string>;
    userId: string;
    type: AdapterAccountType;
    provider: string;
    providerAccountId: string;
    refresh_token: string | undefined;
    access_token: string | undefined;
    expires_at: number | undefined;
    token_type: Lowercase<string> | undefined;
    scope: string | undefined;
    id_token: string | undefined;
    session_state: string | undefined;
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
