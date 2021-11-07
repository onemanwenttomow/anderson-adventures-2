declare interface User {
  name: string;
  color: string;
}

declare interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
  provider?: "google" | undefined;
}
