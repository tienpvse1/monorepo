import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
export const useSocket = <ResponseType, PayloadType>(props: {
  event: string;
  onReceive: (data?: ResponseType) => any;
  socket: Socket;
}) => {
  const [data, setData] = useState<ResponseType>(null!);

  const emit = (event: string, payload?: PayloadType) => {
    props.socket.emit(event, payload);
  };

  useEffect(() => {
    const { socket, event, onReceive } = props;
    socket.on(event, (response: ResponseType) => {
      setData(response);
      onReceive(response);
    });
  }, [props.socket]);
  return { data, emit };
};
