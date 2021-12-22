<template>
    <div id="app">
        <reservation-form
            :price="price"
            :votesAmount="votesAmount"
            :stars="stars"
            :unavailableDays="unavailableDays"
        />
    </div>
</template>

<script>
import ReservationForm from '@/components/ReservationForm';

export default {
    name: 'App',
    components: {
        ReservationForm
    },
    data() {
        return {
            price: 298,
            votesAmount: 123,
            stars: 3.5,
            unavailableDays: ['2021-01-06', '2021-01-07']
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
