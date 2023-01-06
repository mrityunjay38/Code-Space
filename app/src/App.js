import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import { debounce } from "./utils";

const App = (props) => {
  const socket = io("ws://localhost:3001");
  const [message, setMessage] = useState("/* Hello World */");

  useEffect(() => {
    socket.on("client_message", (data) => {
      setMessage(data?.message);
    });
    return () => socket.disconnect();
  }, [socket]);

  const handleEditorOnChange = debounce(
    (value, event) => {
      setMessage(value);
      socket.emit("to_server_message", { message: value });
    },
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
      defaultValue={message}
      value={message}
      onChange={handleEditorOnChange}
    />
  );
};

export default App;
