

export function createQrCode(roomId) {
  if (!window.qrcode) {
    console.error("QR code library not loaded");
    console.warn(`Add this to before your </head>
      <script src="https://unpkg.com/qrcode-generator@1.4.4/qrcode.js"></script>
      (because it does not supports ESM)
    `);
  }

  const code = window.qrcode(4, "L");
  code.addData(`https://restroom.place/room/${roomId}?fe`);
  code.make();
  return code.createSvgTag(8, 24);
}
