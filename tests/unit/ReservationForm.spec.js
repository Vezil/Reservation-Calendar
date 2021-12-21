import { shallowMount } from '@vue/test-utils';
import ReservationForm from '@/components/ReservationForm';

describe('ReservationForm', () => {
    it('checking if main div has been rendered', () => {
        const wrapper = shallowMount(ReservationForm, {
            propsData: {
                price: 298,
                votesAmount: 123,
                stars: 3.5
            }
        });

        expect(wrapper.classes()).toContain('reservation-form');
    });
});
