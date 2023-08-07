import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Transfert from "App/Models/Transfert";
import User from "App/Models/User";
import Ws from "App/Service/Ws";

export default class TransfertsController {
  public async add({ request, response, auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate();
      const body: any = request.body();
      const { numDest, solde }: { numDest: number; solde: number } = body;

      const userDest = await User.find(numDest);
      if (userDest) {
        await Transfert.create({
          compteExp: user.numCompte,
          compteDest: numDest,
          montantTrans: solde,
        });
        user.solde -= solde;
        user.save();
        userDest.solde =
          parseInt(userDest.solde.toString()) + parseInt(solde.toString());
        userDest.save();
      }else{
        throw new Error("Compte introuvable!")
      }
      Ws.io.emit("updatesolde", {
        message: `Vous avez reçu un transfert de ${solde} Ar. Votre nouveau solde est ${userDest?.solde} Ar`,
        solde: userDest?.solde,
        num_compte: userDest?.numCompte,
      });
      response.status(200);
      response.send({ message: "Transfert efféctué!", solde: user.solde });
      response.finish();
    } catch (error) {
      console.log(error);
      response.abort({ error: "Compte introuvable!" }, 403);
    }
  }
}
