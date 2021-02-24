(() => {

    let yOffset = 0;    // window.pageYOffset 대신 씀 (스크롤 위치)
    let prevScrollHeight = 0;   // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 높이 합
    let currentScene = 0;   // 현재 활성화된 스크롤 섹션(씬)

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0')
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        },
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        };

        yOffset = window.pageYOffset;
        
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight > yOffset) {
                currentScene = i;
                break;
            };
        };
        document.body.setAttribute('id', `show-scene-${currentScene}`)
    };

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        };
        
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            // 스크롤이 내려갈 때
            if (currentScene == 3) return;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        if(yOffset < prevScrollHeight) {
            // 스크롤이 올라갈 때
            if (currentScene == 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        };
    };

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    // window.addEventListener('DOMContentLoaded', setLayout);      // HTML 요소만 로드되면 바로 실행되기 때문에 시점이 더 빠름
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

})();