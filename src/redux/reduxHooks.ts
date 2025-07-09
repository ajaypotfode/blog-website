
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from './store'

const ReduxHooks = () => {
    const useAppDispatch = useDispatch.withTypes<AppDispatch>()
    const useAppSelector = useSelector.withTypes<RootState>()
    return {
        useAppDispatch,
        useAppSelector
    }
}
export const { useAppDispatch, useAppSelector } = ReduxHooks()

export default ReduxHooks
