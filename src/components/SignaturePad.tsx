import React, { useRef, useState, useEffect } from 'react';
import { useLetterStore } from '../store/letterStore';
import { Eraser, Undo, PenTool } from 'lucide-react';

export const SignaturePad: React.FC = () => {
  const store = useLetterStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      store.updateField('signatureDataUrl', dataUrl);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    store.updateField('signatureDataUrl', '');
    setHasDrawn(false);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (history.length > 0) {
      const lastState = history[history.length - 1];
      ctx.putImageData(lastState, 0, 0);
      setHistory((prev) => prev.slice(0, prev.length - 1));
      const dataUrl = canvas.toDataURL('image/png');
      store.updateField('signatureDataUrl', hasDrawn ? dataUrl : '');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono text-[#ededed] flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5 text-[#88888d]" />
          Tanda Tangan Digital (Canvas)
        </label>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleUndo}
            disabled={history.length === 0}
            className="px-2 py-1 text-[11px] bg-[#161618] hover:bg-[#242428] text-[#ededed] border border-[#242428] rounded disabled:opacity-40 flex items-center gap-1"
          >
            <Undo className="w-3 h-3" />
            Batal Stroke
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-2 py-1 text-[11px] bg-[#161618] hover:bg-[#242428] text-[#ededed] border border-[#242428] rounded flex items-center gap-1"
          >
            <Eraser className="w-3 h-3" />
            Hapus
          </button>
        </div>
      </div>

      <div className="border border-[#242428] rounded bg-white overflow-hidden relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={400}
          height={140}
          className="w-full h-[110px] touch-none block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasDrawn && !store.signatureDataUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-neutral-400 text-xs italic">
            [ Tulis tanda tangan Anda di area ini ]
          </div>
        )}
      </div>

      <div>
        <label className="text-[11px] text-[#88888d] block mb-1">Nama Terang di Bawah Tanda Tangan</label>
        <input
          type="text"
          value={store.signatureName || store.pengirimNama}
          onChange={(e) => store.updateField('signatureName', e.target.value)}
          placeholder="cth: Dewi Lestari, S.Kom."
          className="w-full bg-[#161618] border border-[#242428] text-[#ededed] px-3 py-2 text-xs rounded focus:outline-none focus:border-[#52525b]"
        />
      </div>
    </div>
  );
};
