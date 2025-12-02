import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.locale({
    ...nb,
    weekStart: 1,
})
dayjs.extend(isSameOrBefore)
