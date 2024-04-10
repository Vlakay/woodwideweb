let svg = document.getElementById('svg');
let g = document.createElementNS('http://www.w3.org/2000/svg','g')
let svgB = svg.getBoundingClientRect()
let x = svgB.width/2
let y = svgB.height/2
let direction = ['up', 'down', 'left', 'right'];
let colours = []
let size = 15

svg.appendChild(g)

for(let i = 0; i < 10; i++){
  let randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  colours.push({item: i, colour: randomColor})
}

function setSvgSize() {
  svg.setAttribute('width', window.innerWidth);
  svg.setAttribute('height', window.innerHeight);
}

function draw() {
  let svgB = svg.getBoundingClientRect();
  let x = svgB.width / 2;
  let y = svgB.height / 2;

  for (let i = 0; i < 10; i++) {
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let colour = colours.find(element => element.item === i).colour
    path.setAttribute('stroke', colour)
    let d = '';
    path.setAttribute('class', `path-${i}`);
    let randomDirection = direction[Math.floor(Math.random() * direction.length)];
    let paths = document.getElementsByClassName(`path-${i}`);
    let lastPath = paths[paths.length - 1];
    if (lastPath) {
      let previousOrigin = lastPath.getAttribute('d')?.split('L')[1].trim();
      let previousX = parseInt(previousOrigin.split(' ')[0]);
      let previousY = parseInt(previousOrigin.split(' ')[1]);
      if (randomDirection === 'up') {
        d = d + `M ${previousOrigin} L ${previousX} ${previousY + size}`;
      } else if (randomDirection === 'down') {
        d = d + `M ${previousOrigin} L ${previousX} ${previousY - size}`;
      } else if (randomDirection === 'left') {
        d = d + `M ${previousOrigin} L ${previousX + size} ${previousY}`;
      } else if (randomDirection === 'right') {
        d = d + `M ${previousOrigin} L ${previousX - size} ${previousY}`;
      }
      path.setAttribute('d', d);
      path.setAttribute('transform-origin', `${previousX} ${previousY}`)
    } else {
      path.setAttribute('d', `M ${x} ${y} L ${x} ${y}`);
      path.setAttribute('transform-origin', `${x} ${y}`)
    }
    g.appendChild(path);
  }
}

window.addEventListener('resize', () => {
  setSvgSize();
  svg.innerHTML = '';
  draw();
});

setSvgSize();
draw();
setInterval(draw, 100);
