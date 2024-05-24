// // middleware/db.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { connectDB } from "@/database/database";
// import { NextResponse } from "next/server";

// export default async function dbMiddleware(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     await connectDB();
//     return NextResponse.next();
//   } catch (error) {
//     console.log("Error connecting to database:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
