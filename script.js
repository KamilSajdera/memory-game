const imageNames = [
    "icon_angular.png",
    "icon_css.webp",
    "icon_git.png",
    "icon_html.webp",
    "icon_javascript.png",
    "icon_mysql.png",
    "icon_php.png",
    "icon_react.png"
]

const duplicatedImageNames = imageNames.slice().concat(imageNames);
let shuffledImageNames

let id_userTime;
let userTime = 0;

let rotations = 0;
let firstReveal = true;
let firstCard;
let secondCard;
let userMoves = 0;
let pairsLeft = 8;


let firstCardId;


$("#playGame").click( () => {
    shuffledImageNames = shuffleArray(duplicatedImageNames);
    startGame();
})

function startGame()
{
    $(".cards").html("");

    for(let i = 0; i<=15; i++)
    {
        let div_card = document.createElement("div");
        $(div_card).addClass("card-item");

        $(div_card).click(function() {
            flipCard($(this).index(".card-item"));
        });

        $(".cards").append(div_card);
        $(div_card).animate({opacity: "1"}, 0)

    }

    id_userTime = setInterval(() => {
        userTime++;
        if(userTime<10)
            $(".wrapper h4 b").html(`0${userTime}s`)
        else
            $(".wrapper h4 b").html(`${userTime}s`)
    }, 1000);
}

function flipCard(nr) {

    if(rotations>=2 || nr==firstCardId)
        return;

    else 
    {
            $(".card-item").eq(nr).toggleClass("active")

            setTimeout(() => {
                
                $(".card-item").eq(nr).html(`<img src="images/${shuffledImageNames[nr]}">`);     
                checkPair(nr);

            }, 0100);
    }

}

function checkPair(nr)
{
   
    if(firstReveal)
    {
        firstCard = $(".card-item").eq(nr).find("img").attr("src").substring(7)
        firstCardId = nr;
    }
    else 
        secondCard = $(".card-item").eq(nr).find("img").attr("src").substring(7);

    firstReveal = false;
    rotations++;

    if(rotations == 2)
    {
        $(".wrapper h3").html(`Your moves: ${++userMoves}`)

        if(firstCard == secondCard)
        {
                setTimeout(() => {
                    let sound = new Audio('correct.mp3'); 
                    sound.play();
                }, 0400);

                setTimeout(() => {
                    $(".card-item").eq(firstCardId).addClass("pairTrue");
                    $(".card-item").eq(nr).addClass("pairTrue"); 
                }, 0750);

                setTimeout(() => {
                    $(".card-item").eq(firstCardId).addClass("hideCard");
                    $(".card-item").eq(nr).addClass("hideCard");
                    rotations = 0;
                    firstReveal = true;
                }, 1000)


                if(--pairsLeft == 0)
                {
                    clearTimeout(id_userTime);
                    setTimeout(() => {
                        winGame()
                    }, 1400)
                }
                    
        }
        else 
        {
                setTimeout(() => {
                    let sound = new Audio('wrong.mp3'); 
                    sound.play();
                }, 0500);

                setTimeout(() => {
                    $(".card-item").eq(firstCardId).toggleClass("active")
                    $(".card-item").eq(firstCardId).html("")
                    
                    $(".card-item").eq(nr).toggleClass("active")
                    $(".card-item").eq(nr).html("")
                   
                    rotations = 0;
                    firstReveal = true;
                    firstCardId = -1;
                }, 0800);
        }
    }
}

function winGame()
{
    $(".wrapper").html(`<h1>You win!</h1><br />
                        <h3><b>Your time: </b> ${userTime}s<br />
                        <b>Your moves:  </b>${userMoves}</h3>
                        <button id="playGame" style="position: inherit; margin-top: 30px;" onclick="location.reload()">Play Again</button>`
                    )
}


function getRandomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = getRandomIndex(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  