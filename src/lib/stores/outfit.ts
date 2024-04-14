import axios from 'axios';
import { writable } from 'svelte/store';

const outfitStore = () => {
	const { subscribe, set, update } = writable({
		outfits: []
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
		}
	};
};

export default outfitStore;
