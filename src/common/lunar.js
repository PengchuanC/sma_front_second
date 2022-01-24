
export default {
    /**
     * 获取旧历几月几日
     * d : date对象
     * showYear: 是否显示农历年
     *
     * getLunarDay() //当天的农历日期
     * getLunarDay(new Date("1988-02-06")) //腊月十九
     * getLunarDay(new Date("1988-02-06"), true) //丁卯年 腊月十九
     *
     */
    getLunarDay: function(d, showYear) {
        let CalendarData = new Array(100);
        let madd = new Array(12);
        let tgString = "甲乙丙丁戊己庚辛壬癸";
        let dzString = "子丑寅卯辰巳午未申酉戌亥";
        let numString = "一二三四五六七八九十";
        let monString = "正二三四五六七八九十冬腊";
        let cYear, cMonth, cDay, TheDate;
        CalendarData = [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5,
            0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D,
            0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA,
            0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25,
            0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B,
            0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F,
            0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A,
            0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93,
            0x40E95];
        madd[0] = 0;
        madd[1] = 31;
        madd[2] = 59;
        madd[3] = 90;
        madd[4] = 120;
        madd[5] = 151;
        madd[6] = 181;
        madd[7] = 212;
        madd[8] = 243;
        madd[9] = 273;
        madd[10] = 304;
        madd[11] = 334;

        function GetBit(m, n) {
            return (m >> n) & 1;
        }

        function e2c() {
            TheDate = (arguments.length !== 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
            let total, m, n, k;
            let isEnd = false;
            let tmp = TheDate.getFullYear();
            total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
            if (TheDate.getYear() % 4 === 0 && TheDate.getMonth() > 1) {
                total++;
            }
            for (m = 0;; m++) {
                k = (CalendarData[m] < 0xfff) ? 11 : 12;
                for (n = k; n >= 0; n--) {
                    if (total <= 29 + GetBit(CalendarData[m], n)) {
                        isEnd = true;
                        break;
                    }
                    total = total - 29 - GetBit(CalendarData[m], n);
                }
                if (isEnd) break;
            }
            cYear = 1921 + m;
            cMonth = k - n + 1;
            cDay = total;
            if (k === 12) {
                if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth = 1 - cMonth;
                }
                if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth--;
                }
            }
        }

        function GetcDateString(showYear) {
            let tmp = "";
            if (showYear) {
                tmp += tgString.charAt((cYear - 4) % 10);
                tmp += dzString.charAt((cYear - 4) % 12);
                tmp += "年 ";
            }

            if (cMonth < 1) {
                tmp += "(闰)";
                tmp += monString.charAt(-cMonth - 1);
            } else {
                tmp += monString.charAt(cMonth - 1);
            }
            tmp += "月";
            tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
            if (cDay % 10 !== 0 || cDay === 10) {
                tmp += numString.charAt((cDay - 1) % 10);
            }
            return tmp;
        }

        function GetLunarDay(solarYear, solarMonth, solarDay) {
            if (solarYear < 1921 || solarYear > 2020) {
                return "";
            } else {
                solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
                e2c(solarYear, solarMonth, solarDay);
                return GetcDateString(showYear);
            }
        }

        if (!d) {
            let d = new Date();
        }
        return GetLunarDay(d.getFullYear(), d.getMonth() + 1, d.getDate());
    },

    /**
     * 此方法可以获取该日期处于某节气
     *
     * getjq() //当天处于某节气
     * */
    getjq: function(yyyy, mm, dd) {
        if (!yyyy || !mm || !dd) {
            let now = new Date();
            yyyy = now.getFullYear(); //年
            mm = now.getMonth() + 1; //月
            dd = now.getDate(); //日
        }
        mm = mm - 1;
        let sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693,
            263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
        let solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋",
            "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
        let solarTerms = "";
        while (solarTerms === "") {
            let tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
            let tmp2 = tmp1.getUTCDate();
            if (tmp2 === dd) solarTerms = solarTerm[mm * 2 + 1];
            tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
            tmp2 = tmp1.getUTCDate();
            if (tmp2 === dd) solarTerms = solarTerm[mm * 2];
            if (dd > 1) {
                dd = dd - 1;
            } else {
                mm = mm - 1;
                if (mm < 0) {
                    yyyy = yyyy - 1;
                    mm = 11;
                }
                dd = 31;
            }
        }
        return solarTerms;
    },

    /**
     * 此方法可以获取该日期处于某季节
     *
     * getSeason() //当天处于某季节
     * */
    getSeason: function(yyyy, mm, dd) {
        //获取节气
        let jq = this.getjq(yyyy, mm, dd);
        if (["立春", "雨水", "惊蛰", "春分", "清明", "谷雨"].includes(jq)) {
            return 'spring'
        }
        else if (["立夏", "小满", "芒种", "夏至", "小暑", "大暑"].includes(jq)) {
            return 'summer'
        }
        else if (["立秋", "处暑", "白露", "秋分", "寒露", "霜降", ].includes(jq)) {
            return 'autumn'
        }
        return 'winter'
    }
}
