window.onload = start;

function start() {
  const neuralNet = new brain.NeuralNetwork();
  let textOutput = document.querySelector(".result");
  let inputR = document.querySelector(".R");
  let inputG = document.querySelector(".G");
  let inputB = document.querySelector(".B");
  let colorBox = document.querySelector(".colorBox");
  let actionButton = document.querySelector(".checkColor");
  let rgbText = document.querySelector(".rgbText");
  let textColor = document.querySelector(".textColor");
  let random = document.querySelector(".random");

  const data = [
    {
      input: { R: 0.78, G: 0.9, B: 1 },
      output: { light: 1 },
    },

    {
      input: { R: 0.2, G: 0.11, B: 0.2 },
      output: { dark: 1 },
    },

    {
      input: { R: 0.41, G: 0, B: 0 },
      output: { dark: 1 },
    },

    {
      input: { R: 1, G: 1, B: 1 },
      output: { light: 1 },
    },

    {
      input: { R: 0, G: 0, B: 0 },
      output: { dark: 1 },
    },

    {
      input: { R: 1, G: 0.5, B: 0.5 },
      output: { light: 1 },
    },

    {
      input: { R: 0.2, G: 0.04, B: 0.04 },
      output: { dark: 1 },
    },

    {
      input: { R: 0.7, G: 0.3, B: 0.2 },
      output: { dark: 1 },
    },

    {
      input: { R: 0.6, G: 0.97, B: 0.02 },
      output: { light: 1 },
    },

    {
      input: { R: 0.3, G: 0.7, B: 0.1 },
      output: { dark: 1 },
    },

    {
      input: { R: 0.2, G: 0.9, B: 0.4 },
      output: { light: 1 },
    },

    {
      input: { R: 0.22, G: 0.25, B: 0.97 },
      output: { dark: 1 },
    },

    {
      input: { R: 0.44, G: 0.43, B: 0.6 },
      output: { dark: 1 },
    },
  ];

  neuralNet.train(data);

  random.addEventListener("click", () => {
    let Rval = Math.random();
    let Gval = Math.random();
    let Bval = Math.random();

    let result = brain.likely({ R: Rval, G: Gval, B: Bval }, neuralNet);

    textOutput.innerHTML = "The Backgroundcolor is " + result;
    textOutput.style.color = "black";
    colorBox.style.backgroundColor = `rgb( ${Rval * 255}, ${Gval * 255}, ${
      Bval * 255
    })`;

    if (result === "light") {
      textColor.innerHTML = "and the Text Color is Black";
      rgbText.style.color = "#000";
      rgbText.innerHTML = `R${Math.trunc(Rval * 255)} G${Math.trunc(
        Gval * 255
      )} B${Math.trunc(Bval * 255)} `;
    } else if (result === "dark") {
      textColor.innerHTML = "and the Text Color is White";
      rgbText.style.color = "white";
      rgbText.innerHTML = `R${Math.trunc(Rval * 255)} G${Math.trunc(
        Gval * 255
      )} B${Math.trunc(Bval * 255)} `;
    }
  });

  actionButton.addEventListener("click", () => {
    let Rvalue = parseFloat(inputR.value);
    let Gvalue = parseFloat(inputG.value);
    let Bvalue = parseFloat(inputB.value);

    if (
      Rvalue > 255 ||
      Gvalue > 255 ||
      Bvalue > 255 ||
      inputR.value == "" ||
      inputG.value == "" ||
      inputB.value == ""
    ) {
      textOutput.innerHTML = "Please enter a value between 0 and 255";
      textOutput.style.color = "red";
      textColor.innerHTML = "";
    } else {
      let result = brain.likely(
        { R: Rvalue / 255, G: Gvalue / 255, B: Bvalue / 255 },
        neuralNet
      );

      textOutput.innerHTML = "The Backgroundcolor is " + result;
      textOutput.style.color = "black";
      colorBox.style.backgroundColor = `rgb( ${Rvalue}, ${Gvalue}, ${Bvalue} )`;

      if (result === "light") {
        textColor.innerHTML = "and the Text Color is Black";
        rgbText.style.color = "#000";
        rgbText.innerHTML = `R${Rvalue} G${Gvalue} B${Bvalue} `;
      } else if (result === "dark") {
        textColor.innerHTML = "and the Text Color is White";
        rgbText.style.color = "white";
        rgbText.innerHTML = `R${Rvalue} G${Gvalue} B${Bvalue} `;
      }
    }
  });
}
