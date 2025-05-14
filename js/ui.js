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

function fadeIn(target, scrollTrigger){
    const targets = gsap.utils.toArray(target);

    if (!target.length) return;

    gsap.from(targets, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.5,
        scrollTrigger: {
            trigger: scrollTrigger,
            start: 'top 70%',
            toggleAction: 'play none none none'
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

            