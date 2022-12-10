import dayjs, {Dayjs} from "dayjs";
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(weekday)

export function getStartOfDay(date: Dayjs): Dayjs {
    return date.set("hour", 0).set("minute", 0).set("second", 0)
}

export function isWeekends(): boolean {
    return dayjs().weekday() === 6 || dayjs().weekday() === 0;
}

export function getEndOfWeekdays(): Dayjs {
    return dayjs().weekday(5)
}
