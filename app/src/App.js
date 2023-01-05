import { useEffect } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import { debounce } from "./utils";

const App = (props) => {
  const socket = io("ws://localhost:3001");

  useEffect(() => {
    socket.emit("message", { message: "Hi" });
    socket.on("message", (data) => {
      console.log(data);
    });

    return () => socket.disconnect();
  }, [socket]);

  const handleEditorOnChange = debounce(
    (value, event) => console.log(value, event),
    300,
    []
  );

  return (
    <Editor
      theme="vs-dark"
      height="100vh"
      options={{
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
      defaultLanguage="javascript"
      defaultValue="/* Hello World */"
      onChange={handleEditorOnChange}
    />
  );
};

export default App;
