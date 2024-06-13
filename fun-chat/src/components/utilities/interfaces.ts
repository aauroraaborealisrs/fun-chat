export interface MessageStatus {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  }
  
export interface MessagePayload {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: MessageStatus;
  }
  
export interface User {
    login: string;
    isLogined: boolean;
  }

export interface ServerResponse {
    id: string;
    type: string;
    payload: {
      message: {
        id: string;
        from: string;
        to: string;
        text: string;
        datetime: number;
        status: {
          isDelivered: boolean;
          isReaded: boolean;
          isEdited: boolean;
        };
      };
    };
  }

export interface Message {
    datetime: number;
    from: string;
    id: string;
    status: {
      isDelivered: boolean;
      isReaded: boolean;
      isEdited: boolean;
    };
    text: string;
    to: string;
  }