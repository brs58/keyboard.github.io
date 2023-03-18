const keysArr = [...document.querySelectorAll(".key")];

const getKey = (event) => {
  const parsedKey = event.key.toLowerCase().replace("\\", "\\\\");
  const parsedCode = event.code.toLowerCase();
  const element =
    document.querySelector(`[data-key="${parsedCode}"]`) ||
    document.querySelector(`[data-key="${parsedKey}"]`);

  return element;
};

document.addEventListener("keydown", (event) => {
  const key = getKey(event);
  if (key) {
    key.classList.add("active");
  }
});

document.addEventListener("keyup", (event) => {
  const key = getKey(event);
  if (key) {
    key.classList.remove("active");
  }
});

document.addEventListener("mousedown", (event) => {
  if (event.target.dataset.key) {
    event.target.classList.add("active");
  }
});

document.addEventListener("mouseup", (event) => {
  if (event.target.dataset.key) {
    event.target.classList.remove("active");
  }
});

document.addEventListener("touchstart", (event) => {
  if (event.target.dataset.key) {
    event.target.classList.add("active");
  }
});

document.addEventListener("touchend", (event) => {
  if (event.target.dataset.key) {
    event.target.classList.remove("active");
  }
});

const animate = (element) => {
  const hueColor = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
  const color = `hsla(${hueColor}, 100%, 50%, 50%)`;
  const textColor = `hsl(${hueColor}, 100%, 50%)`;
  const textShadow = `0 0 0.80em ${color}, 0 0 1.60em ${color}, 0 0 4em ${color}`;
  const boxShadow = `-3px 3px 4px ${color}, 3px -3px 4px ${color}, 3px 3px 4px ${color}, -3px -3px 4px ${color}, 0 0 10px ${color}`;

  const keyIndex = keysArr.indexOf(element);
  const animatedKeysRight = keysArr.slice(keyIndex);
  const animatedKeysLeft = keysArr.slice(0, keyIndex);

  const transitionHandler = (event) => {
    event.target.style.boxShadow = "none";
    event.target.style.color = null;
    event.target.style.textShadow = "none";
    event.target.removeEventListener("transitionend", transitionHandler);
  };

  animatedKeysRight.forEach((keyEl, i) => {
    setTimeout(() => {
      keyEl.addEventListener("transitionend", transitionHandler);
      keyEl.style.boxShadow = boxShadow;
      keyEl.style.color = textColor;
      keyEl.style.textShadow = textShadow;
    }, i * 35);
  });

  animatedKeysLeft.forEach((keyEl, j) => {
    const i = animatedKeysLeft.length - j;
    setTimeout(() => {
      keyEl.addEventListener("transitionend", transitionHandler);
      keyEl.style.boxShadow = boxShadow;
      keyEl.style.color = textColor;
      keyEl.style.textShadow = textShadow;
    }, i * 35);
  });
};

document.addEventListener("keydown", (event) => {
  const key = getKey(event);

  if (key) {
    animate(key);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.key) {
    animate(event.target);
  }
});

window.addEventListener("load", () => {
  const key = document.querySelector(`[data-key="enter"]`);
  animate(key);
});
