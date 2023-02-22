/** @format */
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../../services/fetch";

import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";

import SliderPrice from "../../components/sidebar/sliderPrice";
import Filter from "../../components/sidebar/filter";
import OptionsCard from "../../components/sidebar/optionsCard";

import s from "./style.module.css";
import BtnRemove from "../../UI/btnRemove";

export default function Sidebar({ children }) {
  const isOpen = useSelector((store) => store.button.menu);
  const { data = [], isLoading } = useGetProductsQuery();

  const { maxPrice, minPrice, products = [] } = data;

  const type = [...new Set(products.map(({ type }) => type))];
  const brand = [...new Set(products.map(({ brand }) => brand))];

  return (
    <Slide
      direction="right"
      in={isOpen && !isLoading}
      mountOnEnter
      unmountOnExit
    >
      {
        <Paper>
          {isLoading ? (
            <div className={s.container}>loading</div>
          ) : (
            <div className={s.container}>
              <Filter options={{ type, brand }} />
              <SliderPrice price={[minPrice, maxPrice]} />
              <OptionsCard />
              <div className={s.children}>{children}</div>
            </div>
          )}
        </Paper>
      }
    </Slide>
  );
}
