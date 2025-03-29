import { Middleware, MiddlewareAPI, Dispatch } from "@reduxjs/toolkit";
import {
  wsConnect,
  wsDisconnect,
  wsError,
  wsMessage,
} from "../services/slices/wsSlice";

interface WebSocketStartAction {
  type: "websocket/start";
  payload: { type: "all" | "my"; token?: string };
}

interface WebSocketStopAction {
  type: "websocket/stop";
}

type WebSocketAction = WebSocketStartAction | WebSocketStopAction;

const URL = "wss://norma.nomoreparties.space/orders";

const isWebSocketStartAction = (action: any): action is WebSocketStartAction =>
  action?.type === "websocket/start" && action?.payload?.type;

export const wsMiddleware: Middleware = (
  store: MiddlewareAPI<Dispatch, any>
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
          store.dispatch(wsConnect());
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
          socket.close();
          socket = null;
          activeConnection = null;
        }
      }
    }

    return next(action);
  };
};
