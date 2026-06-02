// server/src/domain/Dosen.ts
import { User } from './User';
import { Dokumen } from './Dokumen';
import { KegiatanTridharma } from './KegiatanTridharma';
import { PageResponse, KegiatanFilter, PageRequest } from './types';
import { Kajur } from './Kajur';
import { Kaprodi } from './Kaprodi';

export class Dosen extends User {
  private nip: string;
  private nidn: string;
  private nama: string;
  private id: string;
  private daftarJabatanKajur: Kajur[] = [];
  private daftarJabatanKaprodi: Kaprodi[] = [];

  constructor(
    id: string,
    email: string,
    passwordHash: string,
    nip: string,
    nidn: string,
    nama: string
  ) {
    super(email, passwordHash);
    this.id = id;
    this.nip = nip;
    this.nidn = nidn;
    this.nama = nama;
  }

  public setJabatan(kajur: Kajur[], kaprodi: Kaprodi[]): void {
    this.daftarJabatanKajur = kajur;
    this.daftarJabatanKaprodi = kaprodi;
  }

  public getDaftarKegiatanTridharma(
    filter: KegiatanFilter,
    pageRequest: PageRequest
  ): PageResponse<KegiatanTridharma> {
    return { data: [], page: pageRequest.page, totalPages: 0, totalElements: 0 };
  }

  public getDaftarDokumen(pageRequest: PageRequest): PageResponse<Dokumen> {
    return { data: [], page: pageRequest.page, totalPages: 0, totalElements: 0 };
  }

  public isiKegiatan(kegiatan: KegiatanTridharma): void {
    kegiatan.validateDates();
    kegiatan.catatAuditTrail();
  }

  public isActiveKaprodi(): boolean {
    return this.daftarJabatanKaprodi.some(j => j.isActive());
  }

  public isActiveKajur(): boolean {
    return this.daftarJabatanKajur.some(j => j.isActive());
  }

  public hapusDariKegiatan(kegiatan: KegiatanTridharma): void {
    // Business Rule: Dosen cannot remove themselves if they are the recorder/leader
    if (kegiatan.getPencatatId() === this.id) {
      throw new Error('Anda adalah pencatat kegiatan ini. Kegiatan hanya bisa dihapus sepenuhnya oleh pencatat.');
    }
  }

  public hapusDokumen(dokumen: Dokumen): void {
    // Business Rule: Official documents from TU cannot be deleted by Dosen
    if (dokumen.getSumber() === 'TATA_USAHA') {
      throw new Error('Dokumen ini berasal dari Tata Usaha. Dosen tidak diperbolehkan menghapus dokumen resmi.');
    }
  }

  public getId(): string { return this.id; }
  public getNama(): string { return this.nama; }
  public getNip(): string { return this.nip; }
}
