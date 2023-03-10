export function greeter(): { helloworld: () => string } {
  return {
    helloworld: function () {
      return "hello world";
    },
  };
}
