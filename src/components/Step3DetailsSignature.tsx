import React from 'react';
import { useLetterStore } from '../store/letterStore';
import { quickReasonPresets } from '../utils/presets';
import { SignaturePad } from './SignaturePad';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const Step3DetailsSignature: React.FC = () => {
  const store = useLetterStore();
  const availableChips = quickReasonPresets[store.templateType] || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-medium text-[#ededed] mb-1">Tanggal, Alasan & Tanda Tangan</h2>
        <p className="text-xs text-[#88888d]">
          Tentukan jadwal, gunakan opsi alasan cepat, atau ketik alasan kustom Anda secara bebas.
        </p>
      </div>

      {/* Date & Location Parameters */}
      <div className="space-y-4 bg-[#0d0d0f] p-4 rounded border border-[#242428]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Kota & Tanggal Surat</label>
            <input
              type="text"
              value={store.kotaTanggal}
              onChange={(e) => store.updateField('kotaTanggal', e.target.value)}
              placeholder="cth: Jakarta, 4 September 2026"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Nomor Surat (Opsional)</label>
            <input
              type="text"
              value={store.nomorSurat}
              onChange={(e) => store.updateField('nomorSurat', e.target.value)}
              placeholder="cth: 012/ITM/IX/2026"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
        </div>

        {store.templateType !== 'keterangan_domisili' &&
         store.templateType !== 'pernyataan_belum_menikah' &&
         store.templateType !== 'pernyataan_penghasilan' &&
         store.templateType !== 'penolakan_tawaran_kerja' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-[11px] text-[#88888d] block mb-1">Tanggal Mulai / Efektif</label>
              <input
                type="date"
                value={store.tanggalMulai}
                onChange={(e) => store.updateField('tanggalMulai', e.target.value)}
                className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#88888d] block mb-1">Tanggal Selesai / Masuk Kembali</label>
              <input
                type="date"
                value={store.tanggalSelesai}
                onChange={(e) => store.updateField('tanggalSelesai', e.target.value)}
                className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Automated Preset Reasonings & Editable Textarea */}
      <div className="space-y-3 bg-[#0d0d0f] p-4 rounded border border-[#242428]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono text-[#ededed] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Opsi Alasan Cepat (Klik untuk Pre-fill)
          </label>
          <span className="text-[10px] text-[#88888d]">Teks di bawah bebas diedit sepenuhnya</span>
        </div>

        {availableChips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {availableChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  store.updateField('alasanKategori', chip);
                  const currentDetail = store.alasanDetail || store.pernyataanDetail || '';
                  const newDetail = currentDetail
                    ? `${currentDetail}; ${chip}`
                    : `Berdasarkan kondisi terkini, saya mengajukan permohonan dengan alasan: ${chip}.`;
                  store.updateField('alasanDetail', newDetail);
                  store.updateField('pernyataanDetail', newDetail);
                }}
                className="text-left text-[11px] bg-[#161618] hover:bg-[#242428] text-[#ededed] border border-[#242428] hover:border-[#52525b] px-3 py-1.5 rounded transition-colors"
                title="Klik untuk menyisipkan ke textarea di bawah"
              >
                + {chip}
              </button>
            ))}
          </div>
        )}

        <div className="pt-2 space-y-3">
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Kategori Alasan Utama</label>
            <input
              type="text"
              value={store.alasanKategori}
              onChange={(e) => store.updateField('alasanKategori', e.target.value)}
              placeholder="cth: Sakit / Urusan Keluarga"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>

          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Detail / Alasan Spesifik (Bebas Diketik & Diedit)</label>
            <textarea
              rows={4}
              value={store.alasanDetail || store.pernyataanDetail}
              onChange={(e) => {
                store.updateField('alasanDetail', e.target.value);
                store.updateField('pernyataanDetail', e.target.value);
              }}
              placeholder="Tuliskan atau sesuaikan alasan Anda di sini dengan tata bahasa EBI..."
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] p-3 text-xs rounded focus:outline-none focus:border-[#52525b] resize-y leading-relaxed"
            />
          </div>

          {store.templateType !== 'surat_pernyataan_ortu' &&
           store.templateType !== 'keterangan_domisili' &&
           store.templateType !== 'pernyataan_belum_menikah' &&
           store.templateType !== 'pernyataan_penghasilan' &&
           store.templateType !== 'penolakan_tawaran_kerja' && (
            <div>
              <label className="text-[11px] text-[#88888d] block mb-1">Nama Pengganti / Penerima Wewenang (Opsional)</label>
              <input
                type="text"
                value={store.namaPengganti}
                onChange={(e) => store.updateField('namaPengganti', e.target.value)}
                placeholder="cth: Ahmad Fauzi (Senior QA)"
                className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Signature Pad */}
      <div className="bg-[#0d0d0f] p-4 rounded border border-[#242428] space-y-3">
        <SignaturePad />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => store.setCurrentStep(2)}
          className="flex items-center gap-2 px-4 py-2 bg-[#242428] hover:bg-[#2e2e33] text-[#ededed] text-xs font-medium rounded transition-colors border border-[#3f3f46]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Identitas</span>
        </button>

        <span className="text-xs text-emerald-400 font-mono">
          ✓ Real-time Live Preview Aktif di Kanan
        </span>
      </div>
    </div>
  );
};
