export type TemplateCategory = 'kerja' | 'sekolah' | 'umum';

export type TemplateType = 
  // A. Kerja / Kantor
  | 'izin_tidak_masuk_kerja'
  | 'pengunduran_diri'
  | 'permohonan_cuti'
  | 'penolakan_tawaran_kerja'
  // B. Sekolah / Kampus
  | 'izin_tidak_masuk_sekolah'
  | 'cuti_akademik'
  | 'surat_pernyataan_ortu'
  // C. Pernyataan / Umum
  | 'keterangan_domisili'
  | 'pernyataan_belum_menikah'
  | 'pernyataan_penghasilan';

export type PageSize = 'A4' | 'F4';
export type PrintFont = 'Times New Roman' | 'Arial' | 'Georgia';
export type MarginSize = 'compact' | 'normal' | 'wide';

export interface LetterTemplateMeta {
  id: TemplateType;
  category: TemplateCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  defaultPerihal: string;
}

export interface LetterState {
  templateType: TemplateType;
  currentStep: number; // 1, 2, 3
  quickMode: boolean; // Autofills 80% of common fields
  
  // Header / Meta
  kotaTanggal: string;
  nomorSurat: string;
  lampiran: string;
  perihal: string;

  // Recipient (Kepada Yth.)
  kepadaNama: string;
  kepadaJabatan: string;
  kepadaInstansi: string;
  kepadaAlamat: string;

  // Sender (Pengirim / Pemohon)
  pengirimNama: string;
  pengirimId: string; // NIK / NIP / NISN
  pengirimJabatan: string; // Jabatan / Kelas
  pengirimAlamat: string;
  pengirimTelepon: string;
  pengirimEmail: string;

  // Specific Body Parameters
  tanggalMulai: string;
  tanggalSelesai: string;
  alasanKategori: string;
  alasanDetail: string;
  namaPengganti: string; // Optional handover person

  // Additional template-specific fields
  pernyataanJenis: string;
  pernyataanDetail: string;

  // Signature
  signatureDataUrl: string;
  signatureName: string;

  // Document Styling Controls
  pageSize: PageSize;
  printFont: PrintFont;
  marginSize: MarginSize;

  // Actions
  setTemplateType: (type: TemplateType) => void;
  setCurrentStep: (step: number) => void;
  toggleQuickMode: () => void;
  updateField: <K extends keyof LetterState>(field: K, value: LetterState[K]) => void;
  resetForm: () => void;
  loadPreset: (type: TemplateType) => void;
}
