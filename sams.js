// ==UserScript==
// @name        SAMS
// @description 更改SAMS网页出校时间
// @match       https://sams.nottingham.edu.cn/zh/Students/stuaskforleave
// @match       https://sams.nottingham.edu.cn/zh/Students/stuaskforleave/*
// ==/UserScript==

/**
 * 判断是不是周末
 * @param {Date} time
 * @return {boolean | Date}
 */
function isWeekends(time) {
    const str = time.toString();
    const copy = new Date(str);
    if (str.includes("Sat")) {
        copy.setDate(time.getDate() - 1);
        return copy;
    } else if (str.includes("Sun")) {
        copy.setDate(time.getDate() - 2);
        return copy;
    }
    return false;
}

/**
 *
 * @param {Element} DOM
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

(function main() {
    const isDetailPage = location.href.includes("/details/");

    try {
        const cachedValue = localStorage.getItem("sams-crack");

        let currentTime = new Date();
        let startTime = new Date();
        let endTime = new Date();
        let applyTime = new Date();
        let approveTime = new Date();

        let isExpired = true;

        if (cachedValue) {
            try {
                const parsed = JSON.parse(cachedValue);
                startTime = new Date(parsed.startTime);
                endTime = new Date(parsed.endTime);
                applyTime = new Date(parsed.applyTime);
                approveTime = new Date(parsed.approveTime);
                isExpired = false;
            } catch (e) {}
        }

        if (isExpired) {
            // 如果之前没输入过时间，则重新输入
            let startHour = Number.parseInt(window.prompt("开始时间(小时):"));

            if (isNaN(startHour)) {
                alert("请输入正确的开始时间");
                return;
            }

            let endHour = Number.parseInt(window.prompt("结束时间(小时):"));

            if (isNaN(endHour)) {
                alert("请输入正确的结束时间");
                return;
            }

            //设置开始时间
            startTime.setHours(startHour, 0, 0);

            //设置结束时间
            endTime.setHours(endHour, 0, 0);

            const weekends = isWeekends(currentTime);
            if (weekends != false) {
                applyTime = weekends;
                approveTime = new Date(weekends);
            }

            //设置申请日期
            const applyHour = getRandomInt(5);
            applyTime.setHours(
                applyHour + 10,
                getRandomInt(60),
                getRandomInt(60)
            );

            //设置审批日期
            approveTime.setHours(
                applyHour + 11,
                getRandomInt(60),
                getRandomInt(60)
            );
        }

        localStorage.setItem(
            "sams-crack",
            JSON.stringify({
                startTime,
                endTime,
                applyTime,
                approveTime,
            })
        );

        const startTimeDOM = isDetailPage
            ? document.querySelector(
                  "body > div.wrapper > div.content-wrapper > section.content > div > div.form-horizontal > div:nth-child(2) > div"
              )
            : document.querySelector(
                  "body > div.wrapper > div.content-wrapper > section.content > div > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(2)"
              );

        const endTimeDOM = isDetailPage
            ? document.querySelector(
                  "body > div.wrapper > div.content-wrapper > section.content > div > div.form-horizontal > div:nth-child(3) > div"
              )
            : document.querySelector(
                  "body > div.wrapper > div.content-wrapper > section.content > div > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(3)"
              );

        const applyTimeDOM = isDetailPage
            ? document.querySelector(
                  "body > div.wrapper > div.content-wrapper > section.content > div > div.form-horizontal > div:nth-child(7) > div"
              )
            : document.querySelector(
                  "body > div.wrapper > div.content-wrapper > section.content > div > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(6)"
              );

        const approveTimeDOM = isDetailPage
            ? document.querySelector(
                  "body > div.wrapper > div.content-wrapper > section.content > div > div.form-horizontal > div:nth-child(8) > div > table > tbody > tr > td:nth-child(2)"
              )
            : undefined;

        setTimeText(startTimeDOM, startTime, 0);

        setTimeText(endTimeDOM, endTime, 0);

        setTimeText(applyTimeDOM, applyTime, 0);

        if (approveTimeDOM) {
            setTimeText(approveTimeDOM, approveTime, 1);
        }

        const avatarDOM = document.querySelector(
            "body > div.wrapper > header > nav > div.navbar-custom-menu > ul > li > ul > li.user-header > img"
        );
        avatarDOM.addEventListener("click", () => {
            localStorage.removeItem("sams-crack");
        });
    } catch (error) {
        console.log(error);
    }
})();
