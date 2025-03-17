export const getURLQueryValue = (key: string) => {
  const match = window.location.search.match("[?&]" + key + "(?:&|$|=([^&]*))");
  return match ? (match[1] ? match[1] : "") : null;
};

export function getParameterQuery(): Record<string, string> {
  const parameter: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params) {
    parameter[key] = value;
  }
  return parameter;
}

export const appendGAScript = () => {
  const gaID = import.meta.env.VITE_GA4_IN_APP_MEASUREMENT_ID;

  if (gaID == "") {
    return;
  }

  document.head.insertAdjacentHTML(
    "afterbegin",
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaID}"> </script>`,
  );
  document.head.insertAdjacentHTML(
    "afterbegin",
    `
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${gaID}');
        </script>
        `,
  );
};

export const flatArrByKey = (
  arr: { [key: string]: unknown }[],
  key: string,
) => {
  if (!arr || !arr.length) return [];
  return arr.flatMap((item) => item[key]);
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// export const createDynamicRoute = (path: string) => {
//   return React.lazy(() => import(`./pages/${path}`));
// };
