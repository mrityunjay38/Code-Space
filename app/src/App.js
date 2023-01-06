import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import { debounce } from "./utils";

const defaultMessage = `/* Hello World */

import React, { useEffect, useState } from "react";

const App = (props) => {
    const [message, setMessage] = useState("");

    return (<h1>
        {message}
    </h1>)
}

export default App;`;

const App = (props) => {
  const socket = io("ws://localhost:3001");
  const [message, setMessage] = useState(defaultMessage);

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
