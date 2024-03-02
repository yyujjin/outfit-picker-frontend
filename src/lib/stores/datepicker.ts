import { writable, get as getFromStore } from 'svelte/store';
import dayjs from 'dayjs';

const PICKER_TYPES = ['days', 'months', 'years'];

type DateUnit = 'day' | 'month' | 'year';

// state를 받는 함수를 리턴
const updateSelected = (value: number, dateUnit: DateUnit) => (state) => {
	const newState = { ...state, [dateUnit]: value };
	return { ...newState, selected: new Date(newState.year, newState.month, newState.day) };
};

const pipe =
	(...fns: Function[]) =>
	(val) =>
		fns.reduce((accum, fn) => fn(accum), val);

const zeroDay = (date) => dayjs(date).startOf('day').toDate();

const get = ({ selected, start, end, startOfWeekIndex = 0, shouldEnlargeDay = false }) => {
	const { subscribe, set, update } = writable({
		startOfWeekIndex,
		selected,
		start: zeroDay(start),
		end: zeroDay(end),
		shouldEnlargeDay, // 무슨 설정임?

		// open: false,
		// hasChosen: false,
		// enlargeDay: false,
		year: selected.getFullYear(),
		month: selected.getMonth(),
		day: selected.getDate(),
		activeView: 'days',
		activeViewDirection: 1
	});

	return {
		set,
		subscribe,
		getState() {
			return getFromStore({ subscribe });
		},
		// enlargeDay(enlargeDay = true) {
		// 	update((state) => ({ ...state, enlargeDay }));
		// },
		getSelectableVector(date: Date) {
			// 오ㅐ 이름이 벡터일까
			const { start, end } = this.getState();
			if (date < start) return -1;
			if (date > end) return 1;
			return 0;
		},
		isSelectable(date: Date, clamping = []): boolean {
			const vector = this.getSelectableVector(date);
			if (vector === 0) return true; // 설정한 시작과 종료 날짜 범위안에 있다면
			if (!clamping.length) return false;
			debugger; // 아래는 언제 실행될까
			const clamped = this.clampValue(dayjs(date), clamping).toDate();
			return this.isSelectable(clamped);
		},
		clampValue(day: dayjs.Dayjs, clampable): dayjs.Dayjs {
			const vector = this.getSelectableVector(day.toDate());
			if (vector === 0) return day;
			debugger; // 아래는 언제 실행될까
			const boundaryKey = vector === 1 ? 'end' : 'start';
			const boundary = dayjs(this.getState()[boundaryKey]);
			return clampable.reduce((day, type) => day[type](boundary[type]()), day);
		},
		add(amount: number, unit: 'month' | 'year', clampable = []) {
			update(({ month, year, day, ...state }) => {
				const d = this.clampValue(dayjs(new Date(year, month, day)).add(amount, unit), clampable);
				if (!this.isSelectable(d.toDate())) return { ...state, year, month, day };
				return {
					...state,
					month: d.month(),
					year: d.year(),
					day: d.date(),
					selected: d.toDate()
				};
			});
		},
		setActiveView(newActiveView: 'days' | 'months' | 'years') {
			const newIndex = PICKER_TYPES.indexOf(newActiveView);
			if (newIndex === -1) return;
			update(({ activeView, ...state }) => ({
				...state,
				activeViewDirection: PICKER_TYPES.indexOf(activeView) > newIndex ? -1 : 1,
				activeView: newActiveView
			}));
		},
		// setYear(year) {
		// 	update(updateSelected(year, 'year'));
		// },
		setMonth(month: number) {
			update(updateSelected(month, 'month'));
		},
		setDay(day: Date) {
			// day, month, year을 차례대로 state에 넣고 최종적으로 selectedDate를 생성한다.
			// 근데 이 방식은 너무 복잡해서 코드 개선 필요 TODO:
			update(
				pipe(
					updateSelected(day.getDate(), 'day'),
					updateSelected(day.getMonth(), 'month'),
					updateSelected(day.getFullYear(), 'year')
				)
			);
			// const fns = [
			// 	updateSelected(day.getDate(), 'day'),
			// 	updateSelected(day.getMonth(), 'month'),
			// 	updateSelected(day.getFullYear(), 'year')
			// ];

			// update((val) => {
			// 	const v3 = fns.reduce((accum, fn) => fn(accum), val);
			// 	return v3;
			// });
		},
		close(extraState: { hasChosen: boolean }) {
			// 왜 이름이 close??
			update((state) => ({ ...state, ...extraState, open: false }));
		},
		selectDay() {
			this.close({ hasChosen: true });
		},
		getCalendarPage(month: number, year: number) {
			const { startOfWeekIndex } = this.getState();
			let last = { date: new Date(year, month, 1), outsider: false };
			const days: { date: Date; outsider: boolean }[] = [];

			// 1일부터 month의 마지막일까지 채우기
			while (last.date.getMonth() === month) {
				days.push(last);
				const date = new Date(last.date);
				date.setDate(last.date.getDate() + 1);
				last = { date, outsider: false };
			}

			// 이전 달의 일을 맨 앞에 추가
			while (days[0].date.getDay() !== startOfWeekIndex) {
				const date = new Date(days[0].date);
				date.setDate(days[0].date.getDate() - 1);
				days.unshift({
					date,
					outsider: true
				});
			}

			last.outsider = true;
			// 6줄 채우기위해 다음달 일 추가
			while (days.length < 42) {
				days.push(last);
				last = { date: new Date(last.date), outsider: true };
				last.date.setDate(last.date.getDate() + 1);
			}

			return days;
		}
	};
};

export default { get };
