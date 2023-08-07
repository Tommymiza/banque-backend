"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transfert_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Transfert"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Service/Ws"));
class TransfertsController {
    async add({ request, response, auth }) {
        try {
            const user = await auth.authenticate();
            const body = request.body();
            const { numDest, solde } = body;
            const userDest = await User_1.default.find(numDest);
            if (userDest) {
                await Transfert_1.default.create({
                    compteExp: user.numCompte,
                    compteDest: numDest,
                    montantTrans: solde,
                });
                user.solde -= solde;
                user.save();
                userDest.solde =
                    parseInt(userDest.solde.toString()) + parseInt(solde.toString());
                userDest.save();
            }
            else {
                throw new Error("Compte introuvable!");
            }
            Ws_1.default.io.emit("updatesolde", {
                message: `Vous avez reçu un transfert de ${solde} Ar. Votre nouveau solde est ${userDest?.solde} Ar`,
                solde: userDest?.solde,
                num_compte: userDest?.numCompte,
            });
            response.status(200);
            response.send({ message: "Transfert efféctué!", solde: user.solde });
            response.finish();
        }
        catch (error) {
            console.log(error);
            response.abort({ error: "Compte introuvable!" }, 403);
        }
    }
}
exports.default = TransfertsController;
//# sourceMappingURL=TransfertsController.js.map