document.addEventListener('DOMContentLoaded', function(){
    const navLink = document.querySelectorAll('header nav a')

    navLink.forEach(navLink => {
        navLink.addEventListener('click',function(e){
            e.preventDefault();
            const navHref = navLink.getAttribute('href').replace('#', '');
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

    //intro animation

    const sun = gsap.timeline(); 
    const moon = gsap.timeline(); 
    const sunOpacity = gsap.timeline(); 
    const moonOpacity = gsap.timeline(); 

    window.addEventListener('load', () => {
        moveAnimation(moon, moonOpacity, '.animation-img .moon');
        moveAnimation(sun, sunOpacity, '.animation-img .sun');
    });
        
    function moveAnimation(tl, opacity, target){
        tl.to(target,{
            duration: 2,
            motionPath:{
                path: '#pathOrbit',
                align: '#pathOrbit',
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            },
        },0)
        .addPause(1.5)

        opacity.fromTo(target,
            {opacity: 0},
            {opacity: 1, duration: 1, ease: "sine.inOut", immediateRender: false},
            0
        )
        .addPause(1.5)
        .to(target,{
            opacity: 0,
            duration: 0.5
        },1.5)
    }


    const cloud = gsap.timeline({
        repeat: -1,
        delay: 2,
        repeatDelay: 0
    });
    
    cloud.to('.animation-img .cloud1',{
        duration: 6.5,
        motionPath:{
            path:'#pathCloud1',
            align:'#pathCloud1',
            alignOrigin: [0.5, 0.5],
            ease: "none"
        }
    },0)
    .fromTo('.animation-img .cloud1',
        {opacity: 0},
        {opacity: 1, duration: 1, ease: "none"},
        0
    )
    .to('.animation-img .cloud1',{
        opacity:0,
        duration: 1, ease: "none"
    }, 5.5)

    const cloud2 = gsap.timeline({repeat: -1});

    cloud2.to('.animation-img .cloud2',{
        duration: 6,
        motionPath:{
            path:'#pathCloud2',
            align:'#pathCloud2',
            alignOrigin: [0.5, 0.5],
        }
    },0)
    .fromTo('.animation-img .cloud2',
        {opacity: 0},
        {opacity: 1, duration: 1},
        0
    )
    .to('.animation-img .cloud2',{
        opacity:0,
        duration: 1
    }, 5)

    
    function fadeIn(target, scrollTrigger){
        const targets = gsap.utils.toArray(target);

        gsap.from(targets, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.5,
            scrollTrigger: {
                trigger: scrollTrigger,
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        })
    }

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

        workUl.insertAdjacentHTML('beforeend', work)

        })

        fadeIn('.work-list>li', '.work .sec-title')

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    document.querySelectorAll('section').forEach(section => {
        
        section.querySelectorAll('.fade-in').forEach(el => {
            fadeIn(el, section)
        })
        section.querySelectorAll('.fade-group').forEach(el => {
            fadeIn(el.querySelectorAll(':scope > *'), section)
        })
    })

    const colorMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const userDefaultMode = colorMode ? 'dark' : 'light'
    const savedMode = localStorage.getItem('mode');
    const initialMode = savedMode || userDefaultMode
    const modeButton = document.getElementById("btnMode");

    modeEvent(initialMode);

    function modeEvent(mode){
        document.documentElement.setAttribute('data-mode', mode)
        if(mode == 'dark'){
            gsap.to("#pathMode", { duration: 0.5, morphSVG: "#iconDark" });
            gsap.to('.animation-img .sun', { autoAlpha: 0, duration: 0.5 })
            gsap.to('.animation-img .moon', { autoAlpha: 1, duration: 0.5 })
            
        }else{
            gsap.to("#pathMode", { duration: 0.5, morphSVG: "#iconLight" });
            gsap.to('.animation-img .sun', { autoAlpha: 1, duration: 0.5 })
            gsap.to('.animation-img .moon', { autoAlpha: 0, duration: 0.5 })
        }
    }


    modeButton.onclick = function(){
        const currentMode = document.documentElement.getAttribute('data-mode');
        const newMode = currentMode === 'dark' ? 'light' : 'dark'
        localStorage.setItem('mode', newMode)
        modeEvent(newMode);
        if(newMode == 'dark'){
            moon.restart()
            sun.play()
            moonOpacity.restart()
            sunOpacity.play()
        }else{
            sun.restart()
            moon.play()
            sunOpacity.restart()
            moonOpacity.play()
        }
    }
})






