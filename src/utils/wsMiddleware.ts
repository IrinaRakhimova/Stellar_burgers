import { Middleware, MiddlewareAPI, Dispatch } from "@reduxjs/toolkit";
import { wsConnect, wsDisconnect, wsError, wsMessage } from "../services/slices/wsSlice";

interface WebSocketStartAction {
  type: "websocket/start";
}

interface WebSocketStopAction {
  type: "websocket/stop";
}

type WebSocketAction = WebSocketStartAction | WebSocketStopAction;

export const wsMiddleware: Middleware = (store: MiddlewareAPI<Dispatch, any>) => {
  let socket: WebSocket | null = null;

  return (next) => (action: WebSocketAction | unknown) => { 
    if (typeof action === "object" && action !== null && "type" in action) {
      if (action.type === "websocket/start") {
        socket = new WebSocket("wss://norma.nomoreparties.space/orders/all");

        socket.onopen = () => {
          store.dispatch(wsConnect());
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          store.dispatch(wsMessage(data));
        };

        socket.onerror = (error) => {
          store.dispatch(wsError("WebSocket error"));
          console.error("WebSocket Error:", error);
        };

        socket.onclose = () => {
          store.dispatch(wsDisconnect());
          setTimeout(() => store.dispatch({ type: "websocket/start" }), 3000);
        };
      }

      if (action.type === "websocket/stop") {
        socket?.close();
        store.dispatch(wsDisconnect());
      }
    }

    return next(action);
  };
};