import axios from 'axios';

/*
POST /item/get
req: userId: id
res: [item] 해당 id의 item 전체 list
*/
export const getItems = async id => axios.post('/item/get', { userId: id });

/*
POST /item/update
req: item 객체 (itemId값 포함)
res: 성공여부만
*/
export const updateItem = async item => axios.post('/item/update', { item });

/*
POST /item/newimage
req: formdata "file"
res: {이미지가 서버에 저장된 주소값, 인식된이미지 좌표값, 라벨(이름, 카테고리, 서브카테고리), 예상 유통기한}
*/
export const sendImage = async form =>
  axios.post('/item/newimage', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

/*
POST /item/delete
req: itemId: key
res: 성공여부
*/
export const deleteItem = async key =>
  axios.post('/item/delete', { itemId: key });

/*
POST /item/change/name
req: {itemId, newName}
res: 성공여부만
*/
export const changeItemName = async item =>
  axios.post('/item/change/name', item);

/*
POST /item/add
req: userId, category, subCategory, name
res: 성공여부
*/
export const buyItem = async buy => axios.post('/item/add', buy);
