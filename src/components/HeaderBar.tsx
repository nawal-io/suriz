import React, { useState } from 'react';
import { useLetterStore } from '../store/letterStore';
import { generateLetterHtml } from '../utils/generators';
import { Printer, Download, Copy, RotateCcw, Sparkles, Check } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export const HeaderBar: React.FC<{ activeMobileTab: 'form' | 'preview'; setActiveMobileTab: (tab: 'form' | 'preview') => void }> = ({
  activeMobileTab,
  setActiveMobileTab,
}) => {
  const store = useLetterStore();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopyText = () => {
    const htmlContent = generateLetterHtml(store);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    const element = document.getElementById('printable-document');
    if (!element) {
      setDownloading(false);
      return;
    }

    const opt: any = {
      margin: store.marginSize === 'compact' ? 10 : store.marginSize === 'wide' ? 25 : 15,
      filename: `surat-${store.templateType}-${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: store.pageSize.toLowerCase(), orientation: 'portrait' }
    };

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <header className="bg-[#161618] border-b border-[#242428] sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Branding */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#88888d] font-mono bg-[#242428] px-2 py-0.5 rounded">
              nawal.io
            </span>
            <h1 className="text-sm font-medium tracking-tight text-[#ededed] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              surat-izin
            </h1>
          </div>
          <span className="text-xs text-[#88888d] hidden lg:inline-block font-mono">
            10+ Formal EBI Letter Standards &bull; Client-Side
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto justify-end">
          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden bg-[#0d0d0f] p-1 border border-[#242428] rounded mr-auto">
            <button
              onClick={() => setActiveMobileTab('form')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeMobileTab === 'form' ? 'bg-[#242428] text-[#ededed]' : 'text-[#88888d]'
              }`}
            >
              Isi Data
            </button>
            <button
              onClick={() => setActiveMobileTab('preview')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeMobileTab === 'preview' ? 'bg-[#242428] text-[#ededed]' : 'text-[#88888d]'
              }`}
            >
              Pratinjau
            </button>
          </div>

          <button
            onClick={() => store.loadPreset(store.templateType)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#242428] hover:bg-[#2e2e33] text-[#ededed] border border-[#3f3f46] rounded transition-colors"
            title="Isi contoh data"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Isi Contoh</span>
          </button>

          <button
            onClick={store.resetForm}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#242428] hover:bg-[#2e2e33] text-[#ededed] border border-[#3f3f46] rounded transition-colors"
            title="Reset form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#242428] hover:bg-[#2e2e33] text-[#ededed] border border-[#3f3f46] rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Disalin!' : 'Salin Teks'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#242428] hover:bg-[#2e2e33] text-[#ededed] border border-[#3f3f46] rounded transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white text-black hover:bg-neutral-200 font-medium rounded transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Memproses...' : 'Unduh PDF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
