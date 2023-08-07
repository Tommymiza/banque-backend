"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get("/", async () => {
    return { hello: "world" };
});
Route_1.default.post("/signup", "UsersController.signup");
Route_1.default.post("/login", "UsersController.login");
Route_1.default.get("/check", "UsersController.check");
Route_1.default.get("/logout", "UsersController.logout");
Route_1.default.get("/findall", "UsersController.find");
Route_1.default.post("/transactions", "UsersController.getTransaction");
Route_1.default.put("/updateinfo", "UsersController.update");
Route_1.default.delete("/deleteaccount", "UsersController.delete");
Route_1.default.delete("/deletetransaction", "UsersController.deleteTransaction");
Route_1.default.post("/adddepot", "DepotsController.add");
Route_1.default.post("/addretrait", "RetraitsController.add");
Route_1.default.post("/addtransfert", "TransfertsController.add");
//# sourceMappingURL=routes.js.map