import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {WebSocketStorage, WebSocketStorageType} from '@tricordarr/Components/Reducers/Fez/FezSocketReducer';

import {OpenFezSocket} from '@tricordarr/Libraries/Network/Websockets';

interface SocketContextType {
  fezSockets: WebSocketStorage;
  dispatchFezSockets: Dispatch<WebSocketStorageType>;
  openFezSocket: (fezID: string) => Promise<OpenFezSocket>;
  closeFezSocket: (fezID: string) => void;
  notificationSocket?: ReconnectingWebSocket;
  setNotificationSocket: Dispatch<SetStateAction<ReconnectingWebSocket | undefined>>;
  closeNotificationSocket: () => void;
  openNotificationSocket: () => void;
}

export const SocketContext = createContext(<SocketContextType>{});

export const useSocket = () => useContext(SocketContext);
