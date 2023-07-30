# ❄️ FridgePlease, 냉비서
구매연동기능과 이미지 인식 인공지능을 이용한 자동 냉장고 관리 앱 "냉비서"

### 🔀 기획/개발 방향
<details>

<summary>
내용 보기
</summary>

<div markdown="1">

 다음은 기존 냉장고 관리 앱인 "유통기한 언제지" 의 UI이다.
  ![image](https://github.com/TeamC00K/FridgePlease/assets/18081105/33107509-049b-4e78-8125-f8489436ccb1)
사용자가 직접 모든 식료품의 정보를 직접 입력하는 방식으로 관리가 이루어진다. 그렇지만 이는 매우 번거로운 일이기에 지속적으로 이와 같은 방식으로 식료품을 관리하기에는 불편함이 많아보인다. 
 <br> 
 <br>
그렇기에 이러한 점들을 개선하여 우리가 개발 한 앱인 "냉비서"는 유통기한이 얼마 남지 않은 식료품을 자동으로 확인하고, 식료품을 소모할때마다 바뀐 소모상태를 반영하는 등의 냉장고를 관리하는 기능을 지원한다. 
이를 지원하는 방식은 크게 두가지의 방식이 있는데 첫번째는 바로 image detection과 classification model을 활용하여 냉장고 내부의 음식들을 인식하고, 분류하여 자동으로 예상 유통기한을 입력하여 유저과 관리하는 식료품 데이터베이스에 업데이트되는 방식으로 관리가 이루어진다.

![image](https://github.com/TeamC00K/FridgePlease/assets/18081105/edc3b639-d3ce-46a5-bf27-c3c3a27e07bc)

다만 인식/분류에 실패할 경우 수동으로 입력을 할 수 있는 기능을 지원하여 예측오차를 대응하였다.
![image](https://github.com/TeamC00K/FridgePlease/assets/18081105/0026c99d-2837-4686-a6e3-d0a5519ec5ec)

이러한 방식에 의존할 경우 데이터가 축적되기 전에는 정확도가 낮을 것이며, 초기 고객/투자를 확보하기에 어려움이 있을것이라고 판단하여 식료품을 입력하는 다른 방식을 구상하였다.
 <br> 
<br> 
두번째 방법은 각종 식료품을 다루는 e-commerce 플랫폼과 협업하여 구매연동 서비스를 구축하여 배송이 완료되면 자동으로 유저과 관리하는 식료품 데이터베이스에 업데이트되는 방식이다. 이를 활용하면 기존 식료품 관리 앱에 비해서 상당히 편리하게 사용할 수 있을 뿐더러, 초기 데이터 부족으로 인한 문제를 빠르게 해결할 수 있는 보완책이 되기에 이러한 입력방식을 선택하였다. 이러한 두가지의 방식을 활용하면 온라인/오프라인에서 구매하는 식료품을 모두 자동으로 관리할 수 있다는 장점이 있다.
 <br>
 <br>
 따라서 냉비서의 플로우차트를 간략하게 나타내면 다음과 같다.
 
 ![image](https://github.com/TeamC00K/FridgePlease/assets/18081105/0be29a8b-2cb2-4a08-8e5c-dca566ce6b5f)

</div>
</details>

## 💡 핵심 기능



구매 연동 | 식료품 인식/분류
:---: | :---: 
![구매](https://github.com/TeamC00K/FridgePlease/assets/18081105/46680671-692a-4b2f-b35a-220c8dd17177) | ![입력](https://github.com/TeamC00K/FridgePlease/assets/18081105/1bbd3530-49ef-4877-b451-9fc81e8e9b51)

"냉비서"앱의 가장 핵심기능은 바로  **식료품 자동 관리 기능**이다. 이를 지원하기 위해서 e-commerce 구매 연동 서비스와 식료품 인식/분류 기능을 통해서 자동으로 냉장고 속 식료품들을 관리할 수 있도록 하였다. 이를 통해서 사용자들은 직접 식료품을 입력하는 과정을 거치지 않고서도 음식의 상태를 자동으로 업데이트 할 수 있다. 또한 예측오차로 인한 불가피한 직접 입력을 하는 경우를 해결함에 있어 간편한 사용자 경험을 제공하기 위해 인식된 식재료들을 확인하는 과정을 슬라이드를 통해 자연스럽게 할 수 있도록 설계하였다.

메인 화면 | 관리 화면
:---: | :---: 
![메인화면](https://github.com/TeamC00K/FridgePlease/assets/18081105/fb76c018-9ca3-466e-bb9d-901e14a15d94) | ![카테고리](https://github.com/TeamC00K/FridgePlease/assets/18081105/f019e201-5ac2-4c96-8881-785e3e21d28f)

또한 앱의 메인 화면 상단에서는 유통기한이 얼마 남지 않았거나 곧 소진되는 식료품들을 알림으로 식료품 구매/관리에 대해 알림을 줄 수 있고, 추후 app으로 빌드 시, 푸시알림을 추가할 예정이다. 그리고 식료품 관리 화면에서는 각 식료품의 카테고리별로 관리를 할 수 있도록 하였다. 우선 냉장고에 들어온 날짜와 유통기한을 띄워주고 소모 정도를 편리하게 슬라이드 하는 방식으로 조절을 할 수 있도록 설계하였다.

## ⚙ 기술 스택 (Technique Used)

- ### Front-end
React | axios | material ui | redux
:---: | :---: | :---: | :---: 
![React-icon svg](https://github.com/vesselofgod/WebRTC_HIPAA_Compliance/assets/18081105/9115e57a-2af2-464c-ad95-8cb6f055e89a) | ![axios_logo_icon_168545](https://github.com/vesselofgod/WebRTC_HIPAA_Compliance/assets/18081105/1adfcc50-114d-4075-8c23-000635fcc729) | ![logo](https://github.com/vesselofgod/WebRTC_HIPAA_Compliance/assets/18081105/2ac318f0-397f-4d3b-b424-4de8852a1d98) | ![redux](https://github.com/vesselofgod/WebRTC_HIPAA_Compliance/assets/18081105/21a7ecd3-c11d-4c0d-a625-43b5e9ea2f78)



- ### Back-end
Flask | sqlalchemy 
:---: | :---: 
![unnamed](https://github.com/vesselofgod/WebRTC_HIPAA_Compliance/assets/18081105/ef42e689-f11a-499a-81ce-306aeb09fa17) | ![다운로드](https://github.com/vesselofgod/WebRTC_HIPAA_Compliance/assets/18081105/78f3c36e-58b6-4c4f-b55c-3fdd415333c8)

- ### Detection/Classification model
pytorch | tensorflow 
:---: | :---: 
![그림2](https://github.com/vesselofgod/WebRTC_HIPAA_Compliance/assets/18081105/f58da1d6-f95f-43cb-bae6-c9c23c2d29c1) | ![img](https://github.com/vesselofgod/WebRTC_HIPAA_Compliance/assets/18081105/702adc0b-65a7-4216-b340-b7ea1b505dc8)
 
## ⚡️ 설치/실행 안내 (Installation/Run Process)
- ```git clone https://github.com/TeamC00K/FridgePlease.git```를 활용해서 frontend와 backend component를 다운로드 받는다.
- frontend component의 설치가 완료되었으면 flask-app 폴더로 이동한 후 ```npm install```을 통해서 front-end dependency를 설치한다.
- ```npm start```를 통해서 frontend component를 실행한다.
- open web browser and connect ```localhost:3000```

- backend component를 실행하고 싶다면 마찬가지로 ```git clone``` 을 이용해서 해당 컴포넌트를 설치하고 dependency를 설치한 다음 flask-server 폴더에서 ```flask run```을 통해서 실행할 수 있다. 다만 S3 bucket에 대한 key는 따로 .env 파일을 통해서 설정하여야 한다.
