export interface Cultivation {
  id: string;
  name: string;
}

export interface User {
  cultivation_id: string;
  role: {
    id: number;
    name: string;
  };
  user: {
    id: number[];
    name: null;
  };
}

export interface Role {
  description: string;
  id: string;
  name: string;
}
