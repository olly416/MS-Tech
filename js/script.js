///////////////////////////////// INDEX /////////////////////////////////
// 스와이퍼 슬라이드 초기 설정
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// 헤더 포커스 시에 높이 변경
const headerAnchor = $('header'),
      headerNav = $('header a');
headerNav.on("focus", function() {
  headerAnchor.addClass("focus");
});
headerNav.on("blur", function() {
  headerAnchor.removeClass("focus");
});



// 메인슬라이드 글자 효과
const mainSlides = $(".swiper-slide");
let idx = 0;

swiper.on("transitionEnd", function () {
  idx = swiper.realIndex;
  animationStart();
});
animationStart();

function animationStart() {
  mainSlides.each(function (index, elem) {
    let SlideNum = index + 1;
    $(elem).removeClass("active");
  });
  mainSlides.eq(idx).addClass("active");
}


// Business Section 마우스 오면 비디오 재생
const videoContainer = $(".video_container");

videoContainer.mouseover(function () {
  const hoverVid = $(this).find(".business_vid");
  hoverVid[0].play();
});
videoContainer.mouseout(function () {
  const hoverVid = $(this).find(".business_vid");
  hoverVid[0].pause();
});

// 스크롤이 해당 섹션 진입 시 작동하는 것들
const windowHeight = $(document).height() - $(window).height(),
      windowWidth = $(window).width(),
      companyObj = $(".companyContent_img > div, .companyContent_content"),
      businessVids = $(".business_vid"),
      businessImg = $(".business_img");

$(window).scroll(function () {
  const scrollValue = $(window).scrollTop(),
    trigger = scrollValue / windowHeight;

  // 1. Company section 진입하면, 배경화면 animation 시작
  if (windowWidth >= 1301) {
    if (trigger > 0.4) {
      companyObj.addClass("activate");
    }
  }

  // 2. 화면너비 1300px ~ 481px & 비즈니스 섹션 진입하면, 비디오/이미지 재생
  if (windowWidth < 1301 && windowWidth >= 481) {
    if (trigger > 0.2) {
      businessVids.css("display", "none");
      businessImg.css("display", "block");
    }
    if (trigger > 0.4) {
      businessVids.css("display", "block");
      businessImg.css("display", "none");
      companyObj.addClass("activate");
    }
  }
  // 3. 화면너비 481px 미만 & 비즈니스 섹션 진입하면, 비디오/이미지 재생
  if (windowWidth < 481) {
    if (trigger > 0.2) {
      businessImg.eq(0).css("display", "block");
    }
    if (trigger > 0.27) {
      businessImg.eq(1).css("display", "block");
    }
    if (trigger > 0.5) {
      businessVids.css("display", "block");
      businessImg.css("display", "none");
    }
    if (trigger > 0.53) {
      companyObj.addClass("activate");
    }
  }

  // 4. CEO인사말 섹션 들어가면, GNB메뉴 상단 고정
  const gnbBar = $(".gnb_bar");
  if (scrollValue >= 500) {
    gnbBar.addClass("fixed");
    $("html, body").addClass("fixed");
  } else {
    gnbBar.removeClass("fixed");
    $("html, body").removeClass("fixed");
  }

  // topBtn 일정 스크롤 이상 되면 나타난다
  const topBtn = $(".topBtn");
  topBtn.css("opacity", "0");
  if (trigger >= 0.6) {
    topBtn.animate({ opacity: 1 }, { duration: 50, easing: "linear" });
  } else if (trigger < 0.6) {
    topBtn.animate({ opacity: 0 }, { duration: 50, easing: "linear" });
  }
});


// 메뉴버튼 누를 때마다 클래스명 active 토글
const activeObj = $("body, header, .nav"),
  mnBtn = $("header .bars");
mnBtn.click(function () {
  activeObj.toggleClass("active");
  $(this).find("i").toggleClass("active");
});


// 모바일에서 .nav 터치하면 메뉴 높이 변화
const navHeight = $(".nav li");
navHeight.on("click", function () {
  $(this).toggleClass("activate").siblings().removeClass("activate");
});



//////////////////////////   INDEX 외 다른 페이지    //////////////////////////
// GNB:Hover(PC), click(Moblie) 하면 메뉴 보이기
const gnb = $(".gnb_menu > span, .gnb_submenu > span");

function toggleHover() {
  $(this).siblings("ul").toggleClass("hover");
}
if (windowWidth < 481) {
  gnb.click(toggleHover);
} else {
  gnb.hover(toggleHover);
}
// GNB 아닌 빈화면 누르면 사라지기
$("html, body").on("click touchstart touchend", function (ev) {
  if (!gnb.is(ev.target)) {
    gnb.siblings("ul").removeClass("hover");
  }
});


// battery 페이지 :  스크롤 절반 넘어가면 내용 나타남
$(window).scroll(function () {
  const currentPos = $(this).height() / 2 + $(this).scrollTop(),
        batteryObj = $(".batteryBtm");
  if(batteryObj.length && batteryObj.offset){
      const objOffset = batteryObj.offset().top;
    if (currentPos > objOffset) {
      batteryObj.addClass("visible");
    }
  }
});

// .topBtn 누르면 화면 맨 위로 이동
const topBtn = $(".topBtn");
topBtn.click(function () {
  $("html, body").animate({ scrollTop: 0 }, 500);
});
