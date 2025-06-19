let boxes = document.querySelectorAll(".box");
let turnX = true;
let msg = document.querySelector(".win");
let reset = document.querySelector(".reset");
let cc=0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
    if(turnX){
    box.classList.add("diff");
    box.innerText = "X";
    turnX = false;

    } else{
        box.classList.remove("diff");
        box.innerText = "O";
        turnX = true;
    }
    cc++;
    box.disabled = true;
    checkWinner();
    checkDraw();

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

reset.addEventListener("click", ()=>{
    cc=0;
    turnX = true;
    boxes.forEach((box)=> {
      box.disabled = false;
      box.innerText = "";
    });
      msg.classList.add("hide");
});

let checkDraw = () => {
  if(cc==9 && msg.classList.contains("hide")){
     msg.classList.remove("hide");
     msg.innerText = `Game Draw`;
  }
};