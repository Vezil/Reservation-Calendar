<template>
    <div class="reservation-calendar">
        <div class="month-switch">
            <div @click="changeMonth(-1)" class="change-month-arrow">
                &#60;
            </div>
            <div class="selected-month">{{ months[monthIndex] }} 2021</div>
            <div @click="changeMonth(+1)" class="change-month-arrow">
                &#62;
            </div>
        </div>

        <table class="table">
            <tr>
                <th v-for="(day, index) in days" :key="index">
                    {{ day }}
                </th>
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
</template>

<script>
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default {
    name: 'ReservationCalendar',
    props: {
        daysToShow: {
            type: Array,
            required: true
        },
        months: {
            type: Array,
            required: true
        },
        days: {
            type: Array,
            required: true
        },
        dateFirstSelectedIndex: {
            type: Number,
            required: true
        },
        dateSecondSelectedIndex: {
            type: Number,
            required: true
        },
        monthIndex: {
            type: Number,
            required: true
        }
    },
    computed: {
        today() {
            return parseInt(moment().format('DD'));
        }
    },
    data() {
        return {
            numOfColumns: 7
        };
    },
    methods: {
        changeMonth(value) {
            this.$emit('change-month', value);
        },
        selectDate(dayNumber) {
            this.$emit('select-date', dayNumber);
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
        }
    }
};
</script>

<style scoped src="@/assets/styles/reservation-calendar.css"></style>
