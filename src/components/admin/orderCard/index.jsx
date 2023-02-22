/** @format */

import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import s from "./style.module.css";
import { useUpdateOrderMutation } from "../../../services/fetch";

export default function OrderCard({ data }) {
  const { user, status, orders } = data;
  const { email, telephone } = user;
  const [updateOrder] = useUpdateOrderMutation();

  const handleClick = () =>
    updateOrder({ id: data._id, body: { status: "PENDING" } });

  return (
    <Card
      className={s.container}
      style={{
        backgroundColor:
          status === "PENDING"
            ? "#3fb1d5"
            : status === "RESOLVED"
            ? "#e3ffcc"
            : "#e1e6e2",
      }}
    >
      <div className={s.emailContainer}>
        <Typography sx={{ fontSize: 20 }} color="text.secondary">
          {email}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          tel:{telephone}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          status:{status}
        </Typography>
      </div>

      <div className={s.orderContainer}>
        {orders?.map((el) => (
          <div className={s.itemOrderContainer} key={el._id}>
            <div className={s.itemOrder} style={{ minWidth: "150px" }}>
              brand: <b>{el.brand}</b>
            </div>
            <b className={s.itemOrder} style={{ width: "100%" }}>
              {el.name}
            </b>

            <div className={s.itemOrder}>
              price: <b style={{ color: "red" }}>{el.price}</b>
            </div>
            <div className={s.itemOrder}>
              qty:<b>{el.qty}</b>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        sx={{ marginLeft: "auto" }}
        onClick={handleClick}
      >
        in the road
      </Button>
    </Card>
  );
}
