export function createBalloons() {
  const container = document.getElementById('balloons-container');
  if (!container) return;

  const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'pink'];
  const balloonCount = window.innerWidth < 768 ? 15 : 25;

  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement('div');
    balloon.className = `balloon balloon-${colors[i % colors.length]}`;

    const randomLeft = Math.random() * 100;
    const randomDelay = Math.random() * 5;
    const randomDuration = 8 + Math.random() * 4;

    balloon.style.left = `${randomLeft}%`;
    balloon.style.animationDelay = `${randomDelay}s`;
    balloon.style.animationDuration = `${randomDuration}s`;

    container.appendChild(balloon);
  }
}

export function createCakeAnimation() {
  const container = document.getElementById('cake-container');
  if (!container) return;

  const cakeSVG = `
    <svg class="cake-svg" viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
      <!-- Plate -->
      <ellipse cx="100" cy="220" rx="80" ry="10" fill="#d4d4d4" opacity="0.6"/>

      <!-- Bottom Layer -->
      <g class="cake-layer cake-layer-1">
        <rect x="40" y="180" width="120" height="40" rx="5" fill="#8B4513"/>
        <rect x="40" y="180" width="120" height="8" rx="5" fill="#A0522D"/>
        <ellipse cx="100" cy="180" rx="60" ry="12" fill="#A0522D"/>
      </g>

      <!-- Middle Layer -->
      <g class="cake-layer cake-layer-2">
        <rect x="50" y="140" width="100" height="40" rx="5" fill="#D2691E"/>
        <rect x="50" y="140" width="100" height="8" rx="5" fill="#F4A460"/>
        <ellipse cx="100" cy="140" rx="50" ry="10" fill="#F4A460"/>
      </g>

      <!-- Top Layer -->
      <g class="cake-layer cake-layer-3">
        <rect x="60" y="100" width="80" height="40" rx="5" fill="#CD853F"/>
        <rect x="60" y="100" width="80" height="8" rx="5" fill="#DEB887"/>
        <ellipse cx="100" cy="100" rx="40" ry="8" fill="#DEB887"/>
      </g>

      <!-- Candles -->
      <g class="candle candle-1">
        <rect x="70" y="85" width="6" height="20" rx="1" fill="#FFE5B4"/>
        <rect x="71" y="86" width="4" height="18" fill="#FFDEAD"/>
        <ellipse cx="73" cy="85" rx="3" ry="1.5" fill="#FFE5B4"/>
      </g>

      <g class="candle candle-2">
        <rect x="97" y="80" width="6" height="25" rx="1" fill="#FFE5B4"/>
        <rect x="98" y="81" width="4" height="23" fill="#FFDEAD"/>
        <ellipse cx="100" cy="80" rx="3" ry="1.5" fill="#FFE5B4"/>
      </g>

      <g class="candle candle-3">
        <rect x="124" y="85" width="6" height="20" rx="1" fill="#FFE5B4"/>
        <rect x="125" y="86" width="4" height="18" fill="#FFDEAD"/>
        <ellipse cx="127" cy="85" rx="3" ry="1.5" fill="#FFE5B4"/>
      </g>

      <!-- Flames -->
      <g class="flame flame-1">
        <ellipse cx="73" cy="80" rx="4" ry="6" fill="#FFA500" opacity="0.8"/>
        <ellipse cx="73" cy="78" rx="3" ry="5" fill="#FFD700"/>
        <ellipse cx="73" cy="77" rx="2" ry="3" fill="#FFFF00"/>
      </g>

      <g class="flame flame-2">
        <ellipse cx="100" cy="75" rx="4" ry="6" fill="#FFA500" opacity="0.8"/>
        <ellipse cx="100" cy="73" rx="3" ry="5" fill="#FFD700"/>
        <ellipse cx="100" cy="72" rx="2" ry="3" fill="#FFFF00"/>
      </g>

      <g class="flame flame-3">
        <ellipse cx="127" cy="80" rx="4" ry="6" fill="#FFA500" opacity="0.8"/>
        <ellipse cx="127" cy="78" rx="3" ry="5" fill="#FFD700"/>
        <ellipse cx="127" cy="77" rx="2" ry="3" fill="#FFFF00"/>
      </g>

      <!-- Knife (cutting animation) -->
      <g class="knife">
        <rect x="140" y="140" width="35" height="4" rx="1" fill="#8B8B8B"/>
        <polygon points="175,142 185,140 185,144" fill="#C0C0C0"/>
        <rect x="140" y="139" width="8" height="6" rx="1" fill="#654321"/>
      </g>

      <!-- Decorations - Rose Gold Theme -->
      <circle cx="70" cy="160" r="3" fill="#b76e79"/>
      <circle cx="85" cy="165" r="3" fill="#d4a5a5"/>
      <circle cx="100" cy="162" r="3" fill="#c9a961"/>
      <circle cx="115" cy="165" r="3" fill="#e8b4b8"/>
      <circle cx="130" cy="160" r="3" fill="#9d5c63"/>

      <circle cx="80" cy="120" r="2.5" fill="#b76e79"/>
      <circle cx="95" cy="123" r="2.5" fill="#c9a961"/>
      <circle cx="110" cy="120" r="2.5" fill="#d4a5a5"/>
      <circle cx="120" cy="123" r="2.5" fill="#e8b4b8"/>
    </svg>
  `;

  container.innerHTML = cakeSVG;
}

export function createWishesMessage() {
  const container = document.getElementById('cake-container');
  if (!container) return;

  const messageHTML = `
    <div class="wishes-message">
      <h2>A Toast to Your Twenties</h2>
      <p>Today marks the beginning of an extraordinary chapter. May your <span class="highlight">20th year</span> be filled with profound <span class="highlight">growth</span>, authentic <span class="highlight">connections</span>, and moments that take your breath away.</p>
      <p>This is your time to <span class="highlight">dream boldly</span>, <span class="highlight">live fully</span>, and create a life that reflects the beautiful person you've become.</p>
      <p>Here's to the adventures ahead, the lessons you'll embrace, and the incredible woman you continue to be. Your twenties are calling.</p>
      <p style="font-size: 1.8rem; margin-top: 1.5rem; opacity: 0.7;">✨ 🌟 💫 🎊</p>
    </div>
  `;

  container.insertAdjacentHTML('afterend', messageHTML);
}

export function createFloatingElements() {
  const container = document.getElementById('floating-elements');
  if (!container) return;

  const emojis = ['🎁', '🎈', '🎂', '🎉', '🎊', '🌟', '✨', '💖', '🦋', '🌸', '🎵', '💫', '🌺', '🎀', '🌈'];
  const count = window.innerWidth < 768 ? 15 : 25;

  for (let i = 0; i < count; i++) {
    const element = document.createElement('div');
    element.className = 'floating-emoji';
    element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    element.style.left = `${Math.random() * 100}%`;
    element.style.animationDelay = `${Math.random() * 8}s`;
    element.style.animationDuration = `${15 + Math.random() * 10}s`;
    element.style.fontSize = `${20 + Math.random() * 20}px`;
    container.appendChild(element);
  }
}

export function createSparkles() {
  const container = document.getElementById('sparkles-container');
  if (!container) return;

  const count = window.innerWidth < 768 ? 30 : 50;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 3}s`;
    sparkle.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(sparkle);
  }
}

export function createHeartBurst() {
  const container = document.getElementById('heart-burst');
  if (!container) return;

  const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ff9ff3', '#feca57'];
  const count = window.innerWidth < 768 ? 15 : 25;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '❤️';
    heart.style.setProperty('--angle', `${(360 / count) * i}deg`);
    heart.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
    heart.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(heart);
  }
}

export function createFireworks() {
  const container = document.getElementById('fireworks-container');
  if (!container) return;

  function launchFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${20 + Math.random() * 60}%`;
    firework.style.top = `${20 + Math.random() * 60}%`;

    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#48dbfb', '#ff9ff3', '#feca57'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      particle.style.setProperty('--angle', `${(360 / 12) * i}deg`);
      particle.style.backgroundColor = color;
      firework.appendChild(particle);
    }

    container.appendChild(firework);

    setTimeout(() => firework.remove(), 2000);
  }

  launchFirework();
  setInterval(launchFirework, 3000);
}

export function createRibbon() {
  const container = document.getElementById('ribbon-container');
  if (!container) return;

  const ribbonHTML = `
    <div class="ribbon-left"></div>
    <div class="ribbon-right"></div>
  `;

  container.innerHTML = ribbonHTML;
}
