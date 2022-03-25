declare interface User {
  id: number;
  name: string;
  color: string;
  character: string;
  timesTablesHearts?: number;
}

declare interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
  provider?: "google" | undefined;
}

declare interface Monster {
  id: number;
  imgUrl: string;
  lives: number;
}
