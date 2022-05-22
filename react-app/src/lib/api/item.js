import axios from 'axios';

/*
req: id
res: [item] 해당 id의 item 전체 list
*/
export const getItems = async id => axios.post('/items', { id });

export const updateItem = async item => axios.post('/item/update', { item });

/*
req: name, id, passwd
res: id: [user의 id값], name: [user 성명]
*/
export const register = async ({ name, id, passwd }) =>
  axios.post('/users/register', { name, id, passwd });
