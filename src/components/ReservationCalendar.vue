<template>
    <div class="reservation-calendar">
        <div class="price">{{ price }}zł</div>

        <div class="month-switch">
            <div @click="changeMonth(-1)"> &#60;</div>
            <div>{{ months[monthIndex] }} 2021</div>
            <div @click="changeMonth(+1)"> &#62; </div>
        </div>

        <div class="selected-interval">
            <div class="from">
                {{
                    dateFirstSelectedIndex === -1 ||
                    !daysToShow[dateFirstSelectedIndex]
                        ? '-'
                        : formattedInterval(
                              daysToShow[dateFirstSelectedIndex].dayNumber
                          )
                }}

                <div class="close-button" @click="cancelInterval('first')">
                    x
                </div>
            </div>
            <div class="arrow">&rarr;</div>
            <div class="to">
                {{
                    dateSecondSelectedIndex === -1 ||
                    !daysToShow[dateSecondSelectedIndex]
                        ? '-'
                        : formattedInterval(
                              daysToShow[dateSecondSelectedIndex].dayNumber
                          )
                }}

                <div class="close-button" @click="cancelInterval('second')">
                    x
                </div>
            </div>
        </div>

        <div class="calendar-body">
            <table class="table">
                <tr>
                    <th v-for="(day, index) in days" :key="index">
                        {{ day }}</th
                    >
                </tr>
                <tr v-for="index in 6" :key="index">
                    <td
                        v-for="(dayObject, dayNumberIndex) in daysToShow.slice(
                            (index - 1) * numOfColumns,
                            (index - 1) * numOfColumns + numOfColumns
                        )"
                        :key="dayNumberIndex"
                        @click="selectDate(dayObject)"
                        :class="{
                            'selected-day':
                                dayObject.available && isSelected(dayObject),
                            today:
                                dayObject.available &&
                                dayObject.dayNumber === today,
                            'in-range': isInRange(dayObject),
                            'unavailable-day': !dayObject.available
                        }"
                    >
                        {{ dayObject.dayNumber }}
                    </td>
                </tr>
            </table>
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
    computed: {
        daysToShow() {
            let daysToShowArray = [];

            const previousMonthNumber =
                this.monthIndex < 10
                    ? this.monthIndex === 0
                        ? `01`
                        : `0${this.monthIndex + 1}`
                    : String(this.monthIndex + 1);

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
                daysToShowArray.push({
                    dayNumber: day.date(),
                    available: true
                });
            }

            for (let i = 0; i < firstWeekdayOfMonth; i++) {
                daysToShowArray.unshift({
                    dayNumber: daysInPreviousMonth - i,
                    available: false
                });
            }

            daysToShowArray = daysToShowArray.slice(0, 42);

            let i = daysToShowArray.length - 1;

            while (
                daysToShowArray[i - 1].dayNumber < daysToShowArray[i].dayNumber
            ) {
                daysToShowArray[i].available = false;
                daysToShowArray[i - 1].available = false;
                i--;
            }

            return daysToShowArray;
        },
        today() {
            return parseInt(moment().format('DD'));
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
            dateRange: null,
            dateFirstSelectedIndex: 16,
            dateSecondSelectedIndex: 24,
            numOfColumns: 7
        };
    },
    mounted() {
        const start = moment('2021-01-01', 'YYYY-MM-DD');
        const end = moment('2021-12-31', 'YYYY-MM-DD');

        this.dateRange = moment.range(start, end);
    },
    methods: {
        changeMonth(value) {
            this.dateFirstSelectedIndex = -1;
            this.dateSecondSelectedIndex = -1;

            this.monthIndex += value;

            if (this.monthIndex <= 0) {
                this.monthIndex = 0;
            }

            if (this.monthIndex >= 11) {
                this.monthIndex = 11;
            }
        },
        selectDate(dayNumber) {
            const index = this.daysToShow.findIndex(
                (day) => day === dayNumber && dayNumber.available
            );

            if (!~index) {
                return;
            }

            this.dateSecondSelectedIndex = this.dateFirstSelectedIndex;
            this.dateFirstSelectedIndex = index;
        },
        isSelected(dayObject) {
            if (
                this.dateFirstSelectedIndex === -1 &&
                this.dateSecondSelectedIndex === -1
            ) {
                return false;
            }

            const isSelected =
                this.daysToShow[this.dateFirstSelectedIndex]?.dayNumber ===
                    dayObject?.dayNumber ||
                this.daysToShow[this.dateSecondSelectedIndex]?.dayNumber ===
                    dayObject?.dayNumber;

            return isSelected;
        },
        isInRange({ dayNumber, available }) {
            if (!available) {
                return false;
            }

            const isInRange =
                this.dateFirstSelectedIndex > this.dateSecondSelectedIndex
                    ? this.daysToShow[this.dateFirstSelectedIndex]?.dayNumber >
                          dayNumber &&
                      this.daysToShow[this.dateSecondSelectedIndex]?.dayNumber <
                          dayNumber
                    : this.daysToShow[this.dateFirstSelectedIndex]?.dayNumber <
                          dayNumber &&
                      this.daysToShow[this.dateSecondSelectedIndex]?.dayNumber >
                          dayNumber;

            return isInRange;
        },
        formattedInterval(day) {
            const selectedDate = `${day}/${this.months[this.monthIndex]}/2021`;

            return moment(selectedDate).format('ll').replace(',', '');
        },
        cancelInterval(indexType) {
            if (indexType === 'first') {
                this.dateFirstSelectedIndex = -1;
            }

            this.dateSecondSelectedIndex = -1;
        }
    }
};
</script>

<style scoped src="@/assets/styles/reservation-calendar.css"></style>
