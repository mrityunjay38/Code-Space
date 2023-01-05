import { useEffect } from "react";
import { io } from "socket.io-client";
import Editor from "./Components/Editor";

const App = (props) => {
  const socket = io("ws://localhost:3001");

  useEffect(() => {
    socket.emit("message", { message: "Hi" });
    socket.on("message", (data) => {
      console.log(data);
    });

    return () => socket.disconnect();
  }, [socket]);

  return <Editor />;
};

export default App;
