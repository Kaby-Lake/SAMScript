import dayjs, {Dayjs} from "dayjs";
import {MemorizedType} from "./types";
import {getStartOfDay} from "./utils/date";

export class Record {
    startTime: Dayjs

    endTime: Dayjs

    applyTime: Dayjs

    approveTime: Dayjs

    reason: string | undefined;

    constructor() {
        this.startTime = getStartOfDay(dayjs());
        this.endTime = getStartOfDay(dayjs());
        this.applyTime = getStartOfDay(dayjs());
        this.approveTime = getStartOfDay(dayjs());
        this.reason = undefined
    }

    public restoreRecord(record: MemorizedType): Record {
        this.startTime = dayjs(record.startTime);
        this.endTime = dayjs(record.endTime);
        this.applyTime = dayjs(record.applyTime);
        this.approveTime = dayjs(record.approveTime);
        this.reason = record.reason;
        return this;
    }

    public toMemorizedString(): string {
        return JSON.stringify({
            startTime: this.startTime.toString(),
            endTime: this.endTime.toString(),
            applyTime: this.applyTime.toString(),
            approveTime: this.approveTime.toString(),
            reason: this.reason,
        } as MemorizedType)
    }
}
