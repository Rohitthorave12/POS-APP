import React from "react";
import { Card, Button } from "antd";
import {useDispatch} from 'react-redux'
const ItemList = ({ item }) => {
  const dispatch = useDispatch()
  const handelAddToCart = ()=>{
    dispatch({
      type:'updateCart',
      payload: {...item, quantity:1},
    })
  }

  const { Meta } = Card;
  return (
    <div>
      <Card
       
        style={{ width: 240, marginBottom: 20 }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{height:200}}
          />
        }
        
      >
        <Meta title={item.name} />
        <div className="item-button">
          <Button onClick={()=>handelAddToCart()} >Add to cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
