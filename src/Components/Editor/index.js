import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "./index.css";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl && !editor) {
      monaco.editor.create(monacoEl?.current, {
        value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
          "\n"
        ),
        // language: 'typescript'
      });
    }

    return () => editor?.dispose();
  }, []);

  return <div className="editor" ref={monacoEl} />;
};

export default Editor;
