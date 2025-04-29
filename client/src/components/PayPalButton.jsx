import { useEffect, useRef } from "react";

const PayPalButton = () => {
  const paypalRef = useRef(null);

  useEffect(() => {
    // Cargar el script solo una vez
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=BAAyayE3X6NVR-OUPuFZGFTD1oCSwsCrC5sfEshF4308QxYpBwb-baTNzN510qSvV9DkQtZrsJZkBePFDU&components=hosted-buttons&disable-funding=venmo&currency=USD";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      if (window.paypal) {
        window.paypal
          .HostedButtons({
            hostedButtonId: "GSYRS7YFTXVMQ",
          })
          .render(paypalRef.current);
      }
    };

    document.body.appendChild(script);
  }, []);

  return <div className="paypal-button-container" ref={paypalRef} />;
};

export default PayPalButton;
