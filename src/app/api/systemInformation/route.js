import { getSystemInformationData } from "@/lib/system_information";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const data = await getSystemInformationData();
  return NextResponse.json(data);
};
