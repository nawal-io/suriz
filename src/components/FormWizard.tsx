import React from 'react';
import { useLetterStore } from '../store/letterStore';
import { Step1Templates } from './Step1Templates';
import { Step2SenderRecipient } from './Step2SenderRecipient';
import { Step3DetailsSignature } from './Step3DetailsSignature';
import { Zap, CheckCircle2 } from 'lucide-react';

export const FormWizard: React.FC = () => {
  const store = useLetterStore();

  return (
    <div className="bg-[#161618] border border-[#242428] rounded p-5 space-y-6 text-[#ededed]">
      {/* Mode Cepat Switch & Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#242428] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#88888d] uppercase tracking-wider">
              Langkah {store.currentStep} dari 3
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              {store.currentStep === 1 && '• Pilih Template'}
              {store.currentStep === 2 && '• Data Pengirim & Tujuan'}
              {store.currentStep === 3 && '• Tanggal, Alasan & Tanda Tangan'}
            </span>
          </div>
        </div>

        {/* Quick Mode Toggle */}
        <div className="flex items-center gap-2 bg-[#0d0d0f] px-3 py-1.5 rounded border border-[#242428]">
          <Zap className={`w-3.5 h-3.5 ${store.quickMode ? 'text-amber-400' : 'text-[#88888d]'}`} />
          <span className="text-xs text-[#a1a1aa]">Mode Cepat (Auto-Fill)</span>
          <button
            type="button"
            onClick={store.toggleQuickMode}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              store.quickMode ? 'bg-emerald-500' : 'bg-[#242428]'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                store.quickMode ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Wizard Progress Indicator Bars */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => store.setCurrentStep(1)}
          className={`h-1.5 rounded transition-all ${
            store.currentStep >= 1 ? 'bg-emerald-500' : 'bg-[#242428]'
          }`}
          title="Langkah 1: Template"
        />
        <button
          type="button"
          onClick={() => store.setCurrentStep(2)}
          className={`h-1.5 rounded transition-all ${
            store.currentStep >= 2 ? 'bg-emerald-500' : 'bg-[#242428]'
          }`}
          title="Langkah 2: Pengirim & Penerima"
        />
        <button
          type="button"
          onClick={() => store.setCurrentStep(3)}
          className={`h-1.5 rounded transition-all ${
            store.currentStep >= 3 ? 'bg-emerald-500' : 'bg-[#242428]'
          }`}
          title="Langkah 3: Detail & Tanda Tangan"
        />
      </div>

      {/* Step Components */}
      <div className="pt-2">
        {store.currentStep === 1 && <Step1Templates />}
        {store.currentStep === 2 && <Step2SenderRecipient />}
        {store.currentStep === 3 && <Step3DetailsSignature />}
      </div>
    </div>
  );
};
