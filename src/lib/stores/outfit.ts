import axios from 'axios';
import dayjs from 'dayjs';
import { get, writable } from 'svelte/store';

function isSameDate(d1: Date, d2: Date) {
	return dayjs(d1).isSame(d2, 'date');
}

export enum Mode {
	ADD,
	VIEW
}

const outfitStore = () => {
	const { subscribe, set, update } = writable({
		outfits: [],
		date: '',
		id: 0,
		weather: '0',
		temperature: 20,
		photo: '',
		dialogOpen: false,
		mode: Mode.ADD
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
		isSameDate(d1: Date, d2: Date) {
			return dayjs(d1).isSame(d2, 'date');
		},
		init(date: Date) {
			update((state) => ({
				...state,
				weather: '0',
				temperature: 20,
				photo: 'photo',
				date: dayjs(date).format('YYYY-MM-DD'),
				dialogOpen: true,
				mode: Mode.ADD
			}));
		},
		getState() {
			return get({ subscribe });
		},
		setData(date: Date) {
			const { outfits } = this.getState();

			const { id, weather, temperature, photo } = outfits.find((o) => isSameDate(date, o.date));

			update((state) => ({
				...state,
				id,
				weather,
				temperature,
				photo,
				date: dayjs(date).format('YYYY-MM-DD'),
				dialogOpen: true,
				mode: Mode.VIEW
			}));
		},
		async setOutfitOfMonth() {
			const data = await this.fetchData(2024, 4);
			update((state) => ({ ...state, outfits: data }));
		},
		closeDialog() {
			update((state) => ({ ...state, dialogOpen: false }));
		},
		async deleteOutfit() {
			const { id } = this.getState();
			console.log(id);
			await axios.delete(`/api/coordis/${id}`);
			this.setOutfitOfMonth();
		},
		async postOutfit(data) {
			await axios.post('/api/coordis', data);
			this.setOutfitOfMonth();
		}
	};
};

export default outfitStore;
