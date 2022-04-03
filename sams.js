// ==UserScript==
// @name        SAMS
// @description This is your new file, start writing code
// @match       https://sams.nottingham.edu.cn/zh/Students/stuaskforleave/details/*
// ==/UserScript==

/**
 * 判断是不是周末
 * @param {Date} time
 * @return {boolean | Date}
 */
function isWeekends(time) {
    const str = time.toString();
    if (str.includes("Sat")) {
        time.setDate(time.getDate() - 1);
        return time;
    } else if (str.includes("Sun")) {
        time.setDate(time.getDate() - 2);
        return time;
    }
    return false;
}

/**
 *
 * @param {Document} DOM
 * @param {Date} time
 * @param {Number} format
 */
function setTimeText(DOM, time, format) {
    const month = (time.getMonth() + 1).toString().padStart(2, "0");
    const day = time.getDate().toString().padStart(2, "0");
    const hour = time.getHours().toString().padStart(2, "0");
    const minute = time.getMinutes().toString().padStart(2, "0");
    let timeText = `2022-${month}-${day} ${hour}:${minute}`;
    if (format == 1) {
        timeText = time.toLocaleString();
    }
    DOM.innerText = timeText;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

try {
    const columns = document.getElementsByClassName("form-horizontal")[0];
    const startTimeDOM = columns.children[1].children[1];
    const endTimeDOM = columns.children[2].children[1];
    const applyTimeDOM = columns.children[6].children[1];
    const approveTimeDOM =
        columns.children[7].children[1].children[0].children[1].children[0]
            .children[1];

    let startHour;

    const cachedValue = localStorage.getItem("sams-crack-start");
    debugger;

    if (cachedValue) {
        try {
            const parsed = JSON.parse(cachedValue);
            // 如果是五分钟以前，则要求重新输入
            if (parsed.storeTime + 5 * 60 * 1000 > Date.now()) {
                startHour = parsed.value;
            }
        } catch (e) {}
    }
    if (startHour == undefined) {
        startHour = Number.parseInt(window.prompt("开始时间(小时): "));
    }

    if (!window.isNaN(startHour)) {
        const cachedValue = {
            value: startHour,
            storeTime: Date.now(),
        };
        localStorage.setItem("sams-crack-start", JSON.stringify(cachedValue));

        let currentTime = new Date();

        //设置开始时间
        currentTime.setHours(startHour, 0, 0);
        setTimeText(startTimeDOM, currentTime, 0);

        //设置结束时间
        currentTime.setHours(startHour + 1);
        setTimeText(endTimeDOM, currentTime, 0);

        const weekends = isWeekends(currentTime);
        if (isWeekends != false) {
            currentTime = weekends;
        }

        //设置申请日期
        const applyHour = getRandomInt(5);
        currentTime.setHours(
            applyHour + 11,
            getRandomInt(60),
            getRandomInt(60)
        );
        setTimeText(applyTimeDOM, currentTime, 0);

        //设置审核日期
        currentTime.setHours(
            applyHour + 12,
            getRandomInt(60),
            getRandomInt(60)
        );
        setTimeText(approveTimeDOM, currentTime, 1);
    }
} catch (error) {
    console.log(error);
}
