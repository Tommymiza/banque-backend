import type { AuthConfig } from "@ioc:Adonis/Addons/Auth";

const authConfig: AuthConfig = {
  guard: "api",
  guards: {
    api: {
      driver: "oat",
      tokenProvider: {
        type: "api",
        driver: "database",
        table: "api_tokens",
        foreignKey: "num_compte_id",
      },

      provider: {
        driver: "lucid",
        identifierKey: "numCompte",
        uids: ["numCompte", "numCIN"],
        model: () => import("App/Models/User"),
      },
    },
  },
};

export default authConfig;
