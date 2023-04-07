import { atomFamily, selector } from 'recoil'

export const authState = atomFamily({
  key: 'authState',
  default: {
    id: 0,
    name: "",
    img_src: "",
    isLogin: false,
  },
})

export const loginSelector = selector({
  key: 'loginSelector',
  get: ({ get }) => {
    const { id, name, img_src,isLogin } = get(authState({}))
    return { id, name, img_src,isLogin }
  },
})
