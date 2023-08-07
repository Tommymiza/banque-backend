import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "depots";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id_depot");
      table.bigInteger("num_compte_depot").notNullable().references("num_compte").inTable("users").onDelete("CASCADE");;
      table.dateTime("date_depot").notNullable();
      table.bigInteger("montant_depot");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
