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

    it('removes selected date range', () => {
        const wrapper = shallowMount(ReservationForm, {
            propsData: defaultProps
        });

        console.log(wrapper.vm.dateSecondSelectedIndex, 'STATE 1');

        const closeButton = wrapper.find('.close-button');

        closeButton.trigger('click');

        const { dateFirstSelectedIndex, dateSecondSelectedIndex } = wrapper.vm;

        expect(dateFirstSelectedIndex).toEqual(-1);
        expect(dateSecondSelectedIndex).toEqual(-1);
    });
});
