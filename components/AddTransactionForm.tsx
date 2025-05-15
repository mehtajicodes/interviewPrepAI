import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveTransaction } from "@/utils/dataManager";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format as formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import categories from "@/lib/categories";

interface AddTransactionFormProps {
  type: "expense" | "income";
  onClose: () => void;
}

export default function AddTransactionForm({
  type,
  onClose,
}: AddTransactionFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTransaction({
      type,
      title,
      amount: parseFloat(amount),
      category: selectedCategory,
      //@ts-ignore
      date: date.toISOString(),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <Label htmlFor="title" className="text-xs font-medium">
          Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="text-md py-2"
        />
      </div>
      <div>
        <Label htmlFor="amount" className="text-xs font-medium">
          Amount
        </Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="text-md py-2"
        />
      </div>
      <div>
        <Label className="text-xs font-medium">Category</Label>
        <div className="grid grid-cols-4 gap-3 mt-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              type="button"
              variant={selectedCategory === category.name ? "outline" : "ghost"}
              onClick={() => setSelectedCategory(category.name)}
              className="flex flex-col items-center p-3 h-auto">
              <img
                src={`https://emojicdn.elk.sh/${category.emoji}?style=apple`}
                alt={category.name}
                className="w-10 h-10 mb-1"
              />
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-xs font-medium">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal mt-1 text-md py-3`}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {/* {date ? formatDate(date, "PPP") : <span>Pick a date</span>} */}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        type="submit"
        className="py-5 text-md bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow mt-4">
        Add {type === "expense" ? "Expense" : "Income"}
      </Button>
    </form>
  );
}
