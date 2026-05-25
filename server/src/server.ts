// server/src/server.ts
import express, { Request, Response } from 'express';
import * as crypto from 'crypto';

const app = express();
app.use(express.json());

// Interface untuk tipe data (Keunggulan TypeScript!)
interface DocumentPayload {
  title: string;
  lecturerName: string;
  documentType?: string;
  fileContentMock?: string;
}

app.post('/api/document/upload', (req: Request<{}, {}, DocumentPayload>, res: Response) => {
  const { title, lecturerName, documentType } = req.body;

  if (!title || !lecturerName) {
    return res.status(400).json({ error: "Judul dan Nama Dosen wajib diisi." });
  }

  const hashSHA256 = crypto.createHash('sha256').update(title).digest('hex');

  res.status(201).json({
    message: "Backend TypeScript berhasil memproses dokumen!",
    data: { title, lecturerName, documentType, hashSHA256 }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server TypeScript berjalan di http://localhost:${PORT}`);
});