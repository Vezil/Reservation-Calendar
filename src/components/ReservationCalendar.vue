<template>
    <div class="reservation-calendar">
        <div class="price">{{ price }}zł</div>

        <div class="month-switch">
            <div @click="changeMonth(-1)"> &#60;</div>
            <div>{{ months[monthIndex] }} 2021</div>
            <div @click="changeMonth(+1)"> &#62; </div>
        </div>

        <table class="table">
            <tr>
                <th v-for="(day, index) in days" :key="index"> {{ day }}</th>
            </tr>
            <tr>
                <td
                    v-for="(dayNumber, index) in daysToShow.slice(0, 7)"
                    :key="index"
                >
                    {{ dayNumber }}
                </td>
            </tr>
            <tr>
                <td
                    v-for="(dayNumber, index) in daysToShow.slice(7, 14)"
                    :key="index"
                >
                    {{ dayNumber }}
                </td>
            </tr>
            <tr>
                <td
                    v-for="(dayNumber, index) in daysToShow.slice(14, 21)"
                    :key="index"
                >
                    {{ dayNumber }}
                </td>
            </tr>
            <tr>
                <td
                    v-for="(dayNumber, index) in daysToShow.slice(21, 28)"
                    :key="index"
                >
                    {{ dayNumber }}
                </td>
            </tr>
            <tr>
                <td
                    v-for="(dayNumber, index) in daysToShow.slice(28, 35)"
                    :key="index"
                >
                    {{ dayNumber }}
                </td>
            </tr>
            <tr>
                <td
                    v-for="(dayNumber, index) in daysToShow.slice(35, 42)"
                    :key="index"
                >
                    {{ dayNumber }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default {
    name: 'ReservationCalendar',
    props: {
        price: {
            type: Number,
            required: true
        },
        votesAmount: {
            type: Number,
            required: true
        },
        availableRange: {
            type: Array,
            required: true
        },
        unavailableRange: {
            type: Array,
            required: true
        },
        selectedRange: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    computed: {
        daysToShow() {
            const daysToShowArray = [];

            const previousMonthNumber =
                this.monthIndex < 10
                    ? this.monthIndex === 0
                        ? `01`
                        : `0${this.monthIndex}`
                    : String(this.monthIndex);

            const daysInPreviousMonth = moment(
                `2021-${previousMonthNumber}`,
                'YYYY-MM'
            ).daysInMonth();

            const firstWeekdayOfMonth = moment(
                `2021-${previousMonthNumber}-01`
            ).weekday();

            if (!this.dateRange) {
                return daysToShowArray;
            }

            for (const day of this.dateRange.by('day')) {
                daysToShowArray.push(day.date());
            }

            for (let i = 0; i < firstWeekdayOfMonth; i++) {
                daysToShowArray.unshift(daysInPreviousMonth - i);
            }

            return daysToShowArray.slice(0, 42);
        }
    },
    data() {
        return {
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            monthIndex: 0,
            dateRange: null
        };
    },
    mounted() {
        const start = moment('2021-01-01', 'YYYY-MM-DD');
        const end = moment('2021-12-31', 'YYYY-MM-DD');

        this.dateRange = moment.range(start, end);
    },
    methods: {
        changeMonth(value) {
            this.monthIndex += value;

            if (this.monthIndex <= 0) {
                this.monthIndex = 0;
            }

            if (this.monthIndex >= 11) {
                this.monthIndex = 11;
            }
        }
    }
};
</script>

<style scoped>
.month-switch {
    display: flex;
    justify-content: center;
}

.month-switch > div {
    margin: 20px;
}

.table {
    margin: auto;
}

table > tr,
td {
    padding: 10px;
}
</style>
