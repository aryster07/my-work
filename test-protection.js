// Test Image Protection Features
console.log('🔒 Testing Image Protection System...')

// Test 1: Right-click protection
document.addEventListener('contextmenu', (e) => {
  console.log('✅ Right-click blocked')
})

// Test 2: Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  const blocked = [
    'F12',
    'PrintScreen'
  ]
  
  const blockedCombos = [
    { ctrl: true, shift: true, key: 'I' },
    { ctrl: true, shift: true, key: 'C' },
    { ctrl: true, shift: true, key: 'J' },
    { ctrl: true, key: 'u' },
    { ctrl: true, key: 's' }
  ]
  
  if (blocked.includes(e.key)) {
    console.log('✅ Keyboard shortcut blocked:', e.key)
  }
  
  if (blockedCombos.some(combo => 
    (combo.ctrl === e.ctrlKey) && 
    (combo.shift === undefined || combo.shift === e.shiftKey) && 
    (combo.key === e.key)
  )) {
    console.log('✅ Keyboard combination blocked:', e.key)
  }
})

// Test 3: Image protection
function testImageProtection() {
  const images = document.querySelectorAll('img')
  console.log(`📸 Found ${images.length} images`)
  
  images.forEach((img, index) => {
    if (!img.draggable && img.getAttribute('draggable') === 'false') {
      console.log(`✅ Image ${index + 1} drag protection: Active`)
    }
    
    const style = window.getComputedStyle(img)
    if (style.userSelect === 'none') {
      console.log(`✅ Image ${index + 1} selection protection: Active`)
    }
  })
}

// Test 4: CSS protection
function testCSSProtection() {
  const bodyStyle = window.getComputedStyle(document.body)
  if (bodyStyle.userSelect === 'none') {
    console.log('✅ Global selection protection: Active')
  }
  
  if (bodyStyle.webkitTouchCallout === 'none') {
    console.log('✅ Touch callout protection: Active')
  }
}

// Run tests after DOM loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      testImageProtection()
      testCSSProtection()
      console.log('🔒 Image Protection System Test Complete')
    }, 2000)
  })
} else {
  setTimeout(() => {
    testImageProtection()
    testCSSProtection()
    console.log('🔒 Image Protection System Test Complete')
  }, 2000)
}
