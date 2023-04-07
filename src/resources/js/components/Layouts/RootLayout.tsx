import { RecoilRoot } from 'recoil'
import { LayoutType } from '../../types'
import { Toaster } from 'react-hot-toast'

export const RootLayout = ({ children }: LayoutType) => {
  return (
    <div>
      <RecoilRoot>
        <Toaster />
        {children}
      </RecoilRoot>
    </div>
  )
}
export default RootLayout
