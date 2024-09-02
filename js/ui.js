document.addEventListener('DOMContentLoaded', function(){
    const navLink = document.querySelectorAll('header nav a')

    navLink.forEach(navLink => {
        navLink.addEventListener('click',function(e){
            e.preventDefault();
            
            
            const navHref = navLink.getAttribute('href');
            // const hashAdd = '#' + navHref
            const secId = document.getElementById(navHref);


            if(secId){
                if(navHref == 'sec-home'){
                    document.body.scrollIntoView({behavior:'smooth'});
                    console.log(navHref)

                }else{
                    secId.scrollIntoView({behavior:'smooth'})

                }
            }
            
        })
    })
    
})


// gsap.to('.about-cont', {
//     scrollTrigger: '.work',
//     x: -500,
//     end: "+=500",
//     markers: true,
// });

// IntersectionObserver 콜백 함수
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.dataset.state = "active";
            observer.unobserve(entry.target); // 관찰 해제
        }
    });
};

// IntersectionObserver 설정
const observerOptions = {
    threshold: 0.3
};
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// 섹션 요소 선택 및 관찰
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

//위 코드 참고

// const observer = new IntersectionObserver((e)=>{
//     e.forEach((tg)=>{
//         if(tg.isIntersecting){
//             tg.target.dataset.state = "active";
//         }
//     })
// },{
//     threshold: 0.3
// })
// const sec = document.querySelectorAll('section')
// observer.observe(sec[1])
// observer.observe(sec[2])

gsap.set('.about-cont>div',{ y: '20%', autoAlpha: 0})
gsap.to('.about-cont>div',{
    scrollTrigger: '.about .sec-title',
    autoAlpha: 1,
    y: 0,
    duration: 1,
    delay: 0.5,
    stagger: { amount: 0.5 }
})


axios.get('worklist.json')
    .then(response => {
        const data = response.data
        const workUl = document.querySelector('.work-list');

        data.forEach((item, i)=>{
            let num = i + 1
            if(num < 10){
                num = '0' + num
            }
            let techList = '';
            item.technology.forEach(tech => {
                techList += `<li>${tech}</li>`;
            });
            
            const work=`<li>
            <a href="${item.URL}" target="_new">
                <div class="thumb">
                    <img src="images/work-site-${num}.jpg" alt="site name">
                </div>
                <div class="cont-wrap">
                    <h3>${item.title}</h3>
                    <ul class="list">
                        <li><b>작업 기간: </b>${item.date}</li>
                        <li><span>기여도: </span>${item.role}</li>
                        <li>${item.report}</li>
                    </ul>
                    <ul class="technology">
                        ${techList}
                    </ul>
                </div>
            </a>
        </li>`

        const li = document.createElement('li')
        li.innerHTML = work;
        workUl.appendChild(li.firstChild);
        })

        gsap.set('.work-list>li',{ y: '20%', autoAlpha: 0})
        gsap.to('.work-list>li',{
            scrollTrigger: '.work .sec-title',
            autoAlpha: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            stagger: { amount: 0.5 }
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

            