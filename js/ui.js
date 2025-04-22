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

const fadeDefaults = {
    y: 0,
    autoAlpha: 1,
    duration: 1,
    ease: 'power2.out',
}

const scrollT = {
    trigger: scrollTrigger,
    start: 'top 70%',
    toggleActions: 'play none none none'
}

function fadeIn(target, scrollTrigger = null,options = {}){
    gsap.set(target, {y: '20%', autoAlpha: 0});
    
    const base = {
        
        ...options
    }
    
    if(scrollTrigger){
            base.scrollTrigger = {
                
            }
    }

    return gsap.to(target, base)
}

document.querySelectorAll('section').forEach(section => {
    const title = section.querySelector('.sec-title');
    const desc = section.querySelector('.sec-desc');

    if(desc){
        gsap.set(desc, {y: '20%', autoAlpha: 0});
    }

    if(title){
        fadeIn(title, section,{
            onComplete: () =>{
                if(desc){
                    fadeIn(desc)
                }
                
            }
        });
    }else{
        return;
    }

    
});

fadeIn('.about-cont>div', '.about .sec-title', {
    delay:0.5,
    stagger: {amount: 0.5}
});

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

        fadeIn('.work-list>li', '.work .sec-title',{
            delay: 0.5,
            stagger: { amount: 0.5 }
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

            