// server/src/domain/KegiatanSubclasses.ts
import { KegiatanTridharma } from './KegiatanTridharma';
import { KategoriPendidikan, KategoriPenelitian, KategoriPengabdian, Semester } from './types';

export class KegiatanPendidikan extends KegiatanTridharma {
  private kategori: KategoriPendidikan;
  private semester: Semester;

  constructor(
    namaKegiatan: string,
    tanggalMulaiKegiatan: Date,
    tanggalSelesaiKegiatan: Date,
    periode: string,
    kategori: KategoriPendidikan,
    semester: Semester,
    pencatatId: string
  ) {
    super(namaKegiatan, tanggalMulaiKegiatan, tanggalSelesaiKegiatan, periode, pencatatId);
    this.kategori = kategori;
    this.semester = semester;
  }
}

export class KegiatanPenelitian extends KegiatanTridharma {
  private kategori: KategoriPenelitian;

  constructor(
    namaKegiatan: string,
    tanggalMulaiKegiatan: Date,
    tanggalSelesaiKegiatan: Date,
    periode: string,
    kategori: KategoriPenelitian,
    pencatatId: string
  ) {
    super(namaKegiatan, tanggalMulaiKegiatan, tanggalSelesaiKegiatan, periode, pencatatId);
    this.kategori = kategori;
  }
}

export class KegiatanPengabdian extends KegiatanTridharma {
  private kategori: KategoriPengabdian;

  constructor(
    namaKegiatan: string,
    tanggalMulaiKegiatan: Date,
    tanggalSelesaiKegiatan: Date,
    periode: string,
    kategori: KategoriPengabdian,
    pencatatId: string
  ) {
    super(namaKegiatan, tanggalMulaiKegiatan, tanggalSelesaiKegiatan, periode, pencatatId);
    this.kategori = kategori;
  }
}

export class TugasTambahan extends KegiatanTridharma {
  constructor(
    namaKegiatan: string,
    tanggalMulaiKegiatan: Date,
    tanggalSelesaiKegiatan: Date,
    periode: string,
    pencatatId: string
  ) {
    super(namaKegiatan, tanggalMulaiKegiatan, tanggalSelesaiKegiatan, periode, pencatatId);
  }
}
