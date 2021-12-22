import { shallowMount } from '@vue/test-utils';
import ReservationCalendar from '@/components/ReservationCalendar';

const defaultProps = {
    daysToShow: [],
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
    dateFirstSelectedIndex: 16,
    dateSecondSelectedIndex: 24,
    monthIndex: 0
};

describe('ReservationCalendar', () => {
    it('checking if main div has been rendered', () => {
        const wrapper = shallowMount(ReservationCalendar, {
            propsData: defaultProps
        });

        expect(wrapper.classes()).toContain('reservation-calendar');
    });

    it('checking if toDate is greater than fromDate', () => {
        const wrapper = shallowMount(ReservationCalendar, {
            propsData: defaultProps
        });

        const { dateFirstSelectedIndex, dateSecondSelectedIndex } = wrapper.vm;

        expect(dateSecondSelectedIndex).toBeGreaterThan(dateFirstSelectedIndex);
    });
});
