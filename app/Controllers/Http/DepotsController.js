"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Depot_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Depot"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Service/Ws"));
class DepotsController {
    async add({ request, response, auth }) {
        try {
            const user = await auth.authenticate();
            if (user.type !== "admin") {
                throw new Error("Authorization error");
            }
            const body = request.body();
            const { num_compte, solde } = body;
            await Depot_1.default.create({ numCompteDepot: num_compte, montantDepot: solde });
            const dest = await User_1.default.find(num_compte);
            if (dest) {
                dest.solde += solde;
                dest.save();
            }
            Ws_1.default.io.emit("updatesolde", { message: `${solde} Ar a été versé dans votre compte. Votre nouveau solde est ${dest?.solde} Ar`, solde: dest?.solde, num_compte: dest?.numCompte });
            response.status(200);
            response.send({ message: "Dépôt efféctué!" });
            response.finish();
        }
        catch (error) {
            if (error.errno === 1452) {
                response.abort({ error: "Compte introuvable!" }, 403);
            }
            response.abort({ error: "Administrateur requis!" }, 403);
        }
    }
}
exports.default = DepotsController;
//# sourceMappingURL=DepotsController.js.map