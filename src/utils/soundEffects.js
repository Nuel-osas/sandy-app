class SoundManager {
  constructor() {
    this.enabled = localStorage.getItem('soundEnabled') !== 'false'
    this.sounds = {
      click: new Audio('/sounds/click.mp3'),
      achievement: new Audio('/sounds/achievement.mp3'),
      combo: new Audio('/sounds/combo.mp3')
    }
  }

  toggle() {
    this.enabled = !this.enabled
    localStorage.setItem('soundEnabled', this.enabled)
  }

  play(sound) {
    if (this.enabled && this.sounds[sound]) {
      this.sounds[sound].play()
    }
  }
}

export const soundManager = new SoundManager() 