<template>
  <div class="ufo-wrap">
    <div class="ufo">
      <div class="ufo__antenna"></div>
      <div class="ufo__stand"></div>
      <div class="ufo__stand ufo__stand--right"></div>

      <div class="ufo__alien"></div>
      
      <div class="ufo__mirror">
        <span class="ufo__mirrorShine"></span>
      </div>

      <div class="ufo__motionLines">
        <span class="ufo__motionLine"></span>
        <span class="ufo__motionLine"></span>
        <span class="ufo__motionLine"></span>
        <span class="ufo__motionLine"></span>
        <span class="ufo__motionLine"></span>
      </div>
    </div>
  </div>
  

</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.ufo-wrap {
  height: calc(100vh - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.ufo {
  font-size: 23px;
  width: 5.813em;
  height: 5.813em;
  border-radius: 50%;
  border: 0.5em solid #001e34;
  box-sizing: border-box;
  position: relative;
  animation: shake 0.08s ease-in-out infinite alternate;
  z-index: 1;
}
.ufo::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.125em;
  border-radius: 0 0 2.125em 2.125em;
  border-top: 0.5em solid #001e34;
  box-sizing: inherit;
  background: radial-gradient(circle at top, #00d7f9, #2563a2);
  z-index: -1;
}
.ufo::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.25em;
  width: 0.5em;
  height: 1.375em;
  border-radius: 0 0 1.375em 1.375em;
  background-color: #001e34;
}

.ufo__antenna {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -2.5em;
  width: 1.813em;
  height: 1.813em;
  background: radial-gradient(circle at top, #feda60, #fca931);
  border-radius: inherit;
  border: inherit;
  box-sizing: inherit;
}
.ufo__antenna::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -0.9em;
  height: 0.5em;
  width: 0.6em;
  background-color: #001e34;
}

.ufo__stand {
  position: absolute;
  left: -1em;
  bottom: 0;
  width: 2.188em;
  height: 0.625em;
  border-radius: 0 0 0 0.625em;
  background-color: #001e34;
  z-index: -3;
}
.ufo__stand::after {
  content: "";
  position: absolute;
  top: calc(-2.188em / 2);
  left: 0.188em;
  width: 2.188em;
  height: 2.188em;
  transform: rotate(-45deg);
  border-radius: 0.625em 0.625em 0 0;
  background: linear-gradient(45deg, transparent 40%, #001e34 0%);
}

.ufo__stand--right {
  transform: scaleX(-1);
  left: unset;
  right: -1em;
}

.ufo__alien {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0.375em;
  width: 4.063em;
  height: 2.375em;
  border: inherit;
  border-bottom: 0;
  border-radius: 4.063em 4.063em 0 0;
  box-sizing: inherit;
  background-color: #d52056;
  z-index: -2;
}
.ufo__alien::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0.75em;
  width: 85%;
  height: 0.5em;
  border-radius: 0.5em;
  background-color: #9d0737;
}
.ufo__alien::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0.9em;
  width: 0.625em;
  height: 0.625em;
  border-radius: 50%;
  color: #fff;
  background-color: currentColor;
  box-shadow: -0.8em 0, 0.8em 0;
}

.ufo__mirror {
  position: absolute;
  width: 100%;
  height: 2.91em;
  border-radius: 2.91em 2.91em 0 0;
  overflow: hidden;
  z-index: -1;
}

.ufo__mirrorShine {
  display: block;
  animation: shine 0.3s linear infinite;
}
.ufo__mirrorShine::after {
  content: "";
  position: absolute;
  top: -2.609em;
  transform: rotate(45deg);
  height: 8em;
  width: 2em;
  color: rgba(255, 255, 255, 0.6);
  background-color: currentColor;
  box-shadow: 2em 0 0 -0.696em;
}

.ufo__motionLines {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -160%;
  width: 120%;
  display: flex;
  justify-content: space-between;
}

.ufo__motionLine {
  --animation-delay: 0s;
  --vertical-position: 0em;
  --vertical-position-animate: 0em;
  position: relative;
  top: var(--vertical-position);
  width: 0.391em;
  height: 6.261em;
  border-radius: 0.391em;
  color: #001e34;
  overflow: hidden;
  animation: motionLineUp 1s ease infinite;
}
.ufo__motionLine::after {
  content: "";
  display: inline-block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background-color: currentColor;
  transform: translateY(-100%);
  animation: motionLine 0.3s var(--animation-delay) linear infinite;
}
.ufo__motionLine:nth-child(1) {
  --animation-delay: 0.3s;
}
.ufo__motionLine:nth-child(5) {
  --animation-delay: 0.6s;
}
.ufo__motionLine:nth-child(1), .ufo__motionLine:nth-child(5) {
  --vertical-position: 0em;
  --vertical-position-animate: 1em;
}
.ufo__motionLine:nth-child(2) {
  --vertical-position: 3em;
  --vertical-position-animate: 3em;
  --animation-delay: 0.4s;
}
.ufo__motionLine:nth-child(3) {
  --vertical-position: 5em;
  --vertical-position-animate: 1em;
  --animation-delay: 1s;
}
.ufo__motionLine:nth-child(4) {
  --vertical-position: 2em;
  --vertical-position-animate: 1em;
  --animation-delay: 0.5s;
}

@keyframes motionLine {
  100% {
    transform: translateY(100%);
    opacity: 0.8;
  }
}
@keyframes motionLineUp {
  0% {
    top: var(--vertical-position);
  }
  100% {
    top: calc(var(--vertical-position) - var(--vertical-position-animate));
  }
}
@keyframes shine {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(200%);
  }
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0.5em);
  }
}
@keyframes background {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>