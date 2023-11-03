import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
/*
  japan: Asia/Tokyo
  london: Europe/London
*/
const map: Record<string, string> = {
  'japan': 'Asia/Tokyo',
  'london': 'Europe/London'
}
dayjs.extend(utc);
dayjs.extend(timezone);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      /* 日付表記を直す */
      getOnairTime: (inputDate: string, format = 'DD.MM.YY HH:mm', zone: 'japan' | 'london' = 'london') => {
        return dayjs.utc(inputDate).tz(map[zone]).format(format) + ' - ' + dayjs.utc(inputDate).add(2, 'hour').tz(map[zone]).format('HH:mm') 
      },
      setTimezone: (inputDate:string, zone: 'japan' | 'london' = 'london') => {
        return dayjs.utc(inputDate).tz(map[zone])
      },
    }
  }
})