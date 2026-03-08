// RouterUtil.ts

import type {NavigateFunction} from "react-router-dom";

class RouterUtil {
    private static navigateFn: NavigateFunction | null = null;

    public static setNavigateFn(navigateFn: NavigateFunction) {
        RouterUtil.navigateFn = navigateFn;
    }

    public static navigate(path: string, options?: { replace?: boolean }) {
        if (RouterUtil.navigateFn) {
            RouterUtil.navigateFn(path, options);
        } else {
            // console.error("Navigate function is not set. Make sure to call setNavigateFn.");
        }
    }
}

export default RouterUtil;
