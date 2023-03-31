import { atomFamily, selector } from 'recoil';

export const authState = atomFamily({
  key: 'authState',
  default: {
    isLogin: false,
    user:{
      id: 0,
    },
  },
});

export const loginSelector = selector({
  key: 'loginSelector',
  get: ({ get }) => {
    const { isLogin, user } = get(authState({}));
    return {
      isLogin,
      user,
    };
  },
});