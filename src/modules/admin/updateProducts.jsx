/** @format */

import React, { useEffect, useState } from "react";
import FormMain from "../../components/admin/formMain";
import FormAddOpt from "../../components/admin/formAddOpt";
import UploadImg from "../../components/admin/uploadImg";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductsByIdQuery,
  useUpdateProductsMutation,
  useAddProductsMutation,
} from "../../services/fetch";
import Btn from "../../UI/btn";
import picture from "../../assets/img.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./style.module.css";

export default function UpdateProducts({ boolean }) {
  const [file, setFile] = useState(false);
  const [form, setForm] = useState({});
  const [urlImg, setUrlImg] = useState(picture);
  const { id } = useParams();
  const navigate = useNavigate();
  const formData = new FormData();
  const FORM = ["type", "brand", "name", "price", "desc"];

  const { data, isSuccess } = useGetProductsByIdQuery(id, { skip: !boolean });
  const [updateProducts] = useUpdateProductsMutation(id);
  const [addProduct, { isLoading }] = useAddProductsMutation();

  useEffect(() => {
    if (!boolean) {
      setForm({});
      setUrlImg(picture);
    }
    if (boolean && isSuccess) {
      setForm(data);
      setUrlImg(data.img);
    }
  }, [boolean, data, isSuccess]);

  const handleAddProducts = () =>
    addProduct(formData)
      .unwrap()
      .then(() => {
        setForm({});
        setUrlImg(picture);
        toast.success("success add", { theme: "dark" });
      });

  const handleUpdateProduct = () =>
    updateProducts({ id, body: formData })
      .unwrap()
      .then(() => {
        setTimeout(() => navigate(-1), 2000);
        toast.success("success update", { theme: "dark" });
      });

  const handlerClickButton = () => {
    if (file) {
      formData.append("img", file);
    }
    Object.keys(form).map((key) =>
      key === "options"
        ? formData.append(key, JSON.stringify(form.options))
        : formData.append(key, form[key])
    );

    boolean ? handleUpdateProduct(formData) : handleAddProducts(formData);
  };

  return (
    <div className={s.container}>
      <div style={{ display: "flex", width: "100%" }}>
        <UploadImg setFile={setFile} urlImg={urlImg} setUrlImg={setUrlImg} />
        <FormMain data={form} form={FORM} setForm={setForm} />
      </div>
      <FormAddOpt form={form} setForm={setForm} />
      <Btn loading={isLoading} onClick={handlerClickButton}>
        {boolean ? "UPDATE" : "ADD"}
      </Btn>
      <ToastContainer />
    </div>
  );
}
