import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

function Size({ data, onClickHandle, itemid }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(data[0]);
    onClickHandle(data[0]);
  }, []);

  return (
    <>
      {data &&
        data.map((item, index) => (
          <div
            className={selected === item ? "size-item divBorder" : "size-item"}
            key={index}
            onClick={() => {
              setSelected(item);
              onClickHandle(item);
            }}
          >
            {item}
          </div>
        ))}
    </>
  );
}

export default Size;
