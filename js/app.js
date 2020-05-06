/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 *  
*/
let sections = document.querySelectorAll('section');// array of all the section in the file
let navigationBar= document.querySelector('#navbar__list');//unordered list element
let navItemList = [];//list for storing navigation names
/**
 * End Global Variables
 * 
*/

function Navigating(){
    let navFragement = document.createDocumentFragment();//for stoppin browser to reflowing for each navigation item
   
    for(let section of sections){
        let navAnchor = document.createElement('a');//anchor element to link the navigation item to its section
        let navLi = document.createElement('li');//list element for adding each section 's name to navigation menu
        navAnchor.classList.add('menu__link');
        navAnchor.textContent = section.dataset.nav;//taking data nav property of section to store in anchor tag
        navLi.appendChild(navAnchor);//adding anchor to list
        navFragement.appendChild(navLi);//adding list to fragement
    }
    navigationBar.appendChild(navFragement);//adding fragement to unordered list
}

// Add class 'active' to section when near top of viewport
function Activating(){
    let active=false;//initially setting active as false
    for(let section of sections){
        if((window.scrollY+navigationBar.offsetHeight) < (section.offsetHeight+section.offsetTop) && !active){
            //if the scrolled pixels + unordered list height is less than section's offset height+offset top and  section is not set to active
            active = true;//make it active class
            section.classList.add('active');
        }
        else{
            section.classList.remove('active');//if not the remove the class active from section
        }
    }
}

function clickOnNavigation(){
    for (let navigationName of navigationBar.querySelectorAll('.menu__link')){
        //for each navigation item of unordered list having menu__link class
        navItemList.push(navigationName);//push each navigation item to the list
        navigationName.addEventListener("click", function(){
            Scrolling(navigationName);//for each navigation name if it gets clicked call scrolling function for that name
        });
    }
}

function Scrolling (navigationName){
    const sectionId = navigationName.textContent.replace(/\s/g, '').toLowerCase();
    //sectionId is navigation name but devoid of any space and in lower case alphabets
    const section = document.getElementById(sectionId);//above line makes actual section Id and this sectionId same
    window.scrollTo({top: section.offsetTop, left: 0, behavior: 'smooth'});//scroll smoothly for the section that its top is in viewport

}
document.addEventListener('DOMContentLoaded', function(){
    Navigating();//calling for function building navigation menu
    clickOnNavigation();//when clicking on a navigation name this will be called
});
window.addEventListener("scroll", Activating);//handle for setting section class as active 

