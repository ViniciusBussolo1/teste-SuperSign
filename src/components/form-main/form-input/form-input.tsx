interface FormInputProps {
  type: string;
  name: string;
  placeholder?: string;
  labelName?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}

export default function FormInput({
  name,
  type,
  placeholder,
  labelName,
  error,
  value,
  onChange,
  accept,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-bold text-xs">
        {labelName}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="text-sm p-1"
        value={value}
        onChange={onChange}
        accept={accept}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
