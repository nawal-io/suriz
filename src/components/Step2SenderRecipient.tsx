import React from 'react';
import { useLetterStore } from '../store/letterStore';
import { ArrowLeft, ArrowRight, User, Building } from 'lucide-react';

export const Step2SenderRecipient: React.FC = () => {
  const store = useLetterStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-[#ededed] mb-1">Informasi Pengirim & Penerima Surat</h2>
          <p className="text-xs text-[#88888d]">
            Masukkan identitas lengkap pemohon serta pihak tujuan surat.
          </p>
        </div>
      </div>

      {/* Sender Information */}
      <div className="space-y-3 bg-[#0d0d0f] p-4 rounded border border-[#242428]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ededed] border-b border-[#242428] pb-2">
          <User className="w-3.5 h-3.5 text-[#88888d]" />
          <span>Data Pengirim / Pemohon</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Nama Lengkap & Gelar</label>
            <input
              type="text"
              value={store.pengirimNama}
              onChange={(e) => store.updateField('pengirimNama', e.target.value)}
              placeholder="cth: Dewi Lestari, S.Kom."
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">NIK / NIP / NISN / NIM</label>
            <input
              type="text"
              value={store.pengirimId}
              onChange={(e) => store.updateField('pengirimId', e.target.value)}
              placeholder="cth: NIK. 199408122018032001"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Jabatan / Kelas / Peran</label>
            <input
              type="text"
              value={store.pengirimJabatan}
              onChange={(e) => store.updateField('pengirimJabatan', e.target.value)}
              placeholder="cth: Software QA Engineer / Siswa XII"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Nomor Telepon / WhatsApp</label>
            <input
              type="text"
              value={store.pengirimTelepon}
              onChange={(e) => store.updateField('pengirimTelepon', e.target.value)}
              placeholder="cth: +62 812-3456-7890"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[11px] text-[#88888d] block mb-1">Alamat Rumah / Tempat Tinggal</label>
            <input
              type="text"
              value={store.pengirimAlamat}
              onChange={(e) => store.updateField('pengirimAlamat', e.target.value)}
              placeholder="cth: Jl. Margonda Raya No. 45, Depok, Jawa Barat"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
        </div>
      </div>

      {/* Recipient Information */}
      <div className="space-y-3 bg-[#0d0d0f] p-4 rounded border border-[#242428]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ededed] border-b border-[#242428] pb-2">
          <Building className="w-3.5 h-3.5 text-[#88888d]" />
          <span>Penerima Surat (Kepada Yth.)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Nama Pejabat / Atasan / Pimpinan</label>
            <input
              type="text"
              value={store.kepadaNama}
              onChange={(e) => store.updateField('kepadaNama', e.target.value)}
              placeholder="cth: Bapak Rahmat Hidayat, S.T."
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Jabatan Penerima</label>
            <input
              type="text"
              value={store.kepadaJabatan}
              onChange={(e) => store.updateField('kepadaJabatan', e.target.value)}
              placeholder="cth: HRD Manager / Wali Kelas / Dekan"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Nama Instansi / Perusahaan</label>
            <input
              type="text"
              value={store.kepadaInstansi}
              onChange={(e) => store.updateField('kepadaInstansi', e.target.value)}
              placeholder="cth: PT. Nusantara Teknologi Solusi"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#88888d] block mb-1">Alamat Instansi / Perusahaan</label>
            <input
              type="text"
              value={store.kepadaAlamat}
              onChange={(e) => store.updateField('kepadaAlamat', e.target.value)}
              placeholder="cth: Gedung Cyber 2, Jakarta Selatan"
              className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => store.setCurrentStep(1)}
          className="flex items-center gap-2 px-4 py-2 bg-[#242428] hover:bg-[#2e2e33] text-[#ededed] text-xs font-medium rounded transition-colors border border-[#3f3f46]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Template</span>
        </button>

        <button
          type="button"
          onClick={() => store.setCurrentStep(3)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-medium rounded transition-colors"
        >
          <span>Lanjut ke Alasan & Tanda Tangan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
