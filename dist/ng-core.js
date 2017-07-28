// Entry point - Register angular modules
(function () {
  'use strict';

  angular.module('rdelhommer.ng.core',[]);
}());

// Base object to provide event pub/sub functionality to other objects
(function () {
  'use strict';

  angular.module('rdelhommer.ng.core')
    .factory('eventEmitterFactory', factoryGetter);

  function factoryGetter(uuidGenerator) {
    return new EventEmitterFactory(uuidGenerator);
  }

  function EventEmitterFactory(uuidGenerator) {
    this.create = create;

    function create() {
      return new EventEmitter(uuidGenerator);
    }
  }

  function EventEmitter(uuidGenerator) {
    var callbacks = {};

    this.on = on;
    this.emit = emit;

    function on(eventId, callbackToRegister, registrationScope, disableScopeWarning) {
      if (!registrationScope && !disableScopeWarning) {
        console.log('WARNING: No scope for event registration - ' + eventId);
      }

      var uuid = uuidGenerator.generateUuid();
      if (!callbacks[eventId]) {
        callbacks[eventId] = {};
      }

      callbacks[eventId][uuid] = callbackToRegister;

      if (!registrationScope) return;

      // Remove the callback when the registration scope is destroyed 
      registrationScope.$on('$destroy', () => {
        delete callbacks[eventId][uuid];
      });
    }

    function emit(eventId, payload) {
      if (!callbacks[eventId]) return;

      for (var uuid in callbacks[eventId]) {
        if (!callbacks[eventId].hasOwnProperty(uuid)) continue;

        // Invoke the callback
        callbacks[eventId][uuid](payload);
      }
    }
  }
}());

// Generates UUIDs 
(function () {
  'use strict';

  angular.module('rdelhommer.ng.core')
    .service('uuidGenerator', UuidGenerator);

  function UuidGenerator() {
    this.generateUuid = generateUuid;

    function generateUuid () {
      var d = new Date().getTime();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
      }

      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }
  }
}());
