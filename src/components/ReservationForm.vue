<template>
    <div class="reservation-form">
        <div class="reservation-head">
            <div class="submit-values">
                <div class="price">{{ price }}zł</div>
                <div class="submit-button" @click="submit">Reserve</div>
            </div>

            <div class="votes">
                <div class="stars"
                    ><span
                        v-for="(star, index) in parseInt(stars)"
                        :key="`active-${index}`"
                        class="active-stars"
                    >
                        &#9733;
                    </span>

                    <span v-if="isHalfStar" class="half-star"> &#10032; </span>

                    <span
                        v-for="(star, index) in isHalfStar
                            ? 4 - parseInt(stars)
                            : 5 - parseInt(stars)"
                        :key="`inactive-${index}`"
                        class="inactive-stars"
                    >
                        &#10032;
                    </span>
                </div>
                <div class="votes-amount">{{ votesAmount }}</div>
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
                <div class="interval-arrow">&rarr;</div>
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
        </div>

        <reservation-calendar
            :daysToShow="daysToShow"
            :months="months"
            :days="days"
            :dateFirstSelectedIndex="dateFirstSelectedIndex"
            :dateSecondSelectedIndex="dateSecondSelectedIndex"
            :monthIndex="monthIndex"
            @change-month="changeMonth"
            @select-date="selectDate"
        />
    </div>
</template>

<script>
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import ReservationCalendar from '@/components/ReservationCalendar.vue';

const moment = extendMoment(Moment);

export default {
    name: 'ReservationForm',
    components: { ReservationCalendar },
    props: {
        price: {
            type: Number,
            required: true
        },
        votesAmount: {
            type: Number,
            required: true
        },
        stars: {
            type: Number,
            required: true
        },
        unavailableDays: {
            type: Array,
            required: true
        }
    },
    computed: {
        daysToShow() {
            let daysToShowArray = [];

            const previousMonthNumber =
                this.monthIndex < 10
                    ? this.monthIndex === 0
                        ? `01`
                        : `0${this.monthIndex}`
                    : String(this.monthIndex);

            const currentMonthNumber =
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
                `2021-${currentMonthNumber}-01`
            ).weekday();

            if (!this.dateRange) {
                return daysToShowArray;
            }

            const startMonthIndex =
                moment(`2021-${currentMonthNumber}-01`).dayOfYear() - 1;

            for (const day of this.dateRange.by('day')) {
                daysToShowArray.push({
                    dayNumber: day.date(),
                    available: true
                });
            }

            this.unavailableDays.forEach((unavailableDay) => {
                const dayIndex = moment(unavailableDay).dayOfYear() - 1;

                daysToShowArray[dayIndex].available = false;
            });

            daysToShowArray = daysToShowArray.slice(
                startMonthIndex,
                startMonthIndex + 42
            );

            for (let i = 0; i < firstWeekdayOfMonth; i++) {
                daysToShowArray.unshift({
                    dayNumber: daysInPreviousMonth - i,
                    available: false
                });
            }

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
        isHalfStar() {
            return !Number.isInteger(this.stars);
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

            if (
                this.dateSecondSelectedIndex !== -1 &&
                this.dateFirstSelectedIndex > this.dateSecondSelectedIndex
            ) {
                const buffor = this.dateFirstSelectedIndex;

                this.dateFirstSelectedIndex = this.dateSecondSelectedIndex;
                this.dateSecondSelectedIndex = buffor;
            }
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
        },
        submit() {
            const startDate = this.daysToShow[this.dateFirstSelectedIndex];
            const endDate = this.daysToShow[this.dateSecondSelectedIndex];

            console.log({ startDate, endDate });

            // send to the backend
        }
    }
};
</script>

<style scoped src="@/assets/styles/reservation-form.css"></style>
