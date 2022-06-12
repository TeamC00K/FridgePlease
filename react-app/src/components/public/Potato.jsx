import React from 'react';

import { Card, Box, Typography } from '@mui/material';

const recipe = [
  {
    name: '감자 햄 볶음',
    memo: '1. 감자를 먹기 좋게 한입 크기로 자르고 전분기를 빼기 위해서 찬물에 최소한 10분 동안 넣습니다. 쿠킹오일을 넣고 다진 마늘 1 스푼을 넣고 볶아 줍니다. 2. 찬물에 담가두었던 감자를 꺼내서 볶습니다. 그리고 양파도 먹기 좋은 크기로 잘라줍니다. 그 다음 감자와 함께 볶아 줍니다.3. 진간장 3 큰술, 설탕 1큰술, 물 150ml, 1/6 대파, 꺄 1큰술, 참기름 1큰술을 넣고 중불 이하에서 조려 주면 완성입니다. 감자가 다 익지 않고 국물이 없어지면 물을 조금 더 넣으면서 조려 줍니다.',
    imgSrc: '/recipe/potato1.jpg',
  },
  {
    name: '감자 햄 볶음',
    memo: '1. 감자를 먹기 좋게 한입 크기로 자르고 전분기를 빼기 위해서 찬물에 최소한 10분 동안 넣습니다. 쿠킹오일을 넣고 다진 마늘 1 스푼을 넣고 볶아 줍니다. 2. 찬물에 담가두었던 감자를 꺼내서 볶습니다. 그리고 양파도 먹기 좋은 크기로 잘라줍니다. 그 다음 감자와 함께 볶아 줍니다.3. 진간장 3 큰술, 설탕 1큰술, 물 150ml, 1/6 대파, 꺄 1큰술, 참기름 1큰술을 넣고 중불 이하에서 조려 주면 완성입니다. 감자가 다 익지 않고 국물이 없어지면 물을 조금 더 넣으면서 조려 줍니다.',
    imgSrc: '/recipe/potato1.jpg',
  },
  {
    name: '감자 햄 볶음',
    memo: '1. 감자를 먹기 좋게 한입 크기로 자르고 전분기를 빼기 위해서 찬물에 최소한 10분 동안 넣습니다. 쿠킹오일을 넣고 다진 마늘 1 스푼을 넣고 볶아 줍니다. 2. 찬물에 담가두었던 감자를 꺼내서 볶습니다. 그리고 양파도 먹기 좋은 크기로 잘라줍니다. 그 다음 감자와 함께 볶아 줍니다.3. 진간장 3 큰술, 설탕 1큰술, 물 150ml, 1/6 대파, 꺄 1큰술, 참기름 1큰술을 넣고 중불 이하에서 조려 주면 완성입니다. 감자가 다 익지 않고 국물이 없어지면 물을 조금 더 넣으면서 조려 줍니다.',
    imgSrc: '/recipe/potato1.jpg',
  },
  {
    name: '감자 햄 볶음',
    memo: '1. 감자를 먹기 좋게 한입 크기로 자르고 전분기를 빼기 위해서 찬물에 최소한 10분 동안 넣습니다. 쿠킹오일을 넣고 다진 마늘 1 스푼을 넣고 볶아 줍니다. 2. 찬물에 담가두었던 감자를 꺼내서 볶습니다. 그리고 양파도 먹기 좋은 크기로 잘라줍니다. 그 다음 감자와 함께 볶아 줍니다.3. 진간장 3 큰술, 설탕 1큰술, 물 150ml, 1/6 대파, 꺄 1큰술, 참기름 1큰술을 넣고 중불 이하에서 조려 주면 완성입니다. 감자가 다 익지 않고 국물이 없어지면 물을 조금 더 넣으면서 조려 줍니다.',
    imgSrc: '/recipe/potato1.jpg',
  },
];

const style = {
  width: '15vh',
  height: '18vh',
  objectFit: 'contain',
};

function Potato() {
  return (
    <Box sx={{ p: 1 }}>
      {recipe.map((item, index) => (
        <Card
          key={index}
          sx={{
            height: '20vh',
            widht: 1,
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 2,
            p: 1,
          }}
        >
          <img alt="recipe" src={item.imgSrc} style={style} />
          <Box sx={{ p: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {item.name}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 5,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {item.memo}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

export default Potato;
