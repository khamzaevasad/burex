// Image rotation animation
anime({
  targets: ".rotating-image img",
  rotate: 360,
  duration: 8000,
  loop: true,
  easing: "linear",
});

// Breathing glow effect (scale)
anime({
  targets: ".rotating-image img",
  scale: [
    { value: 1, duration: 1500, easing: "easeInOutSine" },
    { value: 1.05, duration: 1500, easing: "easeInOutSine" },
  ],
  loop: true,
  direction: "alternate",
});

// Text fade-in animation
anime
  .timeline()
  .add({
    targets: ".welcome-text h1",
    translateY: [-20, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutExpo",
    delay: 400,
  })
  .add(
    {
      targets: ".welcome-text p",
      translateY: [-10, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
    },
    "-=600"
  );
