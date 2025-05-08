import { Context } from "hono";
import client from "../database/connection.ts";
import bcrypt from "bcrypt";
import IUser from "../types/user.ts";

class Users {
    static async getUsers(context: Context) {
        const result = await client.queryObject(`
            SELECT * FROM users
            `);
        context.json(result.rows);
    }

    static async signUp(context: Context) {
        const body = await context.req.json();
        const user: IUser = body;

        if (!user.name || !user.email || !user.password) {
            context.json({ message: "All fields are required" }, 400);
            return;
        }

        const hashedPassword = bcrypt.hashSync(user.password, 8);
        const emailExists = await client.queryObject(`
            SELECT *
            FROM users
            WHERE email = $1
            `, [ user.email ]
        );

        if (emailExists.rows.length > 0) {
            context.json({ message: "Email already exists" }, 400);
            return;
        }

        const result = await client.queryObject<{ id: number }>(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id
        `, [ user.name, user.email, hashedPassword, user.role, user.phoneNumber ]);
        context.json(result.rows[ 0 ] as { id: number });
    }
}

export default Users;
