import { envVars } from "@env/var.env";
import axios from "axios";
import { useQuery } from "react-query";
import { IProvinces } from "../entity/provinces.entity";

const instance = axios.create({ baseURL: envVars.VITE_BE_PROVINCES_BASE_URL });

const PROVINCES = 'provinces';

const getProvinces = async () => {
  const { data } = await instance.get<IProvinces[]>('?depth=2');
  return data;
};

export const useQueryProvinces = () => useQuery(PROVINCES, getProvinces, {
  staleTime: Infinity
});