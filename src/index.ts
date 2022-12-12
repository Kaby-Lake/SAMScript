import {
    AVATAR_DOM_SELECTOR, DETAIL_PAGE_APPLY_TIME_DOM_SELECTOR, DETAIL_PAGE_APPROVE_STATUS_DOM_SELECTOR,
    DETAIL_PAGE_APPROVE_TIME_DOM_SELECTOR,
    DETAIL_PAGE_END_TIME_DOM_SELECTOR, DETAIL_PAGE_REASON_DOM_SELECTOR,
    DETAIL_PAGE_START_TIME_DOM_SELECTOR, DETAIL_PAGE_STATUS_DOM_SELECTOR, LIST_PAGE_APPLY_TIME_DOM_SELECTOR,
    LIST_PAGE_END_TIME_DOM_SELECTOR, LIST_PAGE_REASON_DOM_SELECTOR,
    LIST_PAGE_START_TIME_DOM_SELECTOR, LIST_PAGE_STATUS_DOM_SELECTOR,
    SAMS_LOCAL_STORAGE_KEY
} from "./constants";
import {getIntegerFromPrompt} from "./utils/prompt";
import {Record} from "./record";
import {MemorizedType} from "./types";
import {getLocalStorage, hasLocalStorage, setLocalStorage} from "./utils/localStorage";
import {getRandomInt} from "./utils/math";
import {getEndOfWeekdays, isWeekends} from "./utils/date";
import dayjs, {Dayjs} from "dayjs";
import weekday from 'dayjs/plugin/weekday'
import {announceUpdates} from "./announcements";
import isEmpty from 'lodash.isempty';
dayjs.extend(weekday)

function setTimeText(DOM: Element | null, date: Dayjs, format: number) {
    let timeText = date.format('YYYY-MM-DD HH:mm');
    if (format == 1) {
        timeText = date.toDate().toLocaleString();
    }
    if (DOM) {
        DOM.innerHTML = timeText;
    }
}


(function main() {
    try {
        // 为了防止因为脚本执行慢被看出来，先隐藏DOM
        document.querySelector("body")!.style.visibility = "hidden";

        // 更新公告
        announceUpdates();

        const isDetailPage = location.href.includes("/details/");

        const record = new Record();

        if (hasLocalStorage(SAMS_LOCAL_STORAGE_KEY)) {
            try {
                const parsed = JSON.parse(getLocalStorage(SAMS_LOCAL_STORAGE_KEY) ?? "") as MemorizedType;
                record.restoreRecord(parsed)
            } catch (e) {
                localStorage.removeItem(SAMS_LOCAL_STORAGE_KEY)
                alert("LocalStorage 格式错误，请刷新页面后重试");
            }

        } else {
            // 如果之前没输入过时间，则重新输入
            let startHour = getIntegerFromPrompt("开始时间(小时):", "请输入正确的开始时间");

            let endHour = getIntegerFromPrompt("结束时间(小时):", "请输入正确的结束时间");

            let reason = window.prompt("请假原因(不填则不会修改)")

            //设置开始时间
            record.startTime = record.startTime.set("hour", startHour);

            //设置结束时间
            record.endTime = record.endTime.set('hour', endHour);

            record.reason = isEmpty(reason) ? undefined : reason!;

            if (isWeekends()) {
                record.applyTime = getEndOfWeekdays()
                record.approveTime = getEndOfWeekdays()
            }

            //设置申请日期
            const applyHour = getRandomInt(5);
            record.applyTime = record.applyTime
                .set("hour", applyHour + 10)
                .set("minute", getRandomInt(60))
                .set("minute", getRandomInt(60))

            //设置审批日期
            record.approveTime = record.approveTime
                .set("hour", applyHour + 11)
                .set("minute", getRandomInt(60))
                .set("minute", getRandomInt(60))

            setLocalStorage(SAMS_LOCAL_STORAGE_KEY, record.toMemorizedString())
        }

        const startTimeDOM = isDetailPage
            ? document.querySelector(DETAIL_PAGE_START_TIME_DOM_SELECTOR)
            : document.querySelector(LIST_PAGE_START_TIME_DOM_SELECTOR);

        const endTimeDOM = isDetailPage
            ? document.querySelector(DETAIL_PAGE_END_TIME_DOM_SELECTOR)
            : document.querySelector(LIST_PAGE_END_TIME_DOM_SELECTOR);

        const reasonDOM = isDetailPage
            ? document.querySelector(DETAIL_PAGE_REASON_DOM_SELECTOR)
            : document.querySelector(LIST_PAGE_REASON_DOM_SELECTOR);

        const applyTimeDOM = isDetailPage
            ? document.querySelector(DETAIL_PAGE_APPLY_TIME_DOM_SELECTOR)
            : document.querySelector(LIST_PAGE_APPLY_TIME_DOM_SELECTOR);

        const statusDOM = isDetailPage
            ? document.querySelector(DETAIL_PAGE_STATUS_DOM_SELECTOR)
            : document.querySelector(LIST_PAGE_STATUS_DOM_SELECTOR);

        const approveTimeDOM = isDetailPage
            ? document.querySelector(DETAIL_PAGE_APPROVE_TIME_DOM_SELECTOR)
            : undefined;

        const approveStatusDOM = isDetailPage
            ? document.querySelector(DETAIL_PAGE_APPROVE_STATUS_DOM_SELECTOR)
            : undefined;

        setTimeText(startTimeDOM, record.startTime, 0);

        setTimeText(endTimeDOM, record.endTime, 0);

        setTimeText(applyTimeDOM, record.applyTime, 0);

        if (approveTimeDOM) {
            setTimeText(approveTimeDOM, record.approveTime, 1);
        }

        // 设置请假原因，如果没填写，则不改
        if (record.reason) {
            reasonDOM!.innerHTML = record.reason;
        }

        // 设置状态为通过
        if (statusDOM) {
            statusDOM.innerHTML = "通过"
            statusDOM.className = 'label label-success'
        }
        if (approveStatusDOM) {
            approveStatusDOM.innerHTML = "通过"
        }

        // 点击头像dropdown清楚localStorage
        const avatarDOM = document.querySelector(AVATAR_DOM_SELECTOR);

        avatarDOM?.addEventListener("click", () => {
            localStorage.removeItem(SAMS_LOCAL_STORAGE_KEY);
        });

        // 最后再显示DOM
        document.querySelector("body")!.style.visibility = "visible";
    } catch (error) {
        console.log(error);
        document.querySelector("body")!.style.visibility = "visible";
    }
})();
