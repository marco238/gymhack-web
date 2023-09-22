import createHttp from './BaseService';

const http = createHttp(true);

export const getProductList = () => http.get('/products');

export const getProduct = (id) => http.get(`/products/${id}`);

export const buyProduct = (product) => http.post('/products/checkout', product);
