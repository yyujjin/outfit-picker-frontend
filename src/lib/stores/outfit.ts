import axios from 'axios';
import dayjs from 'dayjs';
import { get, writable } from 'svelte/store';

function isSameDate(d1: Date, d2: Date) {
	return dayjs(d1).isSame(d2, 'date');
}

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
			return data;
		},
		hasOutfit(date: Date) {
			const { outfits } = this.getState();
			return outfits.some((o) => isSameDate(date, o.date));
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
		setData(date: Date) {
			const { outfits } = this.getState();

			const { weather, temperature, photo } = outfits.find((o) => isSameDate(date, o.date));
			console.log(weather, temperature);

			update((state) => ({
				...state,
				weather,
				temperature,
				photo,
				date: dayjs(date).format('YYYY-MM-DD'),
				dialogOpen: true
			}));
		},
		async setOutfitOfMonth() {
			const data = await this.fetchData(2024, 4);
			update((state) => ({ ...state, outfits: data }));
			console.log(data);
		}
	};
};

export default outfitStore;
