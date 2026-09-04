import { LetterState } from '../types';

export function generateLetterHtml(state: LetterState): string {
  const {
    templateType,
    kotaTanggal,
    nomorSurat,
    lampiran,
    perihal,
    kepadaNama,
    kepadaJabatan,
    kepadaInstansi,
    kepadaAlamat,
    pengirimNama,
    pengirimId,
    pengirimJabatan,
    pengirimAlamat,
    pengirimTelepon,
    pengirimEmail,
    tanggalMulai,
    tanggalSelesai,
    alasanKategori,
    alasanDetail,
    namaPengganti,
    pernyataanDetail,
    signatureDataUrl,
    signatureName,
    printFont,
  } = state;

  const fontStyle = `font-family: '${printFont}', serif;`;

  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  const formattedMulai = formatDateIndo(tanggalMulai);
  const formattedSelesai = formatDateIndo(tanggalSelesai);

  let bodyContent = '';

  switch (templateType) {
    case 'izin_tidak_masuk_kerja':
    case 'izin_tidak_masuk_sekolah':
      bodyContent = `
        <p style="margin-bottom: 12px; text-align: justify;">Dengan hormat,</p>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Melalui surat ini, saya yang bertanda tangan di bawah ini:
        </p>
        <table style="width: 100%; margin-bottom: 12px; margin-left: 20px; border-collapse: collapse;">
          <tr>
            <td style="width: 140px; padding: 2px 0;">Nama Lengkap</td>
            <td style="width: 15px;">:</td>
            <td><strong>${pengirimNama}</strong></td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">NIK / NISN / ID</td>
            <td>:</td>
            <td>${pengirimId || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Jabatan / Kelas</td>
            <td>:</td>
            <td>${pengirimJabatan}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Alamat</td>
            <td>:</td>
            <td>${pengirimAlamat}</td>
          </tr>
        </table>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Memberitahukan bahwa saya tidak dapat hadir untuk mengikuti kegiatan ${templateType.includes('sekolah') ? 'belajar mengajar' : 'kerja'} seperti biasa pada tanggal <strong>${formattedMulai}</strong>${formattedSelesai && formattedSelesai !== formattedMulai ? ` sampai dengan tanggal <strong>${formattedSelesai}</strong>` : ''} dikarenakan ${alasanKategori.toLowerCase()}.
        </p>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Adapun keterangan lebih lanjut mengenai kondisi saya adalah sebagai berikut: <em>"${alasanDetail}"</em>. ${namaPengganti ? `Selama saya berhalangan hadir, tugas dan koordinasi operasional saya akan diwakilkan sementara kepada <strong>${namaPengganti}</strong>.` : ''}
        </p>
        <p style="margin-bottom: 16px; text-align: justify; text-indent: 40px;">
          Demikian surat permohonan izin ini saya sampaikan dengan sebenarnya. Atas perhatian, pengertian, dan izin yang Bapak/Ibu berikan, saya ucapkan terima kasih.
        </p>
      `;
      break;

    case 'pengunduran_diri':
      bodyContent = `
        <p style="margin-bottom: 12px; text-align: justify;">Dengan hormat,</p>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Melalui surat ini, saya yang bertanda tangan di bawah ini:
        </p>
        <table style="width: 100%; margin-bottom: 12px; margin-left: 20px; border-collapse: collapse;">
          <tr>
            <td style="width: 140px; padding: 2px 0;">Nama Lengkap</td>
            <td style="width: 15px;">:</td>
            <td><strong>${pengirimNama}</strong></td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">NIK / NIP</td>
            <td>:</td>
            <td>${pengirimId || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Jabatan</td>
            <td>:</td>
            <td>${pengirimJabatan}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Alamat</td>
            <td>:</td>
            <td>${pengirimAlamat}</td>
          </tr>
        </table>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Bermaksud untuk mengajukan permohonan pengunduran diri sebagai karyawan dari ${kepadaInstansi || 'perusahaan'} terhitung sejak tanggal <strong>${formattedMulai || '...'}</strong>.
        </p>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Alasan pengunduran diri saya adalah: <em>"${alasanDetail}"</em>. ${namaPengganti ? `Untuk kelancaran transisi, saya siap membantu proses alih tugas kepada <strong>${namaPengganti}</strong> sebelum tanggal efektif berhenti.` : ''}
        </p>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Saya mengucapkan terima kasih yang sebesar-besarnya atas kesempatan, bimbingan, serta kerja sama yang baik yang telah diberikan selama saya bekerja di ${kepadaInstansi || 'perusahaan'}. Saya juga memohon maaf apabila terdapat kesalahan atau kekhilafan selama saya bertugas.
        </p>
        <p style="margin-bottom: 16px; text-align: justify; text-indent: 40px;">
          Demikian surat pengunduran diri ini saya buat secara sadar, tanpa ada tekanan dari pihak manapun, dan penuh rasa tanggung jawab. Semoga ${kepadaInstansi || 'perusahaan'} semakin maju dan sukses.
        </p>
      `;
      break;

    case 'permohonan_cuti':
    case 'cuti_akademik':
      bodyContent = `
        <p style="margin-bottom: 12px; text-align: justify;">Dengan hormat,</p>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Bersama surat ini, saya yang bertanda tangan di bawah ini:
        </p>
        <table style="width: 100%; margin-bottom: 12px; margin-left: 20px; border-collapse: collapse;">
          <tr>
            <td style="width: 140px; padding: 2px 0;">Nama Lengkap</td>
            <td style="width: 15px;">:</td>
            <td><strong>${pengirimNama}</strong></td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">NIK / NIM / NIP</td>
            <td>:</td>
            <td>${pengirimId || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Jabatan / Program</td>
            <td>:</td>
            <td>${pengirimJabatan}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Alamat</td>
            <td>:</td>
            <td>${pengirimAlamat}</td>
          </tr>
        </table>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Mengajukan permohonan untuk mengambil hak cuti ${templateType === 'cuti_akademik' ? 'akademik semester' : 'tahunan'} terhitung mulai tanggal <strong>${formattedMulai}</strong> sampai dengan tanggal <strong>${formattedSelesai}</strong>.
        </p>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Adapun keperluan pengajuan cuti ini adalah: <em>"${alasanDetail}"</em>. ${namaPengganti ? `Selama menjalankan cuti, segala urusan operasional dapat dikoordinasikan dengan <strong>${namaPengganti}</strong>.` : ''}
        </p>
        <p style="margin-bottom: 16px; text-align: justify; text-indent: 40px;">
          Demikian permohonan ini saya sampaikan untuk dapat dipertimbangkan dan disetujui oleh Bapak/Ibu pimpinan. Atas perhatian dan kebijaksanaannya, saya ucapkan terima kasih.
        </p>
      `;
      break;

    case 'penolakan_tawaran_kerja':
      bodyContent = `
        <p style="margin-bottom: 12px; text-align: justify;">Dengan hormat,</p>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Melalui surat ini, saya yang bertanda tangan di bawah ini:
        </p>
        <table style="width: 100%; margin-bottom: 12px; margin-left: 20px; border-collapse: collapse;">
          <tr>
            <td style="width: 140px; padding: 2px 0;">Nama Lengkap</td>
            <td style="width: 15px;">:</td>
            <td><strong>${pengirimNama}</strong></td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Nomor Kontak</td>
            <td>:</td>
            <td>${pengirimTelepon} (${pengirimEmail})</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Alamat</td>
            <td>:</td>
            <td>${pengirimAlamat}</td>
          </tr>
        </table>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Terlebih dahulu saya mengucapkan terima kasih yang sebesar-besarnya atas kesempatan wawancara serta tawaran posisi <strong>${pengirimJabatan}</strong> di ${kepadaInstansi || 'perusahaan'} yang telah diberikan kepada saya.
        </p>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Setelah melalui pertimbangan yang matang serta diskusi dengan keluarga, dengan berat hati saya harus menyampaikan bahwa saya belum dapat menerima tawaran kerja tersebut dikarenakan: <em>"${alasanDetail}"</em>.
        </p>
        <p style="margin-bottom: 16px; text-align: justify; text-indent: 40px;">
          Saya sangat menghargai waktu dan profesionalisme seluruh tim rekrutmen. Semoga ${kepadaInstansi || 'perusahaan'} senantiasa sukses dalam menemukan kandidat terbaik yang tepat untuk posisi tersebut.
        </p>
      `;
      break;

    case 'surat_pernyataan_ortu':
      bodyContent = `
        <p style="margin-bottom: 12px; text-align: justify;">Yang bertanda tangan di bawah ini:</p>
        <table style="width: 100%; margin-bottom: 12px; margin-left: 20px; border-collapse: collapse;">
          <tr>
            <td style="width: 140px; padding: 2px 0;">Nama Orang Tua</td>
            <td style="width: 15px;">:</td>
            <td><strong>${pengirimNama}</strong></td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">NIK / KTP</td>
            <td>:</td>
            <td>${pengirimId || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Pekerjaan</td>
            <td>:</td>
            <td>${pengirimJabatan}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Alamat</td>
            <td>:</td>
            <td>${pengirimAlamat}</td>
          </tr>
        </table>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Bertindak sebagai orang tua / wali dari siswa/mahasiswa, dengan ini menyatakan dengan sesungguhnya bahwa:
        </p>
        <p style="margin-bottom: 12px; text-align: justify; padding-left: 40px; font-weight: 500;">
          <em>"${pernyataanDetail || alasanDetail}"</em>
        </p>
        <p style="margin-bottom: 16px; text-align: justify; text-indent: 40px;">
          Demikian surat pernyataan ini saya buat dengan penuh kesadaran dan tanggung jawab agar dapat dipergunakan sebagaimana mestinya.
        </p>
      `;
      break;

    case 'keterangan_domisili':
    case 'pernyataan_belum_menikah':
    case 'pernyataan_penghasilan':
      bodyContent = `
        <p style="margin-bottom: 12px; text-align: justify;">Yang bertanda tangan di bawah ini:</p>
        <table style="width: 100%; margin-bottom: 12px; margin-left: 20px; border-collapse: collapse;">
          <tr>
            <td style="width: 140px; padding: 2px 0;">Nama Lengkap</td>
            <td style="width: 15px;">:</td>
            <td><strong>${pengirimNama}</strong></td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">NIK</td>
            <td>:</td>
            <td>${pengirimId || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Pekerjaan</td>
            <td>:</td>
            <td>${pengirimJabatan}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Alamat Lengkap</td>
            <td>:</td>
            <td>${pengirimAlamat}</td>
          </tr>
          <tr>
            <td style="padding: 2px 0;">Nomor Kontak</td>
            <td>:</td>
            <td>${pengirimTelepon}</td>
          </tr>
        </table>
        <p style="margin-bottom: 12px; text-align: justify; text-indent: 40px;">
          Dengan ini menyatakan dengan sesungguhnya bahwa:
        </p>
        <p style="margin-bottom: 12px; text-align: justify; padding-left: 40px; font-weight: 500;">
          <em>"${pernyataanDetail || alasanDetail}"</em>
        </p>
        <p style="margin-bottom: 16px; text-align: justify; text-indent: 40px;">
          Demikian surat pernyataan ini saya buat dengan sebenarnya dalam keadaan sadar, tanpa ada unsur paksaan dari pihak manapun, serta siap dituntut secara hukum apabila di kemudian hari pernyataan ini terbukti tidak benar.
        </p>
      `;
      break;

    default:
      bodyContent = `<p>Silakan pilih template surat.</p>`;
  }

  return `
    <div style="${fontStyle} font-size: 11pt; line-height: 1.6; color: #000000; background: #ffffff; padding: 0;">
      <!-- Header Surat / Kop -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">${kepadaInstansi || 'INSTANSI / LEMBAGA'}</div>
          <div style="font-size: 10pt; color: #333333; margin-top: 2px;">${kepadaAlamat || 'Alamat Instansi'}</div>
        </div>
        <div style="text-align: right; font-size: 10pt;">
          <div>No. Surat: ${nomorSurat || '-'}</div>
          <div>Lampiran: ${lampiran || '-'}</div>
        </div>
      </div>

      <!-- Tanggal & Tujuan -->
      <div style="margin-bottom: 20px; display: flex; justify-content: space-between;">
        <div>
          <div style="margin-bottom: 2px;">Kepada Yth.</div>
          <div style="font-weight: bold;">${kepadaNama || 'Nama Penerima / Pejabat'}</div>
          <div>${kepadaJabatan || 'Jabatan Penerima'}</div>
          <div>${kepadaInstansi || 'Instansi'}</div>
        </div>
        <div style="text-align: right;">
          <div>${kotaTanggal || 'Jakarta, 4 September 2026'}</div>
        </div>
      </div>

      <!-- Perihal -->
      <div style="margin-bottom: 20px;">
        <div>Perihal: <strong>${perihal || 'Perihal Surat'}</strong></div>
      </div>

      <!-- Body / Isi Surat -->
      <div style="margin-bottom: 30px;">
        ${bodyContent}
      </div>

      <!-- Penutup & Tanda Tangan -->
      <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
        <div style="text-align: center; width: 220px;">
          <div style="margin-bottom: 4px;">Hormat saya,</div>
          <div style="margin-bottom: 4px; font-size: 9pt; color: #555;">Pemohon / Yang Menyatakan</div>
          
          <div style="height: 70px; display: flex; align-items: center; justify-content: center; margin: 4px 0;">
            ${signatureDataUrl ? `<img src="${signatureDataUrl}" alt="Tanda Tangan" style="max-height: 65px; max-width: 180px; object-fit: contain;" />` : `<div style="font-style: italic; color: #888; font-size: 9pt;">[ Tanda Tangan ]</div>`}
          </div>

          <div style="font-weight: bold; text-decoration: underline; margin-top: 4px;">${signatureName || pengirimNama || 'Nama Terang'}</div>
          <div style="font-size: 9.5pt; color: #222;">${pengirimId || ''}</div>
        </div>
      </div>
    </div>
  `;
}
