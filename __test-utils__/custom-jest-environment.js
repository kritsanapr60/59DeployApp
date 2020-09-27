const JSDOMEnvironment  = require('jest-environment-jsdom');
class CustomEnvironment extends JSDOMEnvironment {
  constructor(config,options){
    global.Uint8Array = Uint8Array;
    super(Object.assign({}, config, {
      globals: Object.assign({}, config.globals, {
        Uint32Array: Uint32Array,
        Uint8Array: Uint8Array,
        ArrayBuffer: ArrayBuffer,
      }),
    }),options);
  }
}
module.exports = CustomEnvironment;