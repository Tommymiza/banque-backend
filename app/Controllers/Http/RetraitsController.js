"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Retrait_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Retrait"));
class RetraitsController {
    async add({ request, response, auth }) {
        try {
            const user = await auth.authenticate();
            const body = request.body();
            const { solde } = body;
            await Retrait_1.default.create({ numCompteRetrait: user.numCompte, montantRetrait: solde });
            user.solde -= solde;
            user.save();
            response.status(200);
            response.send({ message: "Retrait efféctué!", solde: user.solde });
            response.finish();
        }
        catch (error) {
            console.log(error);
            if (error.errno === 1452) {
                response.abort({ error: "Compte introuvable!" }, 403);
            }
            response.abort({ error: "Administrateur requis!" }, 403);
        }
    }
}
exports.default = RetraitsController;
//# sourceMappingURL=RetraitsController.js.map