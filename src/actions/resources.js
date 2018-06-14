import { GET_RESOURCES, SET_ACTIVE_TAG } from '../utils/constants';

export const getCards = () => ({
	type: GET_RESOURCES
});

export const setActiveTag = val => ({
	type: SET_ACTIVE_TAG,
	payload: val
});
