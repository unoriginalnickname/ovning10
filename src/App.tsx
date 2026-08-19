import { useState } from "react";

import "./App.css";

function App() {
  type ButtonID = {
    id: `${string}-${string}-${string}-${string}-${string}`;
    count: number;
  };

  const [buttonsData, setButtonsData] = useState<ButtonID[]>([
    { id: crypto.randomUUID(), count: 0 },
  ]);

  const [visibleTotal, setVisibleTotal] = useState(0);
  const [hiddenTotal, setHiddenTotal] = useState(0);

  function addClick(buttonData: {
    id: `${string}-${string}-${string}-${string}-${string}`;
    count: number;
  }) {
    setButtonsData(
      buttonsData.map((x) =>
        x.id == buttonData.id ? { ...x, count: buttonData.count + 1 } : x,
      ),
    );
    setHiddenTotal(hiddenTotal + 1);
    updateVisibleTotalOnAdd();
  }

  function updateVisibleTotalOnAdd() {
    const test = hiddenTotal + 1;
    if (test % 10 == 0) resetCounters();
    setVisibleTotal(test - (test % 10));
  }

  function updateVisibleTotalOnRemove(count: number) {
    const test = hiddenTotal - count;
    setVisibleTotal(test - (test % 10));
  }

  function AddButton() {
    const newArray = [...buttonsData, { id: crypto.randomUUID(), count: 0 }];
    setButtonsData(newArray);
  }

  function PrintCount(count: number) {
    if (count >= 3) {
      return <>Max nått! (3)</>;
    }
    return <>Klickat {count} gånger</>;
  }

  function removebutton(buttonid: ButtonID) {
    const buttonValue = buttonsData.filter((id) => id == buttonid).at(0);
    let buttonCount = 0;
    if (buttonValue) {
      buttonCount = buttonValue?.count;

      setHiddenTotal(hiddenTotal - buttonCount);
    }

    updateVisibleTotalOnRemove(buttonCount);
    setButtonsData((currentButtonIDs) =>
      currentButtonIDs.filter((id) => id !== buttonid),
    );
  }

  // set total to total - total % 10

  // function fixTotal() {
  //   let total = 0;
  //   buttonsData.map((x) => (total += x.count));
  //   if (total !== 0 && (total + 1) % 10 == 0) {
  //     resetCounters();
  //     setVisibleTotal(visibleTotal + 10);
  //     total = 0;
  //   }
  // }

  function resetCounters() {
    setButtonsData((prev) =>
      prev.map((x) => ({
        ...x,

        count: 0,
      })),
    );
  }
  function resetEverything() {
    resetCounters();
    setHiddenTotal(0);
    setVisibleTotal(0);
  }

  function renderbutton() {
    return (
      <div className="flex flex-row flex-wrap ">
        {buttonsData.map((buttonData) => (
          <div>
            <button
              key={buttonData.id}
              type="button"
              disabled={buttonData.count >= 3}
              className="counter min-w-44"
              onClick={() => {
                addClick(buttonData);
              }}
            >
              {PrintCount(buttonData.count)}
            </button>
            <button
              type="button"
              className="removeButton"
              onClick={() => removebutton(buttonData)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <section id="center">
        <div className="flex flex-row justify-center gap-10">
          <h1 className="text-gray-500">Hidden total count: {hiddenTotal}</h1>
          <h1 className="text-white">Total count: {visibleTotal}</h1>
        </div>
        <button
          className="m-10 border-2 border-fuchsia-700 rounded-md p-2"
          onClick={AddButton}
        >
          Add New
        </button>
        <button
          className="m-10 border-2 border-fuchsia-700 rounded-md p-2"
          onClick={resetEverything}
        >
          Reset Everything
        </button>
        <div className="flex flex-row">{renderbutton()}</div>
      </section>
    </>
  );
}

export default App;
