/**
 * Express router paths go here.
 */

type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};

const Paths = {
  Base: '/api',
  Auth: {
    Base: '/auth',
    login: '/login',
  },
  User: {
    Base: '/user',
    getNonce: '/nonce',
  },
};

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
