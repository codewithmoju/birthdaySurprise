# Quality Assurance & Testing Checklist

## Acceptance Criteria

### ✅ Countdown Functionality
- [ ] Countdown displays correct time remaining to Oct 12, 2025 11:59 PM PKT
- [ ] Countdown updates every second without drift
- [ ] Countdown shows Days, Hours, Minutes, Seconds with proper labels
- [ ] When countdown reaches zero, it stops at 00:00:00:00
- [ ] Automatic transition to celebration occurs within 1 second of reaching zero
- [ ] If visitor arrives after target date, "Show Celebration" button is visible

### ✅ Timezone Handling
- [ ] Countdown is accurate regardless of visitor's local timezone
- [ ] Target timestamp `2025-10-13T00:00:00+05:00` is used correctly
- [ ] Tested from different timezones (use browser DevTools to change timezone)
- [ ] No timezone conversion errors in console

### ✅ Celebration Mode
- [ ] Celebration overlay appears with smooth animation
- [ ] Confetti launches automatically when celebration starts
- [ ] Multiple confetti bursts occur over 3 seconds
- [ ] Lottie animation (hearts) displays and loops smoothly
- [ ] Clicking/tapping overlay triggers additional confetti bursts
- [ ] On mobile, confetti particle count is reduced appropriately
- [ ] All celebration elements are visible and properly positioned

### ✅ Audio Controls
- [ ] No audio plays automatically (no autoplay)
- [ ] "Play Birthday Song" button is visible and accessible
- [ ] Clicking play button starts audio successfully
- [ ] Stop button appears after play button is clicked
- [ ] Stop button pauses and resets audio to beginning
- [ ] Mute button in floating controls works correctly
- [ ] Mute state persists across play/stop cycles
- [ ] Audio file missing shows appropriate error (if applicable)

### ✅ Birthday Wishes Feature
- [ ] Wish submission form is visible in celebration mode
- [ ] Character counter updates as user types (0/200)
- [ ] Form validates: requires text input
- [ ] Form prevents submission over 200 characters
- [ ] Submit button is disabled during submission
- [ ] New wishes appear at top of wish grid with animation
- [ ] Previously submitted wishes load on page load
- [ ] Wishes display with proper sanitization (no XSS)
- [ ] Wishes grid is responsive and properly formatted

### ✅ Responsive Design
- [ ] **Mobile (375px)**: Layout is clean, readable, no horizontal scroll
- [ ] **Mobile (375px)**: Countdown grid shows 2x2 layout
- [ ] **Tablet (768px)**: All elements properly sized and spaced
- [ ] **Desktop (1024px+)**: Full layout displays correctly
- [ ] All text is readable at all breakpoints
- [ ] Buttons are easily tappable on mobile (min 44x44px)
- [ ] Floating controls don't overlap content on mobile
- [ ] Wish cards stack properly on mobile (1 column)

### ✅ Accessibility
- [ ] All interactive elements are keyboard accessible (Tab navigation)
- [ ] Focus indicators are visible on all focusable elements
- [ ] ARIA labels are present on buttons and regions
- [ ] Screen reader announces countdown updates (aria-live)
- [ ] Celebration dialog has proper role and aria-modal
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] No autoplay audio (user must interact)
- [ ] Form inputs have proper labels

### ✅ Reduced Motion Support
- [ ] When `prefers-reduced-motion` is enabled:
  - [ ] Heavy animations are disabled or simplified
  - [ ] Confetti does not launch
  - [ ] Lottie animation is disabled
  - [ ] Transitions are instant or very brief
  - [ ] Pulse and bounce animations are removed
  - [ ] Page remains functional without animations

### ✅ Performance
- [ ] Initial page load is under 3 seconds on 3G
- [ ] External libraries (confetti, lottie) load lazily
- [ ] Libraries load within 30 seconds of target time
- [ ] Libraries load immediately when celebration is triggered
- [ ] No JavaScript errors in console
- [ ] No layout shift during load (good CLS score)
- [ ] Fonts load with proper fallbacks
- [ ] Images use lazy loading where applicable

### ✅ Browser Compatibility
- [ ] Chrome/Edge (latest): All features work
- [ ] Firefox (latest): All features work
- [ ] Safari (latest): All features work
- [ ] Chrome Mobile: All features work, touch interactions smooth
- [ ] Safari Mobile: All features work, no iOS-specific bugs
- [ ] Older browsers: Graceful degradation, no crashes

### ✅ Security
- [ ] User input (wishes) is sanitized before display
- [ ] No XSS vulnerabilities from wish messages
- [ ] Script tags in wishes are escaped
- [ ] HTML entities in wishes are escaped
- [ ] Database queries use parameterized queries (Supabase handles this)
- [ ] No sensitive data exposed in console
- [ ] Environment variables not exposed in client bundle

