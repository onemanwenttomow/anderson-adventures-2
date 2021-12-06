declare interface User {
  name: string;
  color: string;
  character: string;
  timesTablesHearts?: number;
}

declare interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
  provider?: 'google' | undefined;
}
