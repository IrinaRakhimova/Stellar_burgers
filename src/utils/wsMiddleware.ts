import { Middleware, MiddlewareAPI, Dispatch } from "@reduxjs/toolkit";
import {
  wsDisconnect,
  wsError,
  wsMessage,
} from "../slices/wsSlice";
import { RootState } from "../store/store";

interface WebSocketStartAction {
  type: "websocket/start";
  payload: { type: "all" | "my"; token?: string };
}

interface WebSocketStopAction {
  type: "websocket/stop";
}

type WebSocketAction = WebSocketStartAction | WebSocketStopAction;

const URL = "wss://norma.nomoreparties.space/orders";

const isWebSocketStartAction = (action: unknown): action is WebSocketStartAction =>
  typeof action === "object" &&
  action !== null &&
  "type" in action &&
  action.type === "websocket/start" &&
  "payload" in action &&
  typeof (action as WebSocketStartAction).payload?.type === "string";

export const wsMiddleware: Middleware = (
  store: MiddlewareAPI<Dispatch, RootState>
) => {
  let socket: WebSocket | null = null;
  let activeConnection: "all" | "my" | null = null;

  return (next) => (action: WebSocketAction | unknown) => {
    if (typeof action === "object" && action !== null && "type" in action) {
      if (isWebSocketStartAction(action)) {
        const { type } = action.payload;

        if (activeConnection === type) return next(action);

        if (socket) {
          socket.close();
        }

        let token = localStorage.getItem("accessToken");

        if (token?.startsWith("Bearer ")) {
          token = token.split(" ")[1];
        }

        const wsUrl = type === "all" ? `${URL}/all` : `${URL}?token=${token}`;

        socket = new WebSocket(wsUrl);

        activeConnection = type;

        socket.onopen = () => {
          console.log("WebSocket connected!");
          if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "subscribe", channel: "orders" }));
          }
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          store.dispatch(wsMessage({ type, data }));
        };

        socket.onerror = (error) => {
          store.dispatch(wsError("WebSocket error"));
          console.error("WebSocket Error:", error);
        };

        socket.onclose = () => {
          store.dispatch(wsDisconnect());
          activeConnection = null;
        };
      }

      if (action.type === "websocket/stop") {
        if (socket) {
          console.log("Closing WebSocket connection...");
          socket.onclose = null; 
          socket.onerror = null; 
          socket.close();
          socket = null;
          activeConnection = null;
        }
      }
    }

    return next(action);
  };
};
