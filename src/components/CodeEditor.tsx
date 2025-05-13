import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to ensure it only loads client-side
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
  height?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  height = '400px',
  readOnly = false,
}) => {
  return (
    <div className="border border-gray-700 rounded overflow-hidden" style={{ height }}>
      <MonacoEditor
        height="100%"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 14,
          automaticLayout: true,
          readOnly,
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          showFoldingControls: 'always',
        }}
      />
    </div>
  );
};

export default CodeEditor; 