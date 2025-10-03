import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  // Verify the secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path } = body;

    if (!path) {
      // If no specific path is provided, revalidate the home page
      revalidatePath("/", "page");
      return NextResponse.json({
        revalidated: true,
        message: "Home page revalidated successfully",
        now: Date.now(),
      });
    }

    // Revalidate the specific path
    revalidatePath(path, "page");

    return NextResponse.json({
      revalidated: true,
      message: `Path '${path}' revalidated successfully`,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Optional: Add a GET method for simple revalidation without body
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path");

  // Verify the secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    // If no specific path is provided, revalidate the home page
    if (!path) {
      revalidatePath("/", "page");
      return NextResponse.json({
        revalidated: true,
        message: "Home page revalidated successfully",
        now: Date.now(),
      });
    }

    // Revalidate the specific path
    revalidatePath(path, "page");

    return NextResponse.json({
      revalidated: true,
      message: `Path '${path}' revalidated successfully`,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
