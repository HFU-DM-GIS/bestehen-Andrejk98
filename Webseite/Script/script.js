import { updateGround, setupGround } from "./ground.js"
import { updateUnicorn, setupUnicorn, getUnicornRect, setUnicornLose } from "./unicorn.js"
import { updateFlower, setupFlower, getFlowerRects } from "./flower.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")