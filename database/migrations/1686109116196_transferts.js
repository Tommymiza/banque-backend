"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = "transferts";
    }
    async up() {
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
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1686109116196_transferts.js.map