import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then((res) => {
        setColorList(res.data);
        setIsFetching(false);
      })
      .catch((err) => {
        setIsFetching(false);
        console.log(err);
      });
  }, [isFetching]);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        fetchingNewData={setIsFetching}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
