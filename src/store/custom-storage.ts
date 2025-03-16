export const createCustomStorage = (type: "local" | "session" | "cookie") => {
  switch (type) {
    case "local":
      return {
        getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
        setItem: (key: string, value: string) => {
          localStorage.setItem(key, value);
          return Promise.resolve();
        },
        removeItem: (key: string) => {
          localStorage.removeItem(key);
          return Promise.resolve();
        },
      };

    case "session":
      return {
        getItem: (key: string) => Promise.resolve(sessionStorage.getItem(key)),
        setItem: (key: string, value: string) => {
          sessionStorage.setItem(key, value);
          return Promise.resolve();
        },
        removeItem: (key: string) => {
          sessionStorage.removeItem(key);
          return Promise.resolve();
        },
      };

    case "cookie":
      return {
        getItem: (key: string) => {
          const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${key}=`));
          return Promise.resolve(cookie ? cookie.split("=")[1] : null);
        },
        setItem: (key: string, value: string) => {
          document.cookie = `${key}=${value}; path=/;`;
          return Promise.resolve();
        },
        removeItem: (key: string) => {
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
          return Promise.resolve();
        },
      };

    default:
      throw new Error(`Unsupported storage type: ${type}`);
  }
};
