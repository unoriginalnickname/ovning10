type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type ButtonData = { id: UUID; count: number };

type ButtonProps = {
  buttonData: ButtonData;
  onAddClick: (data: ButtonData) => void;
  onRemoveButton: (data: ButtonData) => void;
};

function Button(props: ButtonProps) {
  const data: ButtonData = props.buttonData;
  const { count } = props.buttonData;

  return (
    <>
      <button
        type="button"
        disabled={count >= 3}
        className="counter min-w-44"
        onClick={() => {
          props.onAddClick(data);
        }}
      >
        {PrintCount(count)}
      </button>
      <button
        type="button"
        className="removeButton"
        onClick={() => props.onRemoveButton(data)}
      >
        X
      </button>
    </>
  );
}

function PrintCount(count: number) {
  if (count >= 3) {
    return <>Max nått! (3)</>;
  }
  return <>Klickat {count} gånger</>;
}

export default Button;
