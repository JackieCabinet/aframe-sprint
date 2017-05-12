/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('lock-on-source', {
  schema: { },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { 
    this.el.selectedTargets = [];
    this.el.maxTargets = 5;
    this.el.engaged = false;
    window.addEventListener('keydown', this.onKeyDown.bind(this))
    window.addEventListener('keyup', this.onKeyUp.bind(this))
  },

  onKeyDown: function(event) {
    if (event.key === ' ') {
      this.el.engaged = true;
      this.rayCheck();
    }
    if (event.key === 'Shift') {
      this.el.setAttribute('visible', 'false')
    }
  },

  onKeyUp: function(event) {
    event.preventDefault()
    if (event.key === ' ') {
      this.el.engaged = false;
      this.destroyTargets();
    }
    if (event.key === 'Shift') {
      this.el.setAttribute('visible', 'true')
    }
  },

  rayCheck: function() {
    let intersect = document.querySelector('a-cursor').components.cursor.intersectedEl
    if (intersect && intersect.lockOnTarget) {
      this.el.selectedTargets = this.el.selectedTargets.concat(intersect)
      intersect.targeted = true;
    }
  },

  destroyTargets() {
    let target, position
    for (let i = this.el.selectedTargets.length; i > 0; i--) {
      target = this.el.selectedTargets[i-1];
      position = target.object3D.position;
      target.emit('destruction', {
        position,
        idx: target.idx,
        points: target.points,
      }, true)
    }
    this.el.selectedTargets = [];
  },
  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {
    // window.removeEventListener('keydown', this.onKeyDown.bind(this))
    // window.removeEventListener('keyup', this.onKeyUp.bind(this))
  },

  /**
   * Called on each scene tick.
   */
  tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () {
    // window.removeEventListener('keydown', this.onKeyDown.bind(this))
    // window.removeEventListener('keyup', this.onKeyUp.bind(this))
  },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () {
    // window.addEventListener('keydown', this.onKeyDown.bind(this))
    // window.addEventListener('keyup', this.onKeyUp.bind(this))
  }
});