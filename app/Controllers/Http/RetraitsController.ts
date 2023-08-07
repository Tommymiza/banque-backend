import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Retrait from 'App/Models/Retrait';

export default class RetraitsController {
    public async add({request, response, auth}: HttpContextContract){
        try {
            const user = await auth.authenticate();
            const body: any = request.body();
            const { solde }: {solde: number} = body;
            await Retrait.create({numCompteRetrait: user.numCompte, montantRetrait: solde})
            user.solde -= solde;
            user.save();
            response.status(200);
            response.send({message: "Retrait efféctué!", solde: user.solde});
            response.finish();
          } catch (error) {
            console.log(error)
            if(error.errno === 1452){
              response.abort({ error: "Compte introuvable!" }, 403);
            }
            response.abort({ error: "Administrateur requis!" }, 403);
          }
    }
}
