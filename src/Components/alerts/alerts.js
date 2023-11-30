import toast from "react-hot-toast";

//alerta para 
export const succesAlert = (message) => {
  toast.success(
    message ,
    {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#000000",
      },
      iconTheme: {
        primary: "#045FF5",
        secondary: "#FFFFFF",
      },
    }
  );
};

//alerta para errores
export const errorAlert = (message) => {
  toast.error(
     message ,
    {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#000000",
      },
      iconTheme: {
        primary: "#045FF5",
        secondary: "#021859",
      },
    }
  );
};
