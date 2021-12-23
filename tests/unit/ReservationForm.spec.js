import { shallowMount } from '@vue/test-utils';
import ReservationForm from '@/components/ReservationForm';

const defaultProps = {
    price: 298,
    votesAmount: 123,
    stars: 3.5,
    unavailableDays: []
};

describe('ReservationForm', () => {
    it('checking if main div has been rendered', () => {
        const wrapper = shallowMount(ReservationForm, {
            propsData: defaultProps
        });

        expect(wrapper.classes()).toContain('reservation-form');
    });

    it('checking if removing the selected date range is doing correctly', () => {
        const wrapper = shallowMount(ReservationForm, {
            propsData: defaultProps
        });

        const closeButton = wrapper.find('.close-button');

        closeButton.trigger('click');

        const { dateFirstSelectedIndex, dateSecondSelectedIndex } = wrapper.vm;

        expect(dateFirstSelectedIndex).toEqual(-1);
        expect(dateSecondSelectedIndex).toEqual(-1);
    });

    it('checking if unavailable days are applying correctly', () => {
        const testingDayNumber = 30;

        defaultProps.unavailableDays.push(`2021-01-${testingDayNumber}`);

        const wrapper = shallowMount(ReservationForm, {
            propsData: defaultProps
        });

        const { available } = wrapper.vm.daysToShow.find(
            ({ dayNumber }) => dayNumber === testingDayNumber
        );

        expect(available).toEqual(false);
    });
});
