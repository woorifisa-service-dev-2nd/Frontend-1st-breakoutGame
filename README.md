# Frontend-1st-breakoutGame

## 2-1. 주제 및 팀 소개
주제: 벽돌깨기 게임
팀원: 경률 이솔, 주찬, 다빈

## 2-2. 협업 방식
git, github, codeShare

## 2-3. 기능 시연(실제로 시연 or gif 이미지 등)

## 2-4. 핵심 기능 설명 및 구현 방법
### 1. canvas 태그 
소개(참고 url : https://blog.naver.com/phlox__/221223871826)
HTML Canvas는 웹 페이지에서 그래픽을 그리기 위한 HTML 요소입니다. 
이를 사용하면 JavaScript를 통해 동적으로 그림을 생성하고 조작할 수 있습니다.
Canvas는 주로 2D 그래픽을 다루는 데 사용됩니다.
- 사용 예시
<canvas id="myCanvas" width="500" height="300"></canvas>

path는 점들의 집합이며, 서로 연결되면서 도형을 만들 수 있습니다.
• beginPath()
  // 새로운 path를 만듭니다.

• closePath()
  // path를 닫습니다.

• stroke()
  // 윤곽선을 이어 도형을 그립니다.

• fill()
  // path 내부를 채웁니다.

• clearRect (x, y, width, height)
  // 특정 부분을 지운 직사각형을 그립니다.
  
keyCode로 keyboard의 key 값을 받아 해당 key가 눌렸을 때에 대한 함수를 addEventListener로 처리함
이를 통해 패들을 좌우로 움직여 공을 튕기고 스페이스바로 일시정지 기능을 넣었음

### 2. 조작
addEventListener 로 키입력을 받아 처리
```js
ocument.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// 왼족 화살표를 눌렀을떄
function keyUpHandler(){
if (e.key == "Left" || e.key == "ArrowLeft") {
	// 이벤트 처리
  }
}

```

### 2. 충돌감지 기능(공이 벽과 패들바에 부딪힐 때, 공 튀기기)
공이 벽에 부딪힐 때, 공의 절반이 밖에 나갔다가 튀기는 것을 방지하기 위헤 
위쪽, 오른쪽, 왼쪽으로 나갈때는 ballRadius(공의 반지름)을 더하거나 빼서 계산한다,
아래쪽으로 나갈때는 공의 중심이 패들바 안에 있는지 확인하고 없으면 GAME OVER, 있으면 다시 방향을 전환한다.

```js
//공이 벽에 부딪힐 때, 공의 절반이 밖에 나갔다가 튀기는 것을 방지하기 위헤 
//위쪽, 오른쪽, 왼쪽으로 나갈때는 ballRadius(공의 반지름)을 더하거나 빼서 계산 했습니다.

// x , y = 공 위치
// dx , dy = 공이 이동하는 속도

if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

if (y + dy < ballRadius) {
    dy = -dy;
}
```

## 2-5. 트러블 슈팅
1.게임 정지 시, 공만 멈추고 패들바는 움직일 수 있는 문제점이 있었다.
그래서 패들의 움직임을 구현하는 코드에 boolean spacePressed로 스페이스바를 눌렀는지 확인하는 코드를 추가했다. 

2.alert 무한 로딩 현상 [확인을 눌러도 alert가 계속 생성됨(로직상의 문제)]
-> paddle의 위치를 기준으로 alert 조건문이 실행되는데 paddle이 초기 위치에 존재하지 않으면 공이 움직이는 로직이 반복적으로 실행
-> paddle을 초기 위치로 지정해준 뒤 alert를 실행하여 게임을 종료하도록 변경하여 문제를 해결했다.

3.스페이스바로 공을 멈췄을 때 방향이 오른쪽 위로만 진행방향이 바뀌는 문제
->originX와 originY로 변수를 생성하여 원래 속도를 저장하여 문제를 해결

## 2-6. 회고(느낀점) - 팀원 전부 각자 느낀점
경률 - 문제가 생기는 부분을 하나씩 찾으면서 해결하며 문제해결 능력을 키울 수 있었다. 

이솔-팀원들과 기능을 추가하고 수정하는 작업을 통해 기획하는 방법을 배울 수 있어 의미있었으며 기획한 기능을 직접 함수를 만들어 구현하는 것이 흥미로웠습니다.

주찬 - 개발 파트를 나누어 개발하여 효율적인 개발을 할수 있었습니다.

다빈 - 사용해보지 않은 태그를 사용하면서 개발을 진행하면서 새로운 기능들을 숙지할 수 있었고, 기존에 배웠던 내용들을 다시 한 번 정리할 수 있어서 좋았습니다.