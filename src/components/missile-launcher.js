/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('missile-launcher', {
  schema: {  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    this.rateOfFire = 1000;
    this.timestamp = performance.now();
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
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  tick: function (time) { 
    if (time - this.timestamp > this.rateOfFire) {
      let {x,y,z} = this.el.object3D.position
      this.timestamp = time;
      this.el.emit('missile-launch', {
        position: `${x} ${y} ${z}`
      })
    }
  },


  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },
  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },
});