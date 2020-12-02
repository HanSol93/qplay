/* 배열 섞기 */
export const __shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

/* srcObject 셋팅 */
export const __srcObject = (node, stream) => {
  node.srcObject = stream;
  return {
    update() {
      node.srcObject = stream;
    },
  };
};
