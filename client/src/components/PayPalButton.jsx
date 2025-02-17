import { useEffect } from "react";

const PayPalButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=BAAyayE3X6NVR-OUPuFZGFTD1oCSwsCrC5sfEshF4308QxYpBwb-baTNzN510qSvV9DkQtZrsJZkBePFDU&components=hosted-buttons&disable-funding=venmo&currency=USD";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (window.paypal) {
        window.paypal
          .HostedButtons({
            hostedButtonId: "NVNV7J6M7CLLC",
          })
          .render("#paypal-container-NVNV7J6M7CLLC");
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="paypal-button-container"
        id="paypal-container-NVNV7J6M7CLLC"
      ></div>
    </div>
  );
};

export default PayPalButton;
