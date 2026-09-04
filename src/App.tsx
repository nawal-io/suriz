/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { FormWizard } from './components/FormWizard';
import { PreviewPane } from './components/PreviewPane';

export default function App() {
  const [activeMobileTab, setActiveMobileTab] = useState<'form' | 'preview'>('form');

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-[#ededed] flex flex-col font-sans selection:bg-[#242428] selection:text-white">
      <HeaderBar activeMobileTab={activeMobileTab} setActiveMobileTab={setActiveMobileTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {/* Desktop Dual-Pane Split View */}
        <div className="hidden md:grid grid-cols-12 gap-6 items-start">
          <div className="col-span-5 sticky top-20">
            <FormWizard />
          </div>
          <div className="col-span-7 sticky top-20">
            <PreviewPane />
          </div>
        </div>

        {/* Mobile Single-Column with Tab Switcher */}
        <div className="block md:hidden">
          {activeMobileTab === 'form' ? (
            <FormWizard />
          ) : (
            <PreviewPane />
          )}
        </div>
      </main>

      <footer className="border-t border-[#242428] py-4 px-4 text-center text-xs text-[#88888d] bg-[#161618]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>surat-izin &bull; part of the nawal-io web utility suite</span>
          <span>100% Client-Side Privacy First &bull; EBI Formal Standard</span>
        </div>
      </footer>
    </div>
  );
}
