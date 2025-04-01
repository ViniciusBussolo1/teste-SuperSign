import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autorizado!" }, { status: 401 });
  }

  const documents = await prisma?.document.findMany({
    where: { userId: session.user.id },
    include: { signature: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(documents);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autorizado!" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const name = file.name;

  if (!file) {
    return NextResponse.json(
      { error: "O arquivo é obrigatório" },
      { status: 400 }
    );
  }

  const fileKey = `doc-${Date.now()}-${name}`;

  const document = await prisma?.document.create({
    data: {
      name,
      fileKey,
      userId: session.user.id,
      status: "PENDING",
    },
  });

  return NextResponse.json(document);
}
