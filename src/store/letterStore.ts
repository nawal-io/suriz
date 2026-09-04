import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LetterState, TemplateType } from '../types';
import { presets, templatesMeta } from '../utils/presets';

const initialTemplate: TemplateType = 'izin_tidak_masuk_kerja';
const defaultPreset = presets[initialTemplate];

export const useLetterStore = create<LetterState>()(
  persist(
    (set, get) => ({
      templateType: initialTemplate,
      currentStep: 1,
      quickMode: false,

      kotaTanggal: defaultPreset.kotaTanggal || 'Jakarta, 4 September 2026',
      nomorSurat: defaultPreset.nomorSurat || '',
      lampiran: defaultPreset.lampiran || '-',
      perihal: defaultPreset.perihal || 'Permohonan Izin Tidak Masuk Kerja',

      kepadaNama: defaultPreset.kepadaNama || '',
      kepadaJabatan: defaultPreset.kepadaJabatan || '',
      kepadaInstansi: defaultPreset.kepadaInstansi || '',
      kepadaAlamat: defaultPreset.kepadaAlamat || '',

      pengirimNama: defaultPreset.pengirimNama || '',
      pengirimId: defaultPreset.pengirimId || '',
      pengirimJabatan: defaultPreset.pengirimJabatan || '',
      pengirimAlamat: defaultPreset.pengirimAlamat || '',
      pengirimTelepon: defaultPreset.pengirimTelepon || '',
      pengirimEmail: defaultPreset.pengirimEmail || '',

      tanggalMulai: defaultPreset.tanggalMulai || '',
      tanggalSelesai: defaultPreset.tanggalSelesai || '',
      alasanKategori: defaultPreset.alasanKategori || '',
      alasanDetail: defaultPreset.alasanDetail || '',
      namaPengganti: defaultPreset.namaPengganti || '',

      pernyataanJenis: defaultPreset.pernyataanJenis || '',
      pernyataanDetail: defaultPreset.pernyataanDetail || '',

      signatureDataUrl: '',
      signatureName: '',

      pageSize: 'A4',
      printFont: 'Times New Roman',
      marginSize: 'normal',

      setTemplateType: (type: TemplateType) => {
        set({ templateType: type });
        get().loadPreset(type);
      },

      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      toggleQuickMode: () => {
        const newQuick = !get().quickMode;
        set({ quickMode: newQuick });
        if (newQuick) {
          // Autofill 80% common fields from current preset
          get().loadPreset(get().templateType);
        }
      },

      updateField: (field, value) => {
        set({ [field]: value });
      },

      resetForm: () => {
        set({
          kotaTanggal: 'Jakarta, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          nomorSurat: '',
          lampiran: '-',
          perihal: '',
          kepadaNama: '',
          kepadaJabatan: '',
          kepadaInstansi: '',
          kepadaAlamat: '',
          pengirimNama: '',
          pengirimId: '',
          pengirimJabatan: '',
          pengirimAlamat: '',
          pengirimTelepon: '',
          pengirimEmail: '',
          tanggalMulai: '',
          tanggalSelesai: '',
          alasanKategori: '',
          alasanDetail: '',
          namaPengganti: '',
          pernyataanJenis: '',
          pernyataanDetail: '',
          signatureDataUrl: '',
          signatureName: '',
        });
      },

      loadPreset: (type: TemplateType) => {
        const preset = presets[type];
        const meta = templatesMeta.find((m) => m.id === type);
        if (preset) {
          set({
            ...preset,
            templateType: type,
            perihal: meta ? meta.defaultPerihal : preset.perihal || '',
          });
        }
      },
    }),
    {
      name: 'surat-izin-storage-v2',
    }
  )
);
