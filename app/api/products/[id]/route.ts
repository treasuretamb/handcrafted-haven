import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productResult = await pool.query(`
      SELECT p.*, u.name as seller_name, u.id as seller_user_id
      FROM products p
      JOIN users u ON p.seller_id = u.id
      WHERE p.id = $1
    `, [params.id]);

    if (productResult.rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const reviewsResult = await pool.query(`
      SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC
    `, [params.id]);

    return NextResponse.json({
      product: productResult.rows[0],
      reviews: reviewsResult.rows,
    });
  } catch (error) {
    console.error("Get product error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}