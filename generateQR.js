import QRCode from "qrcode";

const serial = "KRYSON001";

const url = `https://verify.krysonlifescience.com/verify/${serial}`;

QRCode.toFile("KRYSON001.png", url)
  .then(() => {
    console.log("QR Code Generated!");
  })
  .catch((err) => {
    console.error(err);
  });