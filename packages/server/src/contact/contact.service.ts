import pool from "../config/database.js";
import type { CreateContactMessageInput } from "./contact.types.js";

export const createContactMessage = async (
  input: CreateContactMessageInput,
) => {
  const result = await pool.query(
    `
      INSERT INTO contact_messages (
        name,
        email,
        subject,
        message
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        created_at
    `,
    [
      input.name.trim(),
      input.email.trim().toLowerCase(),
      input.subject.trim(),
      input.message.trim(),
    ],
  );

  return result.rows[0];
};