import { RecoilRoot } from 'recoil'
import { LayoutType } from '../../types'

export const RootLayout = ({ children }: LayoutType) => {
  return (
    <div>
      <RecoilRoot>{children}</RecoilRoot>
    </div>
  )
}
export default RootLayout
