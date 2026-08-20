import { useState } from "react";

import "./App.css";

function App() {
  type UUID = `${string}-${string}-${string}-${string}-${string}`;
  type ButtonData = { id: UUID; count: number };
  type ButtonProps = { buttonData: ButtonData };

  const [buttonsData, setButtonsData] = useState<ButtonData[]>([
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

  function removebutton(buttonData: ButtonData) {
    const buttonValue = buttonsData.filter((data) => data == buttonData).at(0);
    let buttonCount = 0;
    if (buttonValue) {
      buttonCount = buttonValue?.count;

      setHiddenTotal(hiddenTotal - buttonCount);
    }

    updateVisibleTotalOnRemove(buttonCount);
    setButtonsData((currentButtonIDs) =>
      currentButtonIDs.filter((id) => id !== buttonData),
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

  // function Car({ brand, year, isElectric, onSell }: CarProps) {
  //   return (

  function Button(props: ButtonProps) {
    const data = props.buttonData;
    const { id, count } = props.buttonData;

    return (
      <>
        <button
          key={id}
          type="button"
          disabled={count >= 3}
          className="counter min-w-44"
          onClick={() => {
            addClick(data);
          }}
        >
          {PrintCount(count)}
        </button>
        <button
          type="button"
          className="removeButton"
          onClick={() => removebutton(data)}
        >
          X
        </button>
      </>
    );
  }

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
          <div key={buttonData.id}>
            <Button buttonData={buttonData}></Button>
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
