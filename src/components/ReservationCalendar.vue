<template>
    <div class="reservation-calendar">
        <div class="price">{{ price }}zł</div>

        <div class="month-switch">
            <div @click="changeMonth(-1)"> &#60;</div>
            <div>{{ months[monthIndex] }} 2021</div>
            <div @click="changeMonth(+1)"> &#62; </div>
        </div>

        <div class="days-labels">
            <span v-for="(day, index) in days" :key="index">
                {{ day }}
            </span>
        </div>
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
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'July', 'Sat'],
            monthIndex: 0
        };
    },
    mounted() {
        const start = moment('2021-01-01', 'YYYY-MM-DD');
        const end = moment('2021-12-31', 'YYYY-MM-DD');

        const range = moment.range(start, end);

        for (const day of range.by('day')) {
            console.log(day.format('YYYY-MM-DD'));
        }
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
</style>
