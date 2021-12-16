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
                    v-for="(dayNumber, index) in monthDaysNumbers.slice(0, 7)"
                    :key="index"
                >
                    {{ dayNumber }}
                </td>
            </tr>
            <tr>
                <td
                    v-for="(dayNumber, index) in monthDaysNumbers.slice(7, 14)"
                    :key="index"
                >
                    {{ dayNumber }}
                </td>
            </tr>
            <tr>
                <td
                    v-for="(dayNumber, index) in monthDaysNumbers.slice(14, 21)"
                    :key="index"
                >
                    {{ dayNumber }}
                </td>
            </tr>
            <tr>
                <td
                    v-for="(dayNumber, index) in monthDaysNumbers.slice(21, 28)"
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
        monthDaysNumbers() {
            const monthDaysArray = [];

            const monthNumber =
                this.monthIndex + 1 < 10
                    ? `0${this.monthIndex + 1}`
                    : String(this.monthIndex + 1);

            const daysInMonth = moment(
                `2021-${monthNumber}`,
                'YYYY-MM'
            ).daysInMonth();

            console.log(moment(`2021-${monthNumber}-01`).weekday());

            if (!this.dateRange) {
                return monthDaysArray;
            }

            for (const day of this.dateRange.by('day')) {
                monthDaysArray.push(day.date());
            }

            return monthDaysArray.slice(0, daysInMonth);
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
