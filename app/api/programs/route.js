import { NextResponse } from "next/server";
import { getPrograms } from "../../../src/lib/programData";

export const revalidate = 300;

export async function GET() {
  const programs = await getPrograms();
  return NextResponse.json({
    count: programs.length,
    programs,
  });
}
