import axios, { AxiosInstance } from 'axios';
import { envVars } from '../env/var.env';
const baseURL = envVars.VITE_BE_BASE_URL;
const feDomain = envVars.VITE_FE_DOMAIN;
import { StatusCodes } from 'http-status-codes';
export class Axios {
  instance: AxiosInstance;
  handleError = true;
  constructor(handleError: boolean = true) {
    this.handleError = handleError;
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
    });
    this.instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response.data;
      },
      ({ response: { status } }) => {
        console.log(status);
        if (
          this.handleError &&
          (status === StatusCodes.UNAUTHORIZED ||
            status === StatusCodes.FORBIDDEN)
        ) {
          window.location.href = `${feDomain}/login`;
        }
      }
    );
  }
}

export const { instance } = new Axios();
export const { instance: noErrorInstance } = new Axios(false);
