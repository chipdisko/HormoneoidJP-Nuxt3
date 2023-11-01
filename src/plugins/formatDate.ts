import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      /* 日付表記を直す */
      formatDate: (inputDate: string, format = 'YYYY-MM-DD') => {
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return dayjs.utc(inputDate).tz('Asia/Tokyo').format(format)
      }      
    }
  }
})