import * as socket from 'socket.io';
import { Socket } from 'net';

export interface UserSocket extends socket.Socket {
    username: string;
}