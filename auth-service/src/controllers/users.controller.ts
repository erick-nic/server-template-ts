import { Context } from "hono";
import client from "../configs/database/connection.ts";
import IUser from "../types/users.ts";

class Users {
    static async getUsers(context: Context) {
        const result = await client.queryObject(`
            SELECT * FROM users
            `);
        return context.json(result.rows);
    }

    static async signUp(context: Context) {
        const body = await context.req.json();
        const user: IUser = body;

        if (!user.name || !user.email || !user.password) {
            return context.json({ message: "All fields are required" }, 400);
        }

        const emailExists = await client.queryObject(`
            SELECT *
            FROM users
            WHERE email = $1
            `, [ user.email ]
        );

        if (emailExists.rows.length > 0) {
            return context.json({ message: "Email already exists" }, 400);
        }

        const result = await client.queryObject<{ id: number }>(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id
        `, [ user.name, user.email,user.password, user.role, user.phoneNumber ]);
        return context.json(result.rows[ 0 ] as { id: number });
    }
}

export default Users;
