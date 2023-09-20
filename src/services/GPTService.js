import createHttp from './BaseService';

const http = createHttp(true);

export const getDailyTip = () => http.get('/gpt/tip');

export const getDailyRecipe = () => http.get('/gpt/recipe');
