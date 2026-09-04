import React from 'react';
import { useLetterStore } from '../store/letterStore';
import { generateLetterHtml } from '../utils/generators';
import { PageSize, PrintFont, MarginSize } from '../types';

export const PreviewPane: React.FC = () => {
  const store = useLetterStore();
  const letterHtml = generateLetterHtml(store);

  const getMarginClass = (margin: MarginSize) => {
    switch (margin) {
      case 'compact':
        return 'p-6 sm:p-8';
      case 'wide':
        return 'p-12 sm:p-16';
      case 'normal':
      default:
        return 'p-10 sm:p-12';
    }
  };

  const getPageDimensions = (size: PageSize) => {
    if (size === 'F4') {
      return { width: 'min(100%, 790px)', minHeight: '1145px' };
    }
    return { width: 'min(100%, 750px)', minHeight: '1060px' };
  };

  const dim = getPageDimensions(store.pageSize);

  return (
    <div className="space-y-4">
      {/* Controls Bar for Document Canvas */}
      <div className="bg-[#161618] border border-[#242428] rounded p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#ededed]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#88888d]">Ukuran:</span>
          <div className="flex bg-[#0d0d0f] border border-[#242428] rounded p-0.5">
            {(['A4', 'F4'] as PageSize[]).map((size) => (
              <button
                key={size}
                onClick={() => store.updateField('pageSize', size)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  store.pageSize === size ? 'bg-[#242428] text-white font-medium' : 'text-[#88888d]'
                }`}
              >
                {size} {size === 'A4' ? '(210x297mm)' : '(215x330mm)'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[#88888d]">Font:</span>
          <select
            value={store.printFont}
            onChange={(e) => store.updateField('printFont', e.target.value as PrintFont)}
            className="bg-[#0d0d0f] border border-[#242428] text-[#ededed] px-2.5 py-1 rounded focus:outline-none focus:border-[#52525b]"
          >
            <option value="Times New Roman">Times New Roman</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[#88888d]">Margin:</span>
          <div className="flex bg-[#0d0d0f] border border-[#242428] rounded p-0.5">
            {(['compact', 'normal', 'wide'] as MarginSize[]).map((m) => (
              <button
                key={m}
                onClick={() => store.updateField('marginSize', m)}
                className={`px-2 py-1 rounded text-xs capitalize transition-colors ${
                  store.marginSize === m ? 'bg-[#242428] text-white font-medium' : 'text-[#88888d]'
                }`}
              >
                {m === 'compact' ? 'Kompak' : m === 'normal' ? 'Normal' : 'Lebar'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document A4/F4 Canvas Wrapper */}
      <div className="flex justify-center overflow-x-auto py-2">
        <div
          id="printable-document"
          style={{
            width: dim.width,
            minHeight: dim.minHeight,
          }}
          className={`bg-white text-black shadow-2xl rounded-sm mx-auto transition-all ${getMarginClass(
            store.marginSize
          )}`}
          dangerouslySetInnerHTML={{ __html: letterHtml }}
        />
      </div>
    </div>
  );
};
