export const getSignMessage = (nonce: number, wallet: string) => {
  return `Please sign this message to verify your wallet: ${wallet} with nonce: ${nonce}`;
};
