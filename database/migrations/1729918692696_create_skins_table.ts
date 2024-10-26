import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'skins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.text('description')
      table.decimal('price')
      table.string('weapon')
      table.string('category')
      table.string('wear')
      table.boolean('stattrak')
      table.boolean('souvenir')
      table.string('market_hash_name')
      table.text('image_path')
      table.decimal('quantity')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
