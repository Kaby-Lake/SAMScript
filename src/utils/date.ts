import dayjs, {Dayjs} from "dayjs";

export function getStartOfDay(date: Dayjs): Dayjs {
    return date.set("hour", 0).set("minute", 0).set("second", 0)
}

export function isWeekends(): boolean {
    return dayjs().weekday() === 6 || dayjs().weekday() === 7;
}

export function getEndOfWeekdays(): Dayjs {
    return dayjs().weekday(5)
}
