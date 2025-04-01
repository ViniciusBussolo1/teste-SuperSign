import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!session) {
    return NextResponse.json({ error: "Não autorizado!" }, { status: 401 });
  }

  const document = await prisma?.document.findUnique({
    where: {
      id: id as string,
      userId: session.user.id,
    },
    include: { signature: true },
  });

  if (!document) {
    return NextResponse.json(
      { error: "Documento não encontrado!" },
      { status: 404 }
    );
  }

  return NextResponse.json(document);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!session || !id) {
    return NextResponse.json({ error: "Não autorizado!" }, { status: 401 });
  }

  await prisma?.signature.deleteMany({
    where: {
      documentId: id,
    },
  });

  await prisma?.document.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  return NextResponse.json({ success: true });
}
