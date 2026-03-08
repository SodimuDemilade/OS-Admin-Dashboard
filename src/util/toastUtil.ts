import BaseToast from "@/component/toast/BaseToast.tsx";


class ToastUtil {
    private activeToasts = new Set<string>();

    showUniqueToast(key: string, message: string, type: 'success' | 'error' | 'warning' | 'info') {
        if (this.activeToasts.has(key)) return;

        this.activeToasts.add(key);
        BaseToast({
            message,
            type,
            options: {
                onClose: () => {
                    this.activeToasts.delete(key);
                }
            }
        });
    }

    clearToast(key: string) {
        this.activeToasts.delete(key);
    }

    clearAll() {
        this.activeToasts.clear();
    }
}

export const toastUtil = new ToastUtil();
