import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { useMutation, useQueryClient } from "react-query";
import { message } from "antd"
import { IProduct } from "../enity/product.enity";
const { PRODUCT } = controllers;


export const actionPutProduct = async ({ id, ...rest }: IProduct) => {
  const { instance } = new Axios();
  const { data } = await instance.put(`${PRODUCT}/${id}`, { ...rest });

  return data;
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(actionPutProduct,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PRODUCT);
      },
      onError: () => {
        message.error('Oops something went wrong!');
      }
    }
  );

  const updateProduct = (product: IProduct) => {
    mutate(product);
  }

  return { updateProduct, isLoading, isError };
}