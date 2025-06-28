let boxes = document.querySelectorAll(".box");
let turnX = true;
let msg = document.querySelector(".win");
let reset = document.querySelector(".reset");
let cc=0;
let movesX = [];
let movesO = [];


function applyFading() {
    // Remove all existing fading
    boxes.forEach(b => b.classList.remove("fading"));

    if (turnX && movesX.length === 3) {
        boxes[movesX[0]].classList.add("fading");
    } else if (!turnX && movesO.length === 3) {
        boxes[movesO[0]].classList.add("fading");
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        // Player is placing their move
        box.disabled = true;
        box.innerText = turnX ? "X" : "O";
        box.classList.toggle("diff", turnX);

        if (turnX) {
            movesX.push(index);

            if (movesX.length > 3) {
                let removed = movesX.shift();
                boxes[removed].innerText = "";
                boxes[removed].disabled = false;
            }
        } else {
            movesO.push(index);

            if (movesO.length > 3) {
                let removed = movesO.shift();
                boxes[removed].innerText = "";
                boxes[removed].disabled = false;
            }
        }

        checkWinner();
        // checkDraw(); // optional

        turnX = !turnX;
        cc++;

        // NOW: Apply fading for the NEXT player at the start of their turn
        applyFading();
    });
});




const win = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const showWinner = (p1) => {
     msg.classList.remove("hide");
     msg.innerText = `${p1} WINS`;
};

const checkWinner = () => {
  for (let w of win) {
    let p1 = boxes[w[0]].innerText;
    let p2 = boxes[w[1]].innerText;
    let p3 = boxes[w[2]].innerText;
  
  if(p1 != "" && p2 != "" && p3 != ""){
    if(p1 == p2 && p2 == p3){
        showWinner(p1);
        boxes.forEach((box)=>{
          box.disabled = true;
        });
    }
  }
 }
};

reset.addEventListener("click", () => {
    cc = 0;
    turnX = true;
    movesX = [];
    movesO = [];
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("fading");
    });
    msg.classList.add("hide");
});


// let checkDraw = () => {
//   if(cc==9 && msg.classList.contains("hide")){
//      msg.classList.remove("hide");
//      msg.innerText = `Game Draw`;
//   }
// };
