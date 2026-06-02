// server/src/domain/Admin.ts
import { User } from './User';
import { Dosen } from './Dosen';

export class Admin extends User {
  constructor(email: string, passwordHash: string) {
    super(email, passwordHash);
  }

  public assignKaprodi(dosen: Dosen): void {
    // Business Rule: Dosen must have a NIP to be assigned a position
    if (!dosen.getNip()) {
      throw new Error('Dosen harus memiliki NIP yang valid untuk diangkat sebagai Kaprodi.');
    }
    // Logic for assignment is tracked in Jabatan history (Repository/Service job)
    // but the Admin entity validates the eligibility
  }

  public assignKajur(dosen: Dosen): void {
    if (!dosen.getNip()) {
      throw new Error('Dosen harus memiliki NIP yang valid untuk diangkat sebagai Kajur.');
    }
  }

  public tambahPengguna(pengguna: User): void {
    const email = pengguna.getEmail();
    // Business Rule: Standard email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(`Format email tidak valid: ${email}`);
    }
  }
}
