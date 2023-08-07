import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Retrait extends BaseModel {
  @column({ isPrimary: true })
  public idRetrait: number

  @column()
  public numCompteRetrait: number

  @column.dateTime({autoCreate: true})
  public dateRetrait: DateTime

  @column()
  public montantRetrait: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
