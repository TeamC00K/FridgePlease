import axios from 'axios';

/*
req: id, passwd
res: id: [user의 id값], name: [user 성명]
*/
export const login = async ({ id, passwd }) =>
  axios.post('/users/login', { id, passwd });

/*
req: name, id, passwd
res: id: [user의 id값], name: [user 성명]
*/
export const register = async ({ name, id, passwd }) =>
  axios.post('/users/register', { name, id, passwd });
