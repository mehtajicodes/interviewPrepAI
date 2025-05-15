"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrainCogIcon, EllipsisVerticalIcon, FilterIcon } from "lucide-react";
import {
  getTransactions,
  Transaction,
  deleteTransaction,
} from "@/utils/dataManager";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditTransactionForm from "@/components/EditTransactionForm";
import { format as formatDate } from "date-fns";
import BottomNav from "@/components/BottomNav";
// import Expninc from "@/components/expninc";
import { DialogDescription } from "@radix-ui/react-dialog";
import { UserButton } from "@civic/auth-web3/react";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(getTransactions());
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const thisMonthExpense = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        new Date(t.date).getMonth() === new Date().getMonth()
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const thisMonthEarning = transactions
    .filter(
      (t) =>
        t.type === "income" &&
        new Date(t.date).getMonth() === new Date().getMonth()
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    setTransactions(getTransactions());
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleEditComplete = () => {
    setEditingTransaction(null);
    setTransactions(getTransactions());
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Master Your Interview Skills with AI
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Practice interviews, get instant feedback, and improve your chances of landing your dream job.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/practice">Start Practicing</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/questions">Browse Questions</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">AI-Powered Practice</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Experience realistic interview simulations with our advanced AI that adapts to your responses.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Smart Feedback</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Get detailed analysis of your answers with suggestions for improvement.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Question Bank</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Access a comprehensive collection of industry-specific interview questions.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold">Choose Your Path</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Select your industry and role to get relevant questions and scenarios.
            </p>
          </div>
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold">Practice Interviews</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Engage in realistic interview simulations with our AI interviewer.
            </p>
          </div>
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold">Get Feedback</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Receive detailed analysis and suggestions for improvement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function deleteDialog({ transaction, handleDelete }: any) {
  return (
    <Dialog modal={false}>
      <DialogTitle className="sr-only">Delete!?</DialogTitle>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full cursor-pointer justify-start">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Transaction</DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure?</DialogDescription>
        <DialogFooter className="flex flex-row gap-2 justify-end">
          <Button>Cancel</Button>
          <Button
            onClick={() => handleDelete(transaction.id)}
            variant="outline">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function editDialog({
  transaction,
  handleEdit,
  editingTransaction,
  handleEditComplete,
}: any) {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full cursor-pointer justify-start"
          onClick={() => handleEdit(transaction)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        {editingTransaction && (
          <EditTransactionForm
            transaction={editingTransaction}
            onComplete={handleEditComplete}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
