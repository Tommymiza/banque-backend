import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from "@ioc:Adonis/Core/Hash"

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public numCompte: number

  @column()
  public numCIN: number

  @column()
  public password: string

  @column()
  public nom: string

  @column()
  public prenom: string

  @column()
  public adresse: string

  @column()
  public solde: number

  @column()
  public type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User){
    if(user.$dirty.password && user.password){
      user.password = await Hash.make(user.password);
    }
  }
}
