import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.post("/signup", "UsersController.signup");
Route.post("/login", "UsersController.login");
Route.get("/check", "UsersController.check");
Route.get("/logout", "UsersController.logout");
Route.get("/findall", "UsersController.find");
Route.post("/transactions", "UsersController.getTransaction");
Route.put("/updateinfo", "UsersController.update");
Route.delete("/deleteaccount", "UsersController.delete");
Route.delete("/deletetransaction", "UsersController.deleteTransaction");

Route.post("/adddepot", "DepotsController.add");
Route.post("/addretrait", "RetraitsController.add");
Route.post("/addtransfert", "TransfertsController.add");
