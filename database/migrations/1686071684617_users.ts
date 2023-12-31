import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger("num_compte").primary().unique();
      table.bigInteger("num_cin").notNullable().unique();
      table.string("password", 255).notNullable();
      table.string("nom", 50).notNullable();
      table.string("prenom", 100).notNullable();
      table.string("adresse", 50).nullable().defaultTo("");
      table.bigInteger("solde").defaultTo(0);
      table.enum("type", ["admin", "client"]).notNullable().defaultTo("client");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }
  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
