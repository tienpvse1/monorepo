import axios, { AxiosInstance } from 'axios';
import { envVars } from '../env/var.env';
const baseURL = envVars.VITE_BE_BASE_URL;
const feDomain = envVars.VITE_FE_DOMAIN;
import { StatusCodes } from 'http-status-codes';
export class Axios {
  instance: AxiosInstance;

  constructor() {
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
      function (error) {
        console.log(error.response.status);
        if (
          error.response.status === StatusCodes.UNAUTHORIZED ||
          error.response.status === StatusCodes.FORBIDDEN
        ) {
          window.location.href = `${feDomain}/login`;
        }

        // // Any status codes that falls outside the range of 2xx cause this function to trigger
        // // Do something with response error
        // const statusCode = error.response.status;
        // let destination = '';
        // if (statusCode === StatusCodes.NOT_FOUND) {
        //   destination = 'not-found';
        // } else if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
        //   destination = 'internal-server-error';
        // } else if (
        //   statusCode === StatusCodes.UNAUTHORIZED ||
        //   statusCode === StatusCodes.FORBIDDEN
        // ) {
        //   destination = 'unauthorize';
        // } else if (statusCode === StatusCodes.BAD_REQUEST) {
        // } else {
        //   destination = 'something-occur';
        // }
        // location.replace(`${envVars.VITE_BE_DOMAIN}/${destination}.html`);
      }
    );
  }
}

export const { instance } = new Axios();
