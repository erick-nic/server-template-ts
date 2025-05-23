import { Hono }from "hono";
import Users from "../controllers/users.controller.ts";

const userRoute = new Hono();
userRoute.get("/users", Users.getUsers);

export default userRoute;
