$(function () {
  gsap.registerPlugin(ScrollTrigger);

  // 전체 애니메이션 관련 초기(전역) 설정
  /* gsap.defaults({ duration: 0.4, ease: 'bounce.out' }); */

  const video = $('.visual video').get(0);

  $(window).on('scroll', function () {
    let scrollTop = $(this).scrollTop();
    if (scrollTop === 0) video.play();
  });

  // visual영역 애니메이션 구현
  const visualTL = gsap.timeline({ defaults: { duration: 1 } });
  visualTL.from('.visual video', { scale: 3, duration: 3, filter: 'blur(30px)' });
  visualTL.from('.logo', { autoAlpha: 0, y: -30, ease: 'power4.inOut' });
  visualTL.from('.gnb li', { autoAlpha: 0, y: -30, ease: 'power4.inOut', stagger: 0.2 });
  visualTL.from('.util', { autoAlpha: 0, y: -30, ease: 'power4.inOut' }, '-=0.4');

  visualTL.from('.visual-title h2 strong', { y: 100 });
  visualTL.from('.visual-title p', { autoAlpha: 0, y: 100 }, '-=0.3');
  visualTL.from('.visual-title .btn-cta', { autoAlpha: 0, y: 100 }, '-=0.3');

  // About us 영역 애니메이션 구현
  const aboutTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.about',
      markers: true,
      start: '0% 50%',
      onEnter: () => video.pause(),
    },
  });

  aboutTL.from('.about figure', { clipPath: 'inset(0 100% 0 0)', ease: 'none' });
  aboutTL.from('.about p', { autoAlpha: 0, x: -50, delay: 1 });

  // Team 영역 애니메이션 구현
  // 스크롤과 연동
  const teamTL = gsap.timeline({
    // 스크롤과 연동
    scrollTrigger: {
      trigger: '.team',
      // o
      start: '0% 20%' /* top=0% bottom=100% 트리거의 머리가 뷰포트의 바닥을 치고 */,
      end: '100% 0%' /* 트리거의 바닥이 뷰포트의 머리를 치고 */,
      pin: true,
      scrub: 1,
    },
  });

  teamTL.from('.team-list li figure', {
    autoAlpha: 0,
    rotation: 30,
    y: -100,
    stagger: 0.2,
  }); /* 똑같은명령줄거면 stagger쓰면됨 */

  teamTL.from(
    '.team-list li dl',
    {
      autoAlpha: 0,
      y: -50,
      stagger: 0.2,
    },
    '<' /* '<'를 주면 이타임라인의 바로 앞 지점에서 실행이 됨-->사진이랑 글자가 같이 나오게 됨-->원래는 사진나오고 글자 순서로 애니메이션실행 */
  );

  teamTL.to('.team', { backgroundColor: '#f39', duration: 3 }, '<');
  teamTL.from('.btn-with', { autoAlpha: 0, y: -50 }, '-=0.3');

  // sec-title에 대한 설정
  // 배열로 변환시키는 gsap의 유틸메서드 : .utils.toArray()
  // -> sec-title이 하나가 아니기 때문에 배열로 변환시킴
  // 뭉탱이:stagger / 웹 문서 여기저기에 있는것들:배열 -> gsap에만 있는 메서드

  const secTitle = gsap.utils.toArray('.sec-title');
  // console.log(secTitle);

  secTitle.forEach((item) => {
    // gsap.from(item, {
    //   scrollTrigger: {
    //     trigger: item,
    //     markers: true,
    //     start: 'top 70%',
    //   },
    //   autoAlpha: 0,
    //   y: 30,
    // });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          // markers: true,
          start: 'top 70%',
        },
      })
      .from(item, { autoAlpha: 0, y: 30 });
  });

  // work 애니메이션
  const workImg = gsap.utils.toArray('.work-con img');
  console.log(workImg);
  workImg.forEach((item, index) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: '0% 50%',
          end: '100%, 0%',
          // markers: true,
        },
      })
      .from(item, {
        x: -30,
        autoAlpha: 0,
        delay: index * 0.2,
        /* 개별로 있는 애들이기 때문에 stagger로 주면 안먹히고 delay를 줌 */
      });
  });
});
