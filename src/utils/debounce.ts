class Debouncer {
    timer: null | ReturnType<typeof setTimeout>;
    
    constructor() {
        this.timer = null; // 定义 timer
    }

    debounce(func: (...args: any[]) => void, delay: number , immediate = false) {


        return (...args: any[]) => {
            // 清除之前的 timer
            if (this.timer) {
                clearTimeout(this.timer);
            }
            if (immediate && !this.timer) {
                func.apply(this, args);
            }
            // 设置新的 timer
            this.timer = setTimeout(() => {
                func.apply(this, args); // 执行传入的函数
            }, delay);
        };
    }
}

export default new Debouncer();