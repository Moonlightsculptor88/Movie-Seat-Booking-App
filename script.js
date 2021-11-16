const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie');

populateUI();



const ticketPrice = +movieSelect.value;

//Save selected movie index and price

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice' , moviePrice);
}


// Update total and count
function updateSelectedCount(){
    var counter =0;
    // seats.forEach((item)=>{
    //     if(item.classList.contains('selected')){
    //         counter+= 1;
    //     }
    // })
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map( (seat) =>{
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats' , JSON.stringify(seatsIndex));

    


    counter = selectedSeats.length;
    count.innerText = counter;
    total.innerText = counter*movieSelect.value;
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !==null && selectedSeats.length >0){
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !==null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }


}


movieSelect.addEventListener('change', (e)=>{
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click' , (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
    
});

//Initial count and total set
updateSelectedCount();








