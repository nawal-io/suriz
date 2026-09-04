import React, { useState } from 'react';
import { useLetterStore } from '../store/letterStore';
import { templatesMeta } from '../utils/presets';
import { TemplateCategory, TemplateType } from '../types';
import { Briefcase, GraduationCap, FileText, ArrowRight, Check } from 'lucide-react';

export const Step1Templates: React.FC = () => {
  const store = useLetterStore();
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');

  const filteredTemplates = activeCategory === 'all' 
    ? templatesMeta 
    : templatesMeta.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-medium text-[#ededed] mb-1">Pilih Kategori & Template Surat</h2>
        <p className="text-xs text-[#88888d]">
          Pilih salah satu dari 10+ standar surat resmi berformat EBI Indonesia.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 text-xs rounded border transition-colors ${
            activeCategory === 'all'
              ? 'bg-[#242428] text-[#ededed] border-[#52525b]'
              : 'bg-[#0d0d0f] text-[#88888d] border-[#242428] hover:border-[#3f3f46]'
          }`}
        >
          Semua Template ({templatesMeta.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('kerja')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors ${
            activeCategory === 'kerja'
              ? 'bg-[#242428] text-[#ededed] border-[#52525b]'
              : 'bg-[#0d0d0f] text-[#88888d] border-[#242428] hover:border-[#3f3f46]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          Kerja / Kantor
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('sekolah')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors ${
            activeCategory === 'sekolah'
              ? 'bg-[#242428] text-[#ededed] border-[#52525b]'
              : 'bg-[#0d0d0f] text-[#88888d] border-[#242428] hover:border-[#3f3f46]'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Sekolah / Kampus
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('umum')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors ${
            activeCategory === 'umum'
              ? 'bg-[#242428] text-[#ededed] border-[#52525b]'
              : 'bg-[#0d0d0f] text-[#88888d] border-[#242428] hover:border-[#3f3f46]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Pernyataan / Umum
        </button>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
        {filteredTemplates.map((tpl) => {
          const isSelected = store.templateType === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => store.setTemplateType(tpl.id)}
              className={`p-3.5 rounded border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                isSelected
                  ? 'bg-[#242428] border-emerald-500/50 shadow-sm'
                  : 'bg-[#0d0d0f] border-[#242428] hover:border-[#3f3f46]'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#88888d] uppercase tracking-wider bg-[#161618] px-2 py-0.5 rounded border border-[#242428]">
                    {tpl.categoryLabel}
                  </span>
                </div>
                <h3 className="text-xs font-medium text-[#ededed] mt-1.5">{tpl.title}</h3>
                <p className="text-[11px] text-[#88888d] mt-0.5">{tpl.subtitle}</p>
              </div>

              <div className="self-center flex-shrink-0">
                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-[#3f3f46] flex items-center justify-center text-transparent">
                    •
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Step Action */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => store.setCurrentStep(2)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-medium rounded transition-colors"
        >
          <span>Lanjut ke Informasi Pengirim</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