### ✅ Functional Controls
- [ ] **Mute Button**: Toggles audio mute state, visual indicator updates
- [ ] **Share Button**: Opens native share dialog or copies link to clipboard
- [ ] **Manual Celebration Button**: Only shows if event has started
- [ ] **Manual Celebration Button**: Triggers celebration when clicked
- [ ] All buttons have hover states
- [ ] All buttons have focus states
- [ ] All buttons have loading/disabled states where appropriate

### ✅ JavaScript Disabled
- [ ] Noscript fallback message displays correctly
- [ ] Fallback is styled and readable
- [ ] User is informed JS is required

### ✅ Edge Cases
- [ ] Page behavior correct if opened exactly at target time
- [ ] Page behavior correct if opened 1 second before target
- [ ] Page behavior correct if opened hours after target
- [ ] Multiple rapid clicks on celebration trigger don't break page
- [ ] Submitting empty wish shows validation error
- [ ] Submitting wish with only whitespace is rejected
- [ ] Network error when loading wishes shows graceful error
- [ ] Network error when submitting wish shows alert
- [ ] CDN failure for external libs doesn't crash page

---

## Test Scenarios

### Scenario 1: First-Time Visitor (Before Event)
1. Open page in browser
2. Verify countdown is running and accurate
3. Verify names are displayed correctly
4. Test mute and share buttons
5. Wait for countdown to update at least 3 times
6. Verify no celebration elements are visible
7. Verify "Show Celebration" button is hidden

**Expected**: Clean countdown view, no errors, proper functionality

### Scenario 2: Visitor Arrives After Event Started
1. Set system date to Oct 13, 2025 or later
2. Open page
3. Verify countdown shows 00:00:00:00
4. Verify "Show Celebration" button is visible
5. Click button
6. Verify celebration mode activates

**Expected**: Manual trigger available, celebration works on demand

### Scenario 3: Witness Automatic Transition
1. Open page when countdown is < 30 seconds remaining
2. Watch countdown reach zero
3. Verify smooth transition to celebration
4. Verify confetti launches automatically
5. Verify audio controls are available

**Expected**: Seamless automatic celebration activation

### Scenario 4: Submit and View Wishes
1. Trigger celebration mode
2. Type a wish in textarea
3. Verify character count updates
4. Submit wish
5. Verify wish appears at top of grid
6. Refresh page
7. Verify wish persists

**Expected**: Wishes save and load correctly

### Scenario 5: Mobile Experience
1. Open page on mobile device or use DevTools mobile emulation
2. Test all interactions with touch
3. Verify confetti tap-to-burst works
4. Test form submission on touch keyboard
5. Verify no horizontal scrolling
6. Test audio playback

**Expected**: Smooth mobile experience, no layout issues

### Scenario 6: Reduced Motion User
1. Enable "Reduce Motion" in OS accessibility settings
2. Open page
3. Trigger celebration
4. Verify animations are minimal/disabled
5. Verify functionality still works

**Expected**: Accessible experience for motion-sensitive users

### Scenario 7: Keyboard-Only Navigation
1. Open page
2. Use only Tab, Enter, and Space keys
3. Navigate to all controls
4. Trigger celebration with keyboard
5. Submit wish using keyboard
6. Play/stop audio with keyboard

**Expected**: Full functionality without mouse

---

## Performance Benchmarks

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

Test with: [PageSpeed Insights](https://pagespeed.web.dev/), [WebPageTest](https://www.webpagetest.org/)

---

## Cross-Browser Testing

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | 120+ | ✅ | Primary target |
| Firefox | 115+ | ✅ | Test audio playback |
| Safari | 16+ | ✅ | Test iOS-specific features |
| Edge | 120+ | ✅ | Chromium-based |
| Chrome Mobile | 120+ | ✅ | Test touch interactions |
| Safari iOS | 16+ | ✅ | Test audio permissions |

---

## Deployment Checklist

- [ ] All environment variables configured in hosting platform
- [ ] Database migrations applied successfully
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Audio file uploaded to correct path
- [ ] Test production build locally with `npm run preview`
- [ ] Verify production build on actual mobile devices
- [ ] Check analytics/monitoring setup (if applicable)
- [ ] Test from different geographic locations
- [ ] Share test link with friends for final QA
- [ ] Set reminder to monitor on actual event day

---

## Known Limitations

- Audio file must be provided manually (not included in repo)
- Browser autoplay policies may prevent audio on some devices
- Confetti performance may vary on very old mobile devices
- Wishes are public and not moderated (suitable for private celebrations only)

---

## Success Metrics

- ✅ Zero critical bugs
- ✅ 100% of acceptance criteria met
- ✅ Lighthouse score: 90+ in all categories
- ✅ No console errors in production
- ✅ Smooth experience on all target devices
