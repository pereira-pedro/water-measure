export type CreateTokenCommand = {
  userId: string;
  scope?: string;
  ttlSeconds?: number;
};
