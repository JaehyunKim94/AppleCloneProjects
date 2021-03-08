# Apple Website Interaction Clone

 해당 프로젝트는 인프런 강의 [애플 웹사이트 인터랙션 클론!](https://www.inflearn.com/course/%EC%95%A0%ED%94%8C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%9D%B8%ED%84%B0%EB%9E%99%EC%85%98-%ED%81%B4%EB%A1%A0)을 통해 학습하는 과정입니다. 이를 활용하여 포트폴리오를 만들어볼 계획입니다.

 

## 01. 웹 페이지 골격 만들기

#### - 메뉴 스타일링

- 네비게이션을 구축하는 단계로 상단에 위치하는 메뉴들을 위치시키고, 스타일링해줍니다.

```CSS
.global-nav-links,
.local-nav-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    height: 100%;
}
```

- `local-nav-links`의 `my-name` 클래스를 제외하고 왼쪽 마진을 준다

```CSS
.local-nav-links a:not(.my-name) {
    margin-left: 2em;
}
```

- rem 과 em을 활용한 크기 조절 > 계산하기 편하다!

```css
.description strong {
    float:left;
    margin-right: 0.2em;
    font-size: 3rem;
    color: rgb(29, 29, 31);
}
```



## 02. 스크롤을 이용한 인터랙션 구현

스크롤 이벤트 발생 시 scrollLoop와 playAnimation 함수가 실행된다. 

```js
window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();		// 실행될 스크롤 섹션 정하기
    playAnimation();	// 텍스트 애니메이션 (css)
});
```



- Load vs DOMContentLoaded

```js
window.addEventListener('DOMContentLoaded', setLayout);
window.addEventListener('load', setLayout);
// DONContentLoaded는 HTML 요소만 로드되면 바로 실행되기 때문에 시점이 더 빠름 > 현직에서 더 많이 쓰임
```



- 참고

```
document.querySelector("[.class    #id]")
document.body.setAttribute(["id", `id_name_${변수}`])
```



## 03. 비디오 인터랙션 구현
- 비디오를 이미지로 바꿔서 저장후 스크롤할때마다 이미지 src를 바꿔준다
