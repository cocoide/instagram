import { LayoutType } from '../../types'
import Header from './Header'

export const DefaultLayout = ({ children }: LayoutType) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
export default DefaultLayout