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

export class OutfitStore {
	#year;
	#month;
	constructor(
		year: number,
		month: number,
		public data = writable({
			outfits: [],
			date: '',
			id: 0,
			weather: '0',
			temperature: 20,
			photo: '',
			dialogOpen: false,
			mode: Mode.ADD
		})
	) {
		this.#year = year;
		this.#month = month;
	}

	async fetchData() {
		const { data } = await axios.get(`/api/coordis?year=${this.#year}&month=${this.#month}`);
		return data;
	}
	hasOutfit(date: Date) {
		const { outfits } = this.getState();
		return outfits.some((o) => isSameDate(date, o.date));
	}
	isSameDate(d1: Date, d2: Date) {
		return dayjs(d1).isSame(d2, 'date');
	}
	init(date: Date) {
		this.data.update((state) => ({
			...state,
			weather: '0',
			temperature: 20,
			photo: 'photo',
			date: dayjs(date).format('YYYY-MM-DD'),
			dialogOpen: true,
			mode: Mode.ADD
		}));
	}
	getState() {
		return get(this.data);
		// return get({ subscribe });
	}
	setData(date: Date) {
		const { outfits } = this.getState();

		const { id, weather, temperature, photo } = outfits.find((o) => isSameDate(date, o.date));

		this.data.update((state) => ({
			...state,
			id,
			weather,
			temperature,
			photo,
			date: dayjs(date).format('YYYY-MM-DD'),
			dialogOpen: true,
			mode: Mode.VIEW
		}));
	}
	async setDate(year: number, month: number) {
		this.#year = year;
		this.#month = month + 1;
		this.setOutfitOfMonth();
	}

	async setOutfitOfMonth() {
		const data = await this.fetchData();
		this.data.update((state) => ({ ...state, outfits: data }));
	}
	closeDialog() {
		this.data.update((state) => ({ ...state, dialogOpen: false }));
	}
	async deleteOutfit() {
		const { id } = this.getState();
		console.log(id);
		await axios.delete(`/api/coordis/${id}`);
		this.setOutfitOfMonth();
	}
	async postOutfit(data) {
		await axios.post('/api/coordis', data);
		this.setOutfitOfMonth();
	}
}
