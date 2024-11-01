import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stickers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable
      table.text('description')
      table.decimal('price')
      table.integer('quantity')
      table.string('market_hash_name').notNullable
      table.text('image_path')
      table.string('type')
      table.string('effect')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
