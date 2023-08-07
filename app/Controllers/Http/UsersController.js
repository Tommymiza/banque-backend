"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersController {
    async login({ request, response, auth }) {
        try {
            const user = await auth.attempt(request.body().numCompte, request.body().password);
            response.send({
                message: "Bienvenue à bord!",
                user: user.user.$original,
                token: user.token,
            });
        }
        catch (error) {
            console.log(error);
            if (error.responseText === "E_INVALID_AUTH_UID: User not found") {
                response.abort({ error: "Ce compte n'existe pas" }, 403);
            }
            else {
                response.abort({ error: "Le mot de passe est incorrect" }, 403);
            }
        }
    }
    async signup({ request, response }) {
        const body = request.body();
        const { numCompte, numCIN, password, nom, prenom, adresse } = body;
        try {
            await User_1.default.create({
                numCompte,
                numCIN,
                password,
                nom,
                prenom,
                adresse,
            });
            const message = "L'ajout de votre compte est effectuée!";
            response.status(200);
            response.send({ message });
            response.finish();
        }
        catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                response.abort({ error: "Le CIN est déjà utilisé" }, 401);
            }
            response.abort({ error: "Erreur d'ajout" }, 503);
        }
    }
    async check({ response, auth }) {
        try {
            const user = await auth.use("api").authenticate();
            response.send({ user: user.$original, message: "Bienvenue à bord!" });
        }
        catch (error) {
            response.abort({ error: "Session expirée!" }, 401);
        }
        response.finish();
    }
    async logout({ response, auth }) {
        try {
            await auth.use("api").revoke();
            response.status(200);
            response.send({ message: "Au revoir!" });
            response.finish();
        }
        catch (error) {
            console.log(error);
            response.abort({ error: "Veuillez réesayer!" }, 500);
        }
    }
    async find({ response, auth }) {
        try {
            const user = await auth.authenticate();
            if (user.type !== "admin") {
                throw new Error("Authorization error");
            }
            const list = await User_1.default.all();
            response.send({ list });
            response.status(200);
            response.finish();
        }
        catch (error) {
            response.abort({ error: "Administrateur requis!" }, 403);
        }
    }
    async delete({ request, response, auth }) {
        try {
            const user = await auth.authenticate();
            if (user.type !== "admin") {
                throw new Error("Authorization error");
            }
            const body = request.body();
            const { list } = body;
            var promise = [];
            list.forEach((item) => {
                promise.push(new Promise(async (resolve, reject) => {
                    try {
                        const client = await User_1.default.find(item);
                        await client?.delete();
                        resolve("success");
                    }
                    catch (error) {
                        reject(error);
                    }
                }));
            });
            await Promise.all(promise);
            const liste = await User_1.default.all();
            response.send({ liste });
            response.status(200);
            response.finish();
        }
        catch (error) {
            response.abort({ error: "Administrateur requis!" }, 403);
        }
    }
    async update({ request, response, auth }) {
        try {
            const user = await auth.authenticate();
            const body = request.body();
            const { nom, prenom, adresse, } = body;
            user.nom = nom;
            user.prenom = prenom;
            user.adresse = adresse;
            await user.save();
            response.status(200);
            response.send({
                message: "Mis à jour sauvegardé!",
                user: user.$original,
            });
            response.finish();
        }
        catch (error) {
            response.abort({ error: "Compte introuvable ou invalide!" }, 401);
        }
    }
    async getTransaction({ request, response, auth, }) {
        try {
            await auth.authenticate();
            const transactionD = await Database_1.default.rawQuery("SELECT id_depot as id, date_depot as Date, montant_depot as Montant FROM depots WHERE num_compte_depot = ?", [request.body().numCompte]);
            const transactionR = await Database_1.default.rawQuery("SELECT id_retrait as id, date_retrait as Date, montant_retrait as Montant FROM retraits WHERE num_compte_retrait = ?", [request.body().numCompte]);
            const transactionT = await Database_1.default.rawQuery("SELECT id_transfert as id, date_trans as Date, montant_trans as Montant, compte_dest as Destinataire FROM transferts WHERE compte_exp = ?", [request.body().numCompte]);
            transactionD[0].forEach((t) => {
                t.type = "Dépôt";
            });
            transactionR[0].forEach((t) => {
                t.type = "Retrait";
            });
            transactionT[0].forEach((t) => {
                t.type = "Transfert";
            });
            var transactions = [
                ...transactionD[0],
                ...transactionR[0],
                ...transactionT[0],
            ];
            response.status(200);
            response.send({ list: transactions.sort((a, b) => b.Date - a.Date) });
            response.finish();
        }
        catch (error) {
            console.log(error);
            response.abort({ error: "Compte invalide!" }, 401);
        }
    }
    async deleteTransaction({ request, response, auth, }) {
        try {
            const user = await auth.authenticate();
            const body = request.body();
            const { list } = body;
            var promise = [];
            list.forEach((item) => {
                promise.push(new Promise(async (resolve, reject) => {
                    try {
                        const sql = `DELETE FROM ${item.type.toLowerCase().replace("é", "e").replace("ô", "o")}s WHERE id_${item.type.toLowerCase().replace("é", "e").replace("ô", "o")} = ${item.id}`;
                        const resultat = await Database_1.default.rawQuery(sql);
                        resolve(true);
                    }
                    catch (error) {
                        reject(false);
                    }
                }));
            });
            await Promise.all(promise);
            const transactionD = await Database_1.default.rawQuery("SELECT id_depot as id, date_depot as Date, montant_depot as Montant FROM depots WHERE num_compte_depot = ?", [user.$original.numCompte]);
            const transactionR = await Database_1.default.rawQuery("SELECT id_retrait as id, date_retrait as Date, montant_retrait as Montant FROM retraits WHERE num_compte_retrait = ?", [user.$original.numCompte]);
            const transactionT = await Database_1.default.rawQuery("SELECT id_transfert as id, date_trans as Date, montant_trans as Montant, compte_dest as Destinataire FROM transferts WHERE compte_exp = ?", [user.$original.numCompte]);
            transactionD[0].forEach((t) => {
                t.type = "Dépôt";
            });
            transactionR[0].forEach((t) => {
                t.type = "Retrait";
            });
            transactionT[0].forEach((t) => {
                t.type = "Transfert";
            });
            var transactions = [
                ...transactionD[0],
                ...transactionR[0],
                ...transactionT[0],
            ];
            response.status(200);
            response.send({ list: transactions });
            response.finish();
        }
        catch (error) {
            console.log(error);
            response.abort({ error: "Compte requis requis!" }, 403);
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map