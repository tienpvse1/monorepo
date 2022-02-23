import axios, { AxiosInstance } from 'axios';
import { envVars } from '../env/var.env';
const baseURL = envVars.VITE_BE_BASE_URL;

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
