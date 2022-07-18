import CallingExtensions, { Constants } from "@hubspot/calling-extensions-sdk";


const callback = () => {

  const defaultSize = {
    width: 400,
    height: 400
  };

  const state = {};

  const cti = new CallingExtensions({
    debugMode: false,
    eventHandlers: {
      onReady: () => {
        cti.initialized({
          isLoggedIn: true,
          sizeInfo: defaultSize
        });
      },
      onDialNumber: (data, rawEvent) => {
        const { phoneNumber } = data;
        document.getElementById("phoneNumber").textContent = phoneNumber;
        if(webphone_api.isincall() === false) {
          webphone_api.call(phoneNumber);  
        }
        state.phoneNumber = phoneNumber;
        window.setTimeout(
          () =>
            cti.outgoingCall({
              createEngagement: false,
              phoneNumber
            }),
          500
        );
      },
      onEndCall: () => {

        cti.callEnded();
        window.setTimeout(() => {
          webphone_api.hangup();
        }, 500);
      }
    }
  });

  const element = document.querySelector(".btn");
  element.addEventListener("click", event => {
    document.getElementById("status").textContent = "Desligando...";
    
    webphone_api.hangup();
    cti.callEnded();
  });
};

if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {
  window.setTimeout(() => callback(), 1000);
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
