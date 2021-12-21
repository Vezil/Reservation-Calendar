import { shallowMount } from '@vue/test-utils';
import ReservationCalendar from '@/components/ReservationCalendar';

describe('ReservationCalendar', () => {
    it('checking if main div has been rendered', () => {
        const wrapper = shallowMount(ReservationCalendar, {
            propsData: {
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
            }
        });

        expect(wrapper.classes()).toContain('reservation-calendar');
    });
});
