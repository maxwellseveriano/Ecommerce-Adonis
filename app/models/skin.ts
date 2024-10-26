import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Skin extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare weapon: string

  @column()
  declare category: string

  @column()
  declare wear: string

  @column()
  declare stattrak: boolean

  @column()
  declare souvenir: boolean

  @column()
  declare marketHashName: string

  @column()
  declare imagePath: string

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
