export const TOGGLE_LOADER = 'TOGGLE_LOADER'

export const toggleLoader = (loading = false) => ({
	type: TOGGLE_LOADER,
	loading
})
