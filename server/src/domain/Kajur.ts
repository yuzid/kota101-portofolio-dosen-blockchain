// server/src/domain/Kajur.ts
import { KegiatanTridharma } from './KegiatanTridharma';
import { PageResponse, KegiatanFilter, PageRequest } from './types';

export class Kajur {
  private id: string;
  private dosen_id: string;
  private periodeMulai: Date;
  private periodeSelesai: Date;

  constructor(id: string, dosen_id: string, periodeMulai: Date, periodeSelesai: Date) {
    this.id = id;
    this.dosen_id = dosen_id;
    this.periodeMulai = periodeMulai;
    this.periodeSelesai = periodeSelesai;
  }

  public isActive(): boolean {
    const now = new Date();
    return now >= this.periodeMulai && now <= this.periodeSelesai;
  }

  public validateTerm(): void {
    if (this.periodeMulai >= this.periodeSelesai) {
      throw new Error('Periode mulai jabatan harus sebelum periode selesai.');
    }
  }

  public getDaftarKegiatanTridharmaJurusan(
    filter: KegiatanFilter,
    pageRequest: PageRequest
  ): PageResponse<KegiatanTridharma> {
    // This logic is typically handled by passing a specific context/repository
    // For now it acts as a behavioral contract
    return { data: [], page: pageRequest.page, totalPages: 0, totalElements: 0 };
  }
}
