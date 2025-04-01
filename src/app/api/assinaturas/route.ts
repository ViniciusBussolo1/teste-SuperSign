import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autorizado!" }, { status: 401 });
  }

  const { documentId, signatureImg } = await request.json();

  try {
    await prisma?.signature.create({
      data: {
        documentId,
        userId: session.user.id,
        signatureImg,
        signedAt: new Date(),
      },
    });

    await prisma?.document.update({
      where: { id: documentId },
      data: { status: "SIGNED", updatedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao criar a assinatura:", error);
    return NextResponse.json(
      { error: "Erro ao criar a assinatura" },
      { status: 500 }
    );
  }
}
