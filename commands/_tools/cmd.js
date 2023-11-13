module.exports = function cmd(command, handler, builder = {}, aliases = "", describe = "") {
  return { aliases, builder, command, describe, handler };
};
