function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        lerp: 0.1, // Adjust the speed of the smooth scrolling (optional)
        tablet: { smooth: true }, // Enable smooth scrolling on tablets (optional)
        smartphone: { smooth: true }, // Enable smooth scrolling on smartphones (optional)
    });

    // Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // Tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ?
                locoScroll.scrollTo(value, 0, 0) :
                locoScroll.scroll.instance.scroll.y;
        }, // We don't have to define scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things differently on mobile devices - it doesn't transform the container at all! 
        // To avoid jitters, pin things with position: fixed on mobile.
        pinType: document.querySelector("#main").style.transform ?
            "transform" : "fixed",
    });

    // Refresh Locomotive Scroll and ScrollTrigger on page load
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // After everything is set up, refresh ScrollTrigger and update Locomotive Scroll
    ScrollTrigger.refresh();
}

// Call the function to initialize everything
locomotive();

function navAnimation() {
    let nav = document.querySelector("nav");
    nav.addEventListener("mouseenter", function() {
        let tl = gsap.timeline();

        tl.to("#nav-bottom", {
            height: "21vh",
            duration: 0.5,
        });
        tl.to(".nav-part2 h5", {
            display: "block",
            duration: 0.1,
        });
        tl.to(".nav-part2 h5 span", {
            y: 0,
            // duration:0.3,
            stagger: {
                amount: 0.5,
            },
        });
    });
    nav.addEventListener("mouseleave", function() {
        let tl = gsap.timeline();
        tl.to(".nav-part2 h5 span", {
            y: 25,
            stagger: {
                amount: 0.2,
            },
        });
        tl.to(".nav-part2 h5", {
            display: "none",
            duration: 0.1,
        });
        tl.to("#nav-bottom", {
            height: 0,
            duration: 0.2,
        });
    });
}

function page2Anim() {
    let allRightelem = document.querySelectorAll(".right-elem");
    let allRightelemImg = document.querySelectorAll(".right-elem img");
    // console.log(allRightelem);

    allRightelem.forEach((e) => {
        e.addEventListener("mouseenter", () => {
            gsap.to(e.childNodes[3], {
                opacity: 1,
            });
        });
        e.addEventListener("mouseleave", () => {
            gsap.to(e.childNodes[3], {
                opacity: 0,
            });
        });
        e.addEventListener("mousemove", (dets) => {
            gsap.to(e.childNodes[3], {
                x: dets.x - e.getBoundingClientRect().x - 90,
                y: dets.y - e.getBoundingClientRect().y - 150,
            });
        });
    });
}

function page3videoAnimation() {
    let page3center = document.querySelector(".page3-center");
    let video = document.querySelector("#page3 video");

    page3center.addEventListener("click", () => {
        video.play();
        gsap.to(video, {
            transform: "ScaleX(1) ScaleY(1)",
            opacity: 1,
            borderRadius: 0,
        });
    });
    video.addEventListener("click", () => {
        video.pause();
        gsap.to(video, {
            transform: "ScaleX(0.7) ScaleY(0)",
            opacity: 0,
            borderRadius: "30px",
        });
    });
    //have some comment
    let sections = document.querySelectorAll(".sec-right");
    // section comes in node list so we can apply for each

    sections.forEach((e) => {
        // console.log(e.childNodes[3]);
        e.addEventListener("mouseenter", () => {
            e.childNodes[3].style.opacity = 1;
            e.childNodes[3].play();
        });
        e.addEventListener("mouseleave", () => {
            e.childNodes[3].style.opacity = 0;
            e.childNodes[3].load();
        });
    });
}

function page7Anim() {
    gsap.from("#btm7-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#btm7-part2 h4",
            scroller: "#main",
            // markers:true,
            start: "top 80%",
            end: "top 10%",
            scrub: true,
        },
    });
}

navAnimation();
page2Anim();
page3videoAnimation();
page7Anim();


// making a laadig animation

function loadingAnimation() {

    var tl = gsap.timeline()
    tl.from("#page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 1,
        ease: "expo.out"
    })
    tl.from("nav", {
            opacity: 0,
            delay: -0.2
        })
        // tl.from("#page1 h1, #page1 p, #page1 div", {
        //     opacity: 0,
        //     duration: 0.5,
        //     stagger: 0.2
        // })
}
loadingAnimation()