import axios from 'axios';
import dayjs from 'dayjs';
import { get, writable } from 'svelte/store';

const outfitStore = () => {
	const { subscribe, set, update } = writable({
		outfits: [],
		date: '',
		weather: '0',
		temperature: 20,
		photo: '',
		dialogOpen: false
	});
	return {
		set,
		subscribe,
		fetchData: async (year: number, month: number) => {
			const { data } = await axios.get(`/api/coordis?year=${year}&month=${month}`);
			update((state) => ({ ...state, outfits: data }));
			console.log(data);
		},
		hasOutfit(day) {
			console.log(day.date);
			return true;
		},
		init(date: Date) {
			update((state) => ({
				...state,
				weather: '0',
				temperature: 20,
				photo: 'photo',
				date: dayjs(date).format('YYYY-MM-DD'),
				dialogOpen: true
			}));
		},
		getState() {
			return get({ subscribe });
		},
		get() {
			const { weather, temperature, photo, date } = this.getState();
			console.log(temperature);
			return { weather, temperature, photo, date };
		}
	};
};

export default outfitStore;
