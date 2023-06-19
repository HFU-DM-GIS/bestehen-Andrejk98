import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const unicornElem = document.querySelector("[data-unicorn]")
  const JUMP_SPEED = 0.4; // Höhere Werte für höhere Sprünge, niedrigere Werte für niedrigere Sprünge
  const GRAVITY = 0.0015
  const UNICORN_FRAME_COUNT = 2 
  const FRAME_TIME = 100
  
  let isJumping
  let unicornFrame
  let currentFrameTime
  let yVelocity
  export function setupUnicorn() {
    isJumping = false
    unicornFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(unicornElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
  }
  
  export function updateUnicorn(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
  
  export function getUnicornRect() {
    return unicornElem.getBoundingClientRect()
  }
  
  export function setUnicornLose() {
    unicornElem.src = "./Webseite/Bild/Unicorn.png"
  }
  
  function handleRun(delta, speedScale) {
    if (isJumping) {
      unicornElem.src = `./Webseite/Bild/Unicorn.png`
      return
    }
  
    /*if (currentFrameTime >= FRAME_TIME) {
      dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT 
      dinoElem.src = `./Unicorn${dinoFrame}.png`
      currentFrameTime -= FRAME_TIME
    }*/
    currentFrameTime += delta * speedScale
  }
  
  function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(unicornElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(unicornElem, "--bottom") <= 0) {
      setCustomProperty(unicornElem, "--bottom", 0)
      isJumping = false
    }
  
    yVelocity -= GRAVITY * delta
  }
  
  function onJump(e) {

    if (e.key !== "w" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }