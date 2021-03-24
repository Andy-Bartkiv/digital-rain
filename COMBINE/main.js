function rndChar(str) {
    return str[Math.floor(Math.random() * str.length)]
}
function getRndChar(min=48, max=122) {
    let str = "";
    for (let i=min; i<max+1; i++)
        if (i<91 || i>96)
            str += String.fromCharCode(i);
    return rndChar(str);
  }
function rndNum(max) {
    return Math.floor(Math.random() * max);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function setFire(el, t=1000) {
    el.style.color = "#0f0";
    sleep(t).then(() => {
        el.removeAttribute("style");
    }); 
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const COL = 80;
const ROW = 40;

for (let i=0; i < COL; i++) {
    let newDiv = document.createElement("div");
    let content = "";
    // newDiv.className = `row-${i}`;
    newDiv.innerHTML = content;
    document.querySelector(".main-grid").appendChild(newDiv);
    for (let j=0; j < ROW; j++) {
        let newCh = document.createElement("div");
        newCh.className = 'cell';
        newCh.id = `c-${i}-${j}`;
        newCh.innerHTML = getRndChar();
        newDiv.appendChild(newCh);
    }
}
const cells = [...document.querySelectorAll(".cell")];

let keyPressed = false;
let mainLoop = setInterval(() => {
    let el = document.getElementById(`c-${rndNum(COL)}-0`)
    let pos = el.id.split("-"); // c - #col - #row
    let myVar = setInterval(myTimer, 150);
    let i = pos[2] - 0;
    function myTimer() {
        setFire(document.getElementById(`c-${pos[1]}-${i}`), 500);
        i++;
        if (i>= ROW || keyPressed) clearInterval(myVar);
    }
},1000);

document.querySelector("#reset").addEventListener('click', () => {
    clearInterval(mainLoop);
    keyPressed = true;
    console.log(cells.length)
    cells.forEach((el,i) =>
        sleep(1).then(() => 
            el.style.color = '#0f0')
    );
});
