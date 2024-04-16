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
			return data;
		},
		hasOutfit(date: Date) {
			const { outfits } = this.getState();
			return outfits.some((o) => dayjs(date).isSame(o.date, 'date'));
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
		},
		setData(date: Date) {
			update((state) => ({
				...state,
				weather: '1',
				temperature: 10,
				photo: 'photo222',
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
