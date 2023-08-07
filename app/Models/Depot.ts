import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Depot extends BaseModel {
  @column({ isPrimary: true })
  public idDepot: number

  @column()
  public numCompteDepot: number

  @column.dateTime({autoCreate: true})
  public dateDepot: DateTime

  @column()
  public montantDepot: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
