let isRotating = false;
let currentNumber = 1;
const cubes = document.querySelectorAll(".cube");

function setRandomNumbers(cube) {
  const sides = cube.getElementsByClassName("side");
  for (let i = 0; i < sides.length; i++) {
    const randomNumber = Math.floor(Math.random() * 60) + 1;
    sides[i].textContent = randomNumber.toString().padStart(2, '0');
  }
}

function rotateCube(cube) {
  if (!isRotating) {
    isRotating = true;
    setRandomNumbers(cube);

    const randomRotationCount = Math.floor(Math.random() * 3) + 1;
    const rotationAngle = randomRotationCount * 360 + (currentNumber - 1) * 60;
    cube.style.transform = `rotateY(${rotationAngle}deg)`;
    currentNumber = (currentNumber + randomRotationCount) % 60 || 60;

    setTimeout(() => {
      const frontFace = cube.querySelector(".side:nth-child(1)");
      frontFace.textContent = currentNumber.toString().padStart(2, '0');

      cube.style.transform = `rotateY(${(currentNumber - 1) * -60}deg)`;

      const otherFaces = cube.querySelectorAll(".side:not(:nth-child(1))");
      for (let i = 0; i < otherFaces.length; i++) {
        otherFaces[i].style.display = "flex";
      }

      isRotating = false;
    }, 1000);
  }
}

function rotateCubesSuccessively() {
  cubes.forEach((cube, index) => {
    setTimeout(() => {
      rotateCube(cube);
    }, index * 1500); 
  });
}

const rotateButton = document.getElementById("rotateButton");
rotateButton.addEventListener("click", () => {
  rotateCubesSuccessively();
});
