import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transfert extends BaseModel {
  @column({ isPrimary: true })
  public idTransfert: number

  @column()
  public compteExp: number

  @column()
  public compteDest: number

  @column.dateTime({autoCreate: true})
  public dateTrans: DateTime

  @column()
  public montantTrans: number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
