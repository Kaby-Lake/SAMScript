import {
    AVATAR_DOM_SELECTOR, DETAIL_PAGE_APPLY_TIME_DOM_SELECTOR,
    DETAIL_PAGE_APPROVE_TIME_DOM_SELECTOR,
    DETAIL_PAGE_END_TIME_DOM_SELECTOR,
    DETAIL_PAGE_START_TIME_DOM_SELECTOR, LIST_PAGE_APPLY_TIME_DOM_SELECTOR,
    LIST_PAGE_END_TIME_DOM_SELECTOR,
    LIST_PAGE_START_TIME_DOM_SELECTOR,
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

            //设置开始时间
            record.startTime = record.startTime.set("hour", startHour);

            //设置结束时间
            record.endTime = record.endTime.set('hour', endHour);

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

        const applyTimeDOM = isDetailPage
            ? document.querySelector(DETAIL_PAGE_APPLY_TIME_DOM_SELECTOR)
            : document.querySelector(LIST_PAGE_APPLY_TIME_DOM_SELECTOR);

        const approveTimeDOM = isDetailPage
            ? document.querySelector(DETAIL_PAGE_APPROVE_TIME_DOM_SELECTOR)
            : undefined;

        setTimeText(startTimeDOM, record.startTime, 0);

        setTimeText(endTimeDOM, record.endTime, 0);

        setTimeText(applyTimeDOM, record.applyTime, 0);

        if (approveTimeDOM) {
            setTimeText(approveTimeDOM, record.approveTime, 1);
        }

        const avatarDOM = document.querySelector(AVATAR_DOM_SELECTOR);

        avatarDOM?.addEventListener("click", () => {
            localStorage.removeItem(SAMS_LOCAL_STORAGE_KEY);
        });
    } catch (error) {
        console.log(error);
    }
})();
