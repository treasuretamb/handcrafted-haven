import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { initDb } from "../../../lib/initDb";
import { auth } from "../../../auth";

export async function GET() {
  try {
    await initDb();
    const result = await pool.query(`
      SELECT p.*, u.name as seller_name
      FROM products p
      JOIN users u ON p.seller_id = u.id
      ORDER BY p.created_at DESC
    `);
    return NextResponse.json({ products: result.rows });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "seller") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, price, category, image } = await req.json();

    if (!name || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sellerId = (session.user as { id?: string }).id;

    const result = await pool.query(
      `INSERT INTO products (name, description, price, category, image, seller_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, category, image || "/snowman-figurine.webp", sellerId]
    );

    return NextResponse.json({ product: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}