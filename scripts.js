document.addEventListener("DOMContentLoaded", () => {
  // Check if the device is mobile/small screen
  if (window.innerWidth < 768) {
    document.querySelector("main").style.display = "none";
    document.querySelector("footer").style.display = "none";
    document.getElementById("mobile-unsupported").style.display = "flex";
    return; // Stop the script from running further on mobile
  }

  const url = "https://mah23style.github.io/useless/";
  const urlLength = url.length;

  let refreshCount = parseInt(localStorage.getItem("refreshCount")) || 0;
  refreshCount++;
  localStorage.setItem("refreshCount", refreshCount);

  let startTime = Date.now();
  let keysPressed = 0;
  let mouseClicks = 0;

  // Mouse tracking for distance
  let lastMouseX = 0;
  let lastMouseY = 0;
  let totalMouseDistance = 0;

  document.addEventListener("mousemove", (e) => {
    if (lastMouseX > 0 && lastMouseY > 0) {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      totalMouseDistance += Math.sqrt(dx * dx + dy * dy);
    }
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  // Listen for left clicks only (e.button === 0)
  document.addEventListener("click", (e) => {
    if (e.button === 0) {
      mouseClicks++;
    }
  });

  // Event listener for key presses
  document.addEventListener("keydown", (e) => {
    keysPressed++;
    // Trigger confetti on 'g' key press
    if (e.key.toLowerCase() === "g") {
      startConfetti();
    }
  });

  function updateStats() {
    const now = Math.floor(Date.now() / 1000);
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000);

    // Update all the stat elements
    document.getElementById(
      "unix"
    ).textContent = `Seconds since 1970: ${now.toLocaleString()}`;
    document.getElementById(
      "yawns"
    ).textContent = `Number of yawns worldwide: ${Math.floor(
      now * 0.5
    ).toLocaleString()}`;
    document.getElementById(
      "blinks"
    ).textContent = `Blinks somewhere: ${Math.floor(
      now * 0.9
    ).toLocaleString()}`;
    document.getElementById(
      "pencils"
    ).textContent = `Pencils broken: ${Math.floor(
      (now - 1600000000) / 3972
    ).toLocaleString()}`;
    document.getElementById(
      "bananas"
    ).textContent = `Banana slips (Mario Kart): ${(
      now % 1337
    ).toLocaleString()}`;
    document.getElementById(
      "refresh"
    ).textContent = `Times you refreshed: ${refreshCount}`;
    document.getElementById(
      "urlLength"
    ).textContent = `Characters in URL: ${urlLength}`;
    document.getElementById(
      "toilets"
    ).textContent = `Toilets flushed: ${Math.floor(timeOnPage * 0.24)}`;
    document.getElementById(
      "thoughts"
    ).textContent = `"I should go to bed" thoughts: ${Math.floor(
      now * 2
    ).toLocaleString()}`;
    document.getElementById(
      "tiktoks"
    ).textContent = `Cringe TikToks posted: ${Math.floor(
      now * 0.3
    ).toLocaleString()}`;
    document.getElementById(
      "timeOnPage"
    ).textContent = `Time wasted: ${timeOnPage} seconds`;
    document.getElementById(
      "keysPressed"
    ).textContent = `Keys you pressed: ${keysPressed}`;
    document.getElementById(
      "farts"
    ).textContent = `Farts recorded: ${Math.floor(now * 1.3).toLocaleString()}`;
    document.getElementById(
      "watched"
    ).textContent = `Chances you're being watched: ${(
      70 +
      Math.sin(now / 10) * 30
    ).toFixed(1)}%`;
    document.getElementById(
      "bros"
    ).textContent = `People saying "bro": ${Math.floor(
      now * 1.4
    ).toLocaleString()}`;
    document.getElementById(
      "particles"
    ).textContent = `Particles around you: ${Math.floor(
      now * 123.45
    ).toLocaleString()}`;
    document.getElementById(
      "karen"
    ).textContent = `Karens complaining: ${Math.floor(
      now * 0.01
    ).toLocaleString()}`;
    document.getElementById(
      "mouseDistance"
    ).textContent = `Mouse distance moved: ${(
      totalMouseDistance / 3780
    ).toFixed(1)} m`; // pixels to meters
    document.getElementById(
      "trolls"
    ).textContent = `Internet trolls lurking: ${Math.floor(
      now * 0.15
    ).toLocaleString()}`;
    document.getElementById(
      "mouseClicks"
    ).textContent = `Left clicks: ${mouseClicks}`;
    document.getElementById(
      "misspellings"
    ).textContent = `Typos made globally: ${Math.floor(
      now * 3.2
    ).toLocaleString()}`;
    document.getElementById(
      "lies"
    ).textContent = `Lies told since you visited: ${Math.floor(
      timeOnPage * 0.8
    )}`;
  }

  // Set interval to update stats every second
  setInterval(updateStats, 1000);
  updateStats(); // Initial call

  // Intersection Observer to fade in stats on scroll
  const panels = document.querySelectorAll(".panel");
  const observerOptions = {
    root: null, // relative to the viewport
    threshold: 0.5, // trigger when 50% of the panel is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  panels.forEach((panel) => {
    observer.observe(panel);
  });
});

// Confetti animation function
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  const pieces = [];
  const numberOfPieces = 200;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20, // Start above the screen
      size: Math.random() * 8 + 2,
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 3 - 1.5,
      color: `hsl(${Math.random() * 360}, 100%, 65%)`,
    });
  }

  let animationFrameId;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activePieces = 0;
    for (let p of pieces) {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.speedY;
      p.x += p.speedX;
      // Reset piece when it goes off screen
      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      if (p.y > -20) {
        activePieces++;
      }
    }

    if (activePieces > 0) {
      animationFrameId = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Stop any previous animation before starting a new one
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  draw();
}
