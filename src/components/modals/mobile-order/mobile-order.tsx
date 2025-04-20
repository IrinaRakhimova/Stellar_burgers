import styles from "./mobile-order.module.css";
import Modal from "../modal/modal";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchOrderByNumberThunk } from "../../../slices/orderSlice";
import { Loader } from "../../ui/loader/loader";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ingredientTranslations } from "../../../utils/translationMap";
import OrderDetails from "../order-details/order-details";
import { hideModal } from "../../../slices/orderSlice";

interface MobileOrderProps {
  onClose: () => void;
  handleOrderClick: () => void;
  totalPrice: number;
}

interface OrderState {
    isModalVisible: boolean;
  }

const MobileOrder: React.FC<MobileOrderProps> = ({
  onClose,
  handleOrderClick,
  totalPrice,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const allOrders = useAppSelector((state) => state.websocket.allOrders || []);
  const userOrders = useAppSelector(
    (state) => state.websocket.userOrders || []
  );
  const ingredientsData = useAppSelector(
    (state) => state.ingredients.ingredients || []
  );

  const { isModalVisible } = useAppSelector(
      (state: { order: OrderState }) => state.order
    );

  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  const allIngredients = useMemo(() => {
    const list = [...ingredients];
    if (bun) list.push(bun, bun); 
    return list;
  }, [ingredients, bun]);

  const ingredientCount: Record<string, number> = {};
  allIngredients.forEach((ingredient) => {
    if (!ingredient) return;
    ingredientCount[ingredient._id] =
      (ingredientCount[ingredient._id] || 0) + 1;
  });

  const fetchedOrder = useAppSelector((state) => state.order.order);
  const orderLoading = useAppSelector((state) => state.order.loading);
  const orderError = useAppSelector((state) => state.order.error);

  const orders: Order[] = useMemo(() => {
    return location.pathname.includes("/profile/orders")
      ? userOrders
      : allOrders;
  }, [location.pathname, allOrders, userOrders]);

  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);
  let order =
    orders.find((order) => order.number === orderNumber) || fetchedOrder;

  useEffect(() => {
    if (!order) {
      dispatch(fetchOrderByNumberThunk(orderNumber));
    }
  }, [order, orderNumber, dispatch]);

  const isModal =
    location.state && (location.state as { background?: boolean }).background;

  if (orderLoading)
    return (
      <p className={styles.loading}>
        <Loader />
      </p>
    );
  if (orderError) return <p className={styles.error}>{orderError}</p>;
  if (!order) return <p className={styles.error}>Order not found.</p>;


  const ingredientMap = Object.fromEntries(
    ingredientsData.map((ingredient) => [ingredient._id, ingredient])
  );

  const handleClose = () => {
      dispatch(hideModal());
    };

  return (
    <Modal header="Your Order" onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.card} key={order.number}>
          <div className={styles.pictures}>
            {Object.entries(ingredientCount).map(([id, count]) => {
              const ingredient = ingredientMap[id];
              return (
                <div key={id} className={styles.ingredientRow}>
                  <div className={styles.ingredientRowStart}>
                    <div className={styles.imageCard}>
                      <div className={styles.imageBackground}></div>
                      <div className={styles.imageBackgroundOverlay}></div>
                      <img
                        src={ingredient?.image}
                        alt={
                          ingredientTranslations[ingredient?.name] ||
                          ingredient?.name
                        }
                        className={styles.picture}
                      />
                    </div>
                    <p className={styles.ingredientName}>
                      {ingredientTranslations[ingredient?.name] ||
                        ingredient?.name}
                    </p>
                  </div>
                  <div className={styles.ingredientRowEnd}>
                    <p
                      className={styles.ingredientCount}
                    >{`${count} x ${ingredient?.price}`}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.cardLastRow}>
            <div>
              <Button
                size="medium"
                onClick={handleOrderClick}
                htmlType={"button"}
              >
                Place Order
              </Button>
              <Button
                size="medium"
                type="secondary"
                onClick={onClose}
                htmlType={"button"}
              >
                Cancel
              </Button>
            </div>
            <div className={styles.price}>
              <p className={styles.priceNumber}>{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && <OrderDetails onClose={handleClose} />}
    </Modal>
    
  );
};

export default MobileOrder;
