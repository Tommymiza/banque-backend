import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "transferts";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id_transfert");
      table.bigInteger("compte_exp").notNullable();
      table.bigInteger("compte_dest").notNullable();
      table.dateTime("date_trans").notNullable();
      table.bigInteger("montant_trans");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
