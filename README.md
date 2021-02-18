# Apple Website Interaction Clone

 해당 프로젝트는 인프런 강의 [애플 웹사이트 인터랙션 클론!](https://www.inflearn.com/course/%EC%95%A0%ED%94%8C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%9D%B8%ED%84%B0%EB%9E%99%EC%85%98-%ED%81%B4%EB%A1%A0)을 통해 학습하는 과정입니다. 이를 활용하여 포트폴리오를 만들어볼 계획입니다.



## 01. 웹 페이지 골격 만들기

#### - 메뉴 스타일링

네비게이션을 구축하는 단계로 상단에 위치하는 메뉴들을 위치시키고, 스타일링해줍니다.

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

`local-nav-links`의 `my-name` 클래스를 제외하고 왼쪽 마진을 준다

```CSS
.local-nav-links a:not(.my-name) {
    margin-left: 2em;
}
```

