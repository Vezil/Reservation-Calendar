<template>
    <div id="app">
        <reservation-calendar
            :price="price"
            :votesAmount="votesAmount"
            :availableRange="availableRange"
            :unavailableRange="unavailableRange"
            :selectedRange="selectedRange"
        />
    </div>
</template>

<script>
import ReservationCalendar from '@/components/ReservationCalendar';

export default {
    name: 'App',
    components: {
        ReservationCalendar
    },
    data() {
        return {
            price: 298,
            votesAmount: 123,
            availableRange: [],
            unavailableRange: [],
            selectedRange: []
        };
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
