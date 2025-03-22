import { useEffect, useState } from "react";

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<any>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connected!");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);
      setMessages(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed. Reconnecting...");
      setTimeout(() => setWs(new WebSocket(url)), 3000); 
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url]);

  return messages;
};

export default useWebSocket;