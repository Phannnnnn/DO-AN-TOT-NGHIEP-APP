import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DatePickerCustom = ({ label, minDate, value, onChangeDate }) => {
  return (
    <Field className="mx-auto w-44">
      <FieldLabel
        htmlFor="date-picker-simple"
        className="flex justify-center font-semibold"
      >
        {label}
      </FieldLabel>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-simple"
            className="justify-center font-medium text-xs !px-3 !py-4"
          >
            {value && !isNaN(value) ? format(value, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChangeDate}
            defaultMonth={value}
            disabled={
              minDate
                ? { before: new Date(minDate.getTime() + 86400000) }
                : { before: new Date() }
            }
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
};

export default DatePickerCustom;
