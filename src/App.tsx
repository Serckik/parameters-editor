import { ChangeEvent, SyntheticEvent, useState } from "react";
import styled from '@emotion/styled';

interface Param {
  id: number;
  name: string;
  type: 'string' | 'number';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const FormInputs = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;

  > label {
    font-weight: bold;
    width: 100%;
    text-align: center;
  }
`;

function ParamEditor({ params, model }: Props) {
  const [paramValues, setParamValues] = useState(model.paramValues);
  const [isSend, setIsSend] = useState(false)

  function paramHandler(evt: ChangeEvent<HTMLInputElement>, index: number): void {
    const newParamValues = [...paramValues];
    newParamValues[index].value = evt.target.value;
    setParamValues(newParamValues);
    setIsSend(false);
  }

  function getModel(evt: SyntheticEvent) {
    evt.preventDefault();
    setIsSend(true);
  }

  return (
    <>
      <form onSubmit={getModel}>
        {params.map((item) => (
          <FormInputs key={item.id}>
            <label>{item.name}</label>
            <input
              onChange={(evt) => paramHandler(evt, item.id - 1)}
              type={item.type === 'string' ? 'text' : 'number'}
              value={paramValues[item.id - 1].value}
            />
          </FormInputs>
        ))}
        {!isSend && <button type="submit">Вывести модель</button>}
      </form>
      {isSend && (
        paramValues.map(item => (
          <p><b>{params[item.paramId - 1].name}</b> {item.value}</p>
        ))
      )}
    </>
  );
}

function App() {
  const paramsData: Param[] = [
    { "id": 1, "name": "Назначение", "type": "string" },
    { "id": 2, "name": "Длина", "type": "string" }
  ];

  const model: Model = {
    "paramValues": [
      { "paramId": 1, "value": "повседневное" },
      { "paramId": 2, "value": "макси" }
    ]
  };

  return (
    <ParamEditor params={paramsData} model={model} />
  );
}

export default App;