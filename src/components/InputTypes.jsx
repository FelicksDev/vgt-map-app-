function InputTypes() {
  return <div>InputTypes</div>;
}
export const RangeInput = ({ value, handleChange }) => {
  return (
    <div>
      <label
        htmlFor="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Opacidad
      </label>
      <input
        id="default-range"
        type="range"
        min="0.0"
        max="1"
        step={0.1}
        value={value}
        onChange={(e) => handleChange(e)}
        // onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};
export const CheckboxInput = ({ type, id, label, value, handleChange }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={id}
        type={type}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        name={id}
        value={value}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};
export default InputTypes;
