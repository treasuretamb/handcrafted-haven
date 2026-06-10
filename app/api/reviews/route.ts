import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { productId, author, rating, comment } = await req.json();

    if (!productId || !author || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO reviews (product_id, author, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [productId, author, rating, comment]
    );

    return NextResponse.json({ review: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}