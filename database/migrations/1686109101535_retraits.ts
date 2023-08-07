import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'retraits'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id_retrait");
      table.bigInteger("num_compte_retrait").notNullable().references("num_compte").inTable("users").onDelete("CASCADE");;
      table.dateTime("date_retrait").notNullable();
      table.bigInteger("montant_retrait");
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
