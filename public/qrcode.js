(() => {
  const link = "https://unpkg.com/qrcode-generator@1.4.4/qrcode.js";
  const script = document.createElement("script");
  script.src = link;
  document.head.appendChild(script);
})();

export function createQrCode(roomId) {
  const code = qrcode(4, "L");
  code.addData(`https://restroom.place/room/${roomId}?fe`);
  code.make();
  return code.createSvgTag(8, 24);
}
