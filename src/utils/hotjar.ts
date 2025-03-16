const addHotjarScript = () => {
  if (!document.getElementById("hotjar-sdk-script")) {
    const scriptElement = document.createElement("script");
    scriptElement.id = "hotjar-sdk-script";
    scriptElement.async = true;

    const hotjarScriptContent = `
        // Example GTM script          
        (function (h, o, t, j, a, r) {
            h.hj = h.hj || function () {
                (h.hj.q = h.hj.q || []).push(arguments)
            };
            h._hjSettings = { hjid: 3916209, hjsv: 6 };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script');
            r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
        `;

    scriptElement.text = hotjarScriptContent;

    document.body.appendChild(scriptElement);
  }
};

export const loadHotjarSDK = () => {
  if (import.meta.env.VITE_ENV === "production") {
    setTimeout(addHotjarScript, 5000);
  }
};
