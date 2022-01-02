import React, {
  useState,
  //useRef,
  // useEffect,
  //useMemo,
  // useCallback,
  // useReducer,
  //createContext,
  //useContext,
} from 'react';

let __key__ = 0;
const generateKey = () => {
  //return new Date().getTime();
  return __key__++;
};

function FormInputText({ value, onChange }) {
  function onChangeData({ target: { value } }) {
    onChange(value);
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onChangeData}
      key={generateKey()}
    ></input>
  );
}

function FormInputRadio({ value, items, onChange }) {
  const formId = generateKey();

  function onChangeData({ target: { value } }) {
    onChange(value);
  }

  return (
    <>
      {items.map((item) => (
        <label key={generateKey()}>
          <input
            type="radio"
            name={'rd_' + formId}
            checked={item.value === value}
            value={item.value}
            onChange={onChangeData}
          ></input>
          {item.text}
        </label>
      ))}
    </>
  );
}

function FormInputCheck({ items, onChange }) {
  const formId = generateKey();
  const [data, setData] = useState(new Array(items.length).fill(false));

  function onChangeValue(idx) {
    const newData = data.map((it, i) => (i === idx ? !it : it));
    setData(newData);
    const checked = items.filter((item, idx) => newData[idx]);
    onChange(checked.map((it) => it.value));
  }

  return (
    <>
      {items &&
        items.map((item, idx) => (
          <label key={generateKey()}>
            <input
              type="checkbox"
              name={'ck_' + formId}
              checked={data[idx]}
              value={item.value}
              onChange={() => onChangeValue(idx)}
            ></input>
            {item.text}
          </label>
        ))}
    </>
  );
}

function Checkbox({ item, value, onChange }) {
  const data = !!~value.indexOf(item.value);

  function onChangeValue() {
    const ret = !data
      ? value.concat(item.value)
      : value.filter((it) => it !== item.value);
    onChange(ret);
  }

  return (
    <label>
      <input type="checkbox" checked={data} onChange={onChangeValue}></input>
      {item.text}
    </label>
  );
}

function FormInputCheck2({ value, items, onChange }) {
  return (
    <>
      {items &&
        items.map((item, idx) => (
          <Checkbox
            key={generateKey()}
            item={item}
            value={value}
            onChange={onChange}
          ></Checkbox>
        ))}
    </>
  );
}

function FormTextarea({ value, onChange }) {
  function onChangeData({ target: { value } }) {
    onChange(value);
  }

  return <textarea value={value} onChange={onChangeData}></textarea>;
}

function FormSelect({ items, value, onChange }) {
  function onChangeValue({ target: { value } }) {
    onChange(value);
  }

  return (
    <select value={value} onChange={onChangeValue}>
      <option value="">select</option>
      {items.map((it) => (
        <option value={it.value} key={generateKey()}>
          {it.text}
        </option>
      ))}
    </select>
  );
}

export default function Form() {
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState('1');
  const [value3, setValue3] = useState([]);
  const items = [
    { text: 'one', value: '1' },
    { text: 'two', value: '2' },
  ];
  return (
    <>
      <h1>Form</h1>
      <hr />
      <div>
        <h2>Input Text</h2>
        <FormInputText
          value={value1}
          onChange={(v) => setValue1(v)}
        ></FormInputText>{' '}
        {value1}
      </div>
      <hr />
      <div>
        <h2>Input Radio</h2>
        <FormInputRadio
          value={value2}
          items={items}
          onChange={(v) => setValue2(v)}
        ></FormInputRadio>{' '}
        {value2}
      </div>
      <hr />
      <div>
        <h2>Input Check</h2>
        <FormInputCheck
          items={items}
          value={value3}
          onChange={(v) => setValue3(v)}
        ></FormInputCheck>{' '}
        {value3}
      </div>
      <hr />
      <div>
        <h2>Input Check2</h2>
        <FormInputCheck2
          items={items}
          value={value3}
          onChange={(v) => {
            setValue3(v);
          }}
        ></FormInputCheck2>{' '}
        {value3}
      </div>
      <hr />
      <div>
        <h2>Textarea</h2>
        <FormTextarea
          value={value1}
          onChange={(v) => setValue1(v)}
        ></FormTextarea>{' '}
        {value1}
      </div>
      <hr />
      <div>
        <h2>Select</h2>
        <FormSelect
          items={items}
          value={value2}
          onChange={(v) => setValue2(v)}
        ></FormSelect>{' '}
        {value2}
      </div>
    </>
  );
}
