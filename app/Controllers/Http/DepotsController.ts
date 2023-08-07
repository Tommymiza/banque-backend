import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Depot from 'App/Models/Depot';
import User from 'App/Models/User';
import Ws from 'App/Service/Ws';

interface TypeDepot {
    num_compte: number;
    solde: number;
  }
export default class DepotsController {
    public async add({request, response, auth}: HttpContextContract){
        try {
            const user = await auth.authenticate();
            if (user.type !== "admin") {
              throw new Error("Authorization error");
            }
            const body: any = request.body();
            const { num_compte, solde }: TypeDepot = body;
            await Depot.create({numCompteDepot: num_compte, montantDepot: solde})
            const dest = await User.find(num_compte);
            if(dest){
              dest.solde += solde;
              dest.save();
            }
            Ws.io.emit("updatesolde", {message: `${solde} Ar a été versé dans votre compte. Votre nouveau solde est ${dest?.solde} Ar`,solde: dest?.solde, num_compte: dest?.numCompte})
            response.status(200);
            response.send({message: "Dépôt efféctué!"});
            response.finish();
          } catch (error) {
            if(error.errno === 1452){
              response.abort({ error: "Compte introuvable!" }, 403);
            }
            response.abort({ error: "Administrateur requis!" }, 403);
          }
    }
}
