import { UserStatusResponse } from "../../infrastructure/interfaces";

export enum StatusProfile {
  ONLINE = "en línea",
  BUSY = "ocupado",
  MISSING = "ausente", 
  OFFLINE = "desconectado",
}


export interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  status: string;
  statusId: number;
}

export interface UserChat {
  id: string;
  avatar: string;
  status: string;
}

export interface UserStatus extends UserStatusResponse { 

}