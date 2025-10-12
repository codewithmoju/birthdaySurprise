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

      <!-- Decorations -->
      <circle cx="70" cy="160" r="3" fill="#FF69B4"/>
      <circle cx="85" cy="165" r="3" fill="#87CEEB"/>
      <circle cx="100" cy="162" r="3" fill="#FFD700"/>
      <circle cx="115" cy="165" r="3" fill="#98FB98"/>
      <circle cx="130" cy="160" r="3" fill="#DDA0DD"/>

      <circle cx="80" cy="120" r="2.5" fill="#FF1493"/>
      <circle cx="95" cy="123" r="2.5" fill="#00CED1"/>
      <circle cx="110" cy="120" r="2.5" fill="#FFD700"/>
      <circle cx="120" cy="123" r="2.5" fill="#7FFF00"/>
    </svg>
  `;

  container.innerHTML = cakeSVG;
}

export function createWishesMessage() {
  const container = document.getElementById('cake-container');
  if (!container) return;

  const messageHTML = `
    <div class="wishes-message">
      <h2>Great Wishes for You! 🎉</h2>
      <p>May your birthday be filled with <span class="highlight">endless joy</span>, <span class="highlight">wonderful surprises</span>, and <span class="highlight">beautiful memories</span>!</p>
      <p>Wishing you a year ahead full of <span class="highlight">success</span>, <span class="highlight">happiness</span>, and <span class="highlight">amazing adventures</span>!</p>
      <p>Here's to celebrating <span class="highlight">you</span> and all the incredible things that make you special!</p>
      <p style="font-size: 2rem; margin-top: 1rem;">🎂🎈🎁💝✨</p>
    </div>
  `;

  container.insertAdjacentHTML('afterend', messageHTML);
}
