(() => {

    let yOffset = 0;    // window.pageYOffset 대신 씀 (스크롤 위치)
    let prevScrollHeight = 0;   // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 높이 합
    let currentScene = 0;   // 현재 활성화된 스크롤 섹션(씬)
    let enterNewScene = false;  // 새로운 씬에 들어온 순간 true

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                // CSS에 변화를 줄 값 - opacity, transform.translate, 애니메이션 설정 구간(비율)
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.35 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
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
            if (sceneInfo[i].type === 'sticky') {
                    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                } else if (sceneInfo[i].type === 'normal'){
                    sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
                }
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
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        };
        
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            // 스크롤이 내려갈 때
            if (currentScene === 3) return;
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        if(yOffset < prevScrollHeight) {
            // 스크롤이 올라갈 때
            if (currentScene === 0) return;
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        };

    };

    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        if (values.length === 3) {
            // start ~ end 사이 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            const partScrollRatio = (currentYOffset - partScrollStart) / partScrollHeight;
            
            if (currentYOffset >= partScrollStart & currentYOffset <= partScrollEnd) {
                rv = values[0] + partScrollRatio * (values[1] - values[0])
            } else if ( currentYOffset < partScrollStart) {
                rv = values[0]
            } else if ( currentYOffset > partScrollEnd) {
                rv = values[1]
            }
            
            
        } else {
            rv = values[0] + scrollRatio * (values[1] - values[0])
        }
        
        return rv;
    };

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset-prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        switch (currentScene) {
            case 0:
                if(scrollRatio <= 0.22){
                    const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
                    const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
                    objs.messageA.style.opacity = messageA_opacity_in;
                    objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
                } else {
                    const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
                    const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
                    objs.messageA.style.opacity = messageA_opacity_out;
                    objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`
                }
                break;
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
        }
    };

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
        if (enterNewScene) return;
        playAnimation();
    });
    // window.addEventListener('DOMContentLoaded', setLayout);      // HTML 요소만 로드되면 바로 실행되기 때문에 시점이 더 빠름
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

})();