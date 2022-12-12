import {SAMS_VERSION, SAMS_VERSION_LOCAL_STORAGE_KEY} from "./constants";
import {getLocalStorage} from "./utils/localStorage";

const ANNOUNCEMENT_CONTENT = `
欢迎使用SAMScript，此次更新带来了一些错误修复和改进：

- 增加了出校原因更改，不填则不会更改原有出校原因;
- 请假列表首条记录 和 请假详情中的状态 将自动更改为 \`已通过\`

开发不易，如果可以，欢迎在GitHub给项目点Star，祝您红红火火，鸿运当头
`

export function announceUpdates() {
    if (getLocalStorage(SAMS_VERSION_LOCAL_STORAGE_KEY) !== SAMS_VERSION) {
        console.log("Announcing updates...");
        alert(ANNOUNCEMENT_CONTENT);
        localStorage.setItem(SAMS_VERSION_LOCAL_STORAGE_KEY, SAMS_VERSION)
    }
}
