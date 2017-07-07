module.exports = class SoundFx {
  constructor (source) {
    this.source = source
  }

  playFX() {
    this.source.muted = false
    this.source.loop = true
    this.source.currentTime = 0
    this.source.playbackRate = 1
    this.source.play();
  }

  pauseFX() {
    this.source.pause();
  }

  resumeFX() {
    this.source.play()
  }

  stopFX() {
    this.source.muted = true;
    this.source.playbackRate = 0;
    this.source.currentTime = 0;
  }
}
