

let slidePosition = 0;
const slides = document.querySelectorAll(".carousel_item");
const totalSlides = slides.length;

//This launches every time we press next button
document.querySelector('#carousel_button--next').addEventListener("click", function(){
    nextSlide();

});

document.querySelector('#carousel_button--previous').addEventListener("click", function(){
    previousSlide();
});

function updateSlidePosition(){
    //loop through image array
    for(let slide of slides){
        slide.classList.remove('carousel_item--visible');
        slides[slidePosition].classList.add('carousel_item--visible');
        
    }

    
}

function nextSlide(){
    //if at last slide, then go back to starting
    
    if(slidePosition == totalSlides - 1){
        slidePosition = 0;
    }else{
        slidePosition++;
    }

    updateSlidePosition();
}


function previousSlide(){
    
    if(slidePosition == 0){
        slidePosition = totalSlides-1;
    }else{
        slidePosition--;
    }
    updateSlidePosition();
}



