import React from 'react';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { Hero } from './components/Hero';
import { ToolToolbar } from './components/ToolToolbar';
import { DropZone } from './components/DropZone';
import { JsonEditor } from './components/JsonEditor';
import { JsonOutput } from './components/JsonOutput';
import { Statistics } from './components/Statistics';
import { Toast } from './components/Toast';
import { HowToUse } from './components/HowToUse';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

import { useJsonFormatter } from './hooks/useJsonFormatter';
import { useClipboard } from './hooks/useClipboard';
import { useLocalFile } from './hooks/useLocalFile';
import { downloadJsonFile } from './lib/download';

export const App: React.FC = () => {
  const {
    rawInput,
    setRawInput,
    indent,
    setIndent,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    validationResult,
    formattedOutput,
    stats,
    toast,
    showToast,
    closeToast,
    handleFormat,
    handleAutoRepair,
    handleSortKeys,
    handleMinify,
    handleLoadSample,
    handleClear,
  } = useJsonFormatter();

  const { copied, copyToClipboard } = useClipboard();

  const handleFileLoaded = (content: string, fileName: string) => {
    setRawInput(content);
    showToast(`Loaded file: ${fileName}`, 'success');
  };

  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
  } = useLocalFile({ onFileLoaded: handleFileLoaded });

  const handleCopy = async () => {
    const textToCopy = formattedOutput || rawInput;
    if (!textToCopy) return;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      showToast('Copied formatted JSON to clipboard!', 'success');
    } else {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleDownload = () => {
    const contentToDownload = formattedOutput || rawInput;
    if (!contentToDownload) return;
    downloadJsonFile(contentToDownload);
    showToast('Downloaded formatted.json', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      <Breadcrumb />

      <main className="flex-1">
        <Hero />

        {/* Workspace Container */}
        <section id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Main Toolbar */}
          <ToolToolbar
            indent={indent}
            onIndentChange={setIndent}
            onFormat={handleFormat}
            onAutoRepair={handleAutoRepair}
            onSortKeys={handleSortKeys}
            onMinify={handleMinify}
            onLoadSample={handleLoadSample}
            onClear={handleClear}
            onFileInput={handleFileInput}
            onCopy={handleCopy}
            onDownload={handleDownload}
            copied={copied}
            isValid={validationResult.isValid}
            hasInput={Boolean(rawInput.trim())}
          />

          {/* Two-Column Editor Layout */}
          <DropZone
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Left Panel: Raw Input */}
              <div className="w-full">
                <JsonEditor
                  value={rawInput}
                  onChange={setRawInput}
                  charCount={rawInput.length}
                />
              </div>

              {/* Right Panel: Formatted Result */}
              <div className="w-full">
                <JsonOutput
                  formattedOutput={formattedOutput}
                  rawInput={rawInput}
                  validationResult={validationResult}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onAutoRepair={handleAutoRepair}
                />
              </div>
            </div>
          </DropZone>

          {/* Real-time Statistics */}
          <Statistics stats={stats} />
        </section>

        {/* SEO Informational Sections */}
        <HowToUse />
        <Features />
        <FAQ />
      </main>

      <Footer />
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
};

export default App;
