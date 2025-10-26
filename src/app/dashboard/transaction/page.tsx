"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { format } from "date-fns";
import { cn, displayRazorpayAmount } from "@/lib/utils";
import { IPayment } from "@/redux/admin/slice/payment";
import { User } from "@prisma/client";
import { ICourse } from "@/redux/admin/slice/all-courses";
import { IEvent } from "@/redux/admin/slice/all-events";

// Mock transaction data
const transactions = [
  {
    id: "TXN-001234",
    student: "Sarah Johnson",
    email: "sarah.j@example.com",
    course: "Advanced React Development",
    amount: 249.99,
    status: "completed",
    paymentMethod: "credit_card",
    date: "2024-01-15 10:30 AM",
    transactionFee: 7.25,
  },
  {
    id: "TXN-001233",
    student: "Mike Chen",
    email: "mike.chen@example.com",
    course: "Full-Stack JavaScript",
    amount: 199.99,
    status: "completed",
    paymentMethod: "paypal",
    date: "2024-01-15 09:15 AM",
    transactionFee: 5.8,
  },
  {
    id: "TXN-001232",
    student: "Emily Davis",
    email: "emily.d@example.com",
    course: "UI/UX Design Fundamentals",
    amount: 179.99,
    status: "pending",
    paymentMethod: "credit_card",
    date: "2024-01-14 08:45 PM",
    transactionFee: 5.22,
  },
  {
    id: "TXN-001231",
    student: "Alex Thompson",
    email: "alex.t@example.com",
    course: "Data Science Basics",
    amount: 299.99,
    status: "completed",
    paymentMethod: "credit_card",
    date: "2024-01-14 07:20 PM",
    transactionFee: 8.7,
  },
  {
    id: "TXN-001230",
    student: "Jessica Lee",
    email: "jessica.lee@example.com",
    course: "Advanced React Development",
    amount: 249.99,
    status: "failed",
    paymentMethod: "credit_card",
    date: "2024-01-14 05:30 PM",
    transactionFee: 0,
  },
  {
    id: "TXN-001229",
    student: "David Martinez",
    email: "david.m@example.com",
    course: "Digital Marketing Mastery",
    amount: 189.99,
    status: "completed",
    paymentMethod: "paypal",
    date: "2024-01-14 03:15 PM",
    transactionFee: 5.51,
  },
];

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<
    (typeof transactions)[0] | null
  >(null);
  const all_transactions = useSelector(
    (state: RootState) => state.payments.payments
  );
  const students = useSelector((state: RootState) => state.students.students);
  const all_courses = useSelector(
    (state: RootState) => state.all_courses.all_courses
  );
  const all_events = useSelector(
    (state: RootState) => state.all_events.all_events
  );

  const getSuccessRate = (transactions: IPayment[]): number => {
    if (!transactions || transactions.length <= 0) return 0;
    const success_payments_count = transactions.filter(
      (trans) => trans.status === "SUCCESS"
    ).length;
    return (success_payments_count / transactions.length) * 100;
  };

  const stats = [
    {
      title: "Total Revenue",
      value: `$${displayRazorpayAmount(
        all_transactions
          .filter((payment) => payment.status === "SUCCESS")
          .reduce((total, item) => total + item.amount, 0)
      )}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Transactions (Today)",
      value: `${all_transactions.length}`,
      change: "+8.2%",
      trend: "up",
      icon: ArrowUpRight,
    },
    {
      title: "Success Rate",
      value: `${getSuccessRate(all_transactions)}%`,
      change: "+2.1%",
      trend: "up",
      icon: CheckCircle2,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success text-success-foreground">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="border-warning text-warning">
            Pending
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  function formatTransactions({
    all_transactions,
    students,
    all_courses,
    all_events,
    displayRazorpayAmount,
  }: {
    all_transactions: IPayment[];
    students: User[];
    all_courses: ICourse[];
    all_events: IEvent[];
    displayRazorpayAmount: (value: number) => number;
  }) {
    return all_transactions.map((trans) => {
      const student = students.find((s) => s.id === trans?.userId);
      const purchase = trans?.purchases?.[0];

      const course = all_courses.find((c) => c.id === purchase?.courseId);
      const event = all_events.find((e) => e.id === purchase?.eventId);

      return {
        id: trans.id,
        txCode: `TX-${trans.id.slice(0, 6)}`,
        studentName: `${student?.fname ?? ""} ${student?.lname ?? ""}`.trim(),
        studentEmail: student?.email ?? "",
        studentPhone: student?.phoneNo ?? "",
        courseTitle: course?.title ?? "",
        eventTitle: event?.title ?? "",
        amount: displayRazorpayAmount(trans?.amount),
        status: trans?.status ?? "UNKNOWN",
        createdAt: format(new Date(trans?.createdAt), "MMM dd yyyy h:mm a"),
      };
    });
  }

  const filteredTransactions = formatTransactions({
    all_courses,
    all_transactions,
    all_events,
    students,
    displayRazorpayAmount,
  }).filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || txn.status === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    console.log({ all_transactions });
  }, [all_transactions]);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 space-y-6 pt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
            <p className="text-muted-foreground">
              Monitor and manage all payment transactions
            </p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-card-hover transition-shadow gap-2"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div
                  className={`flex items-center text-xs ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent className="w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by ID, student, email, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block w-full overflow-hidden">
              {filteredTransactions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Phone no.</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions
                      .slice()
                      .reverse()
                      .map((transaction, i) => {
                        const trans = all_transactions[i];
                        const student = students.find(
                          (sud) => sud.id === trans?.userId
                        );
                        const course = all_courses.find(
                          (cour) => cour.id === trans?.purchases[0]?.courseId
                        );
                        const trans_event = all_events.find(
                          (event) => trans?.purchases[0]?.eventId === event.id
                        );

                        const student_name = `${student?.fname ?? ""} ${
                          student?.lname ?? ""
                        }`;
                        const student_email = student?.email ?? "";

                        const pur_course = course?.title ?? "";
                        const pur_event = trans_event?.title ?? "";

                        return (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-mono text-sm">
                              <span className="bg-secondary p-1 rounded-xs">
                                TX-{transaction.id.slice(0, 6)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-foreground">
                                  {student_name.trim()}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {student_email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="">{student?.phoneNo}</span>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="truncate">{pur_course}</p>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="truncate">{pur_event}</p>
                            </TableCell>
                            <TableCell className="font-semibold">
                              ${displayRazorpayAmount(trans?.amount)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={cn(
                                  trans.status === "SUCCESS"
                                    ? "bg-green-600 text-white"
                                    : trans.status === "PENDING"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-red-400 text-white"
                                )}
                              >
                                {trans.status[0] +
                                  trans.status.slice(1).toLowerCase()}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {format(trans?.createdAt, "MMM dd yyyy h:mm a")}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              ) : (
                <div className="w-full min-h-[200px] flex flex-col items-center justify-center bg-gray-100 rounded-md p-6">
                  <p className="text-gray-700 text-lg mb-4">
                    No transactions yet
                  </p>
                </div>
              )}
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4">
              {all_transactions.map((transaction, i) => {
                const trans = all_transactions[i];
                const student = students.find(
                  (sud) => sud.id === trans?.userId
                );
                const course = all_courses.find(
                  (cour) => cour.id === trans?.purchases[0]?.courseId
                );
                const trans_event = all_events.find(
                  (event) => trans?.purchases[0]?.eventId === event.id
                );

                const student_name = `${student?.fname ?? ""} ${
                  student?.lname ?? ""
                }`;
                const student_email = student?.email ?? "";

                const pur_course = course?.title ?? "";
                const pur_event = trans_event?.title ?? "";
                return (
                  <Card
                    key={transaction.id}
                    className="hover:shadow-card-hover transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-mono text-sm text-muted-foreground">
                              TX-{transaction.id.slice(0, 6)}
                            </div>
                            <div className="font-semibold text-foreground mt-1">
                              {student_name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {student_email}
                            </div>
                          </div>
                          {getStatusIcon(transaction.status)}
                        </div>

                        <div className="border-t pt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Phone no:
                            </span>
                            <span className="font-medium text-right max-w-[60%] truncate">
                              {student?.phoneNo}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Course:
                            </span>
                            <span className="font-medium text-right max-w-[60%] truncate">
                              {pur_course}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Event:
                            </span>
                            <span className="font-medium text-right max-w-[60%] truncate">
                              {pur_event}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Amount:
                            </span>
                            <span className="font-semibold text-foreground">
                              ${displayRazorpayAmount(transaction.amount)}
                            </span>
                          </div>
                          {/* <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Payment:
                            </span>
                            <span className="capitalize">
                              {transaction.paymentMethod.replace("_", " ")}
                            </span>
                          </div> */}
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Date:</span>
                            <span>
                              {format(trans?.createdAt, "MMM dd yyyy h:mm a")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction Detail Modal */}
        <Dialog
          open={!!selectedTransaction}
          onOpenChange={() => setSelectedTransaction(null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Transaction Details
                {selectedTransaction &&
                  getStatusIcon(selectedTransaction.status)}
              </DialogTitle>
              <DialogDescription>
                Complete information about this transaction
              </DialogDescription>
            </DialogHeader>

            {selectedTransaction && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Transaction ID
                    </label>
                    <p className="font-mono text-sm mt-1">
                      {selectedTransaction.id}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Status
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(selectedTransaction.status)}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Student Information</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Name
                      </label>
                      <p className="text-sm mt-1">
                        {selectedTransaction.student}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Email
                      </label>
                      <p className="text-sm mt-1">
                        {selectedTransaction.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Course Details</h4>
                  <p className="text-sm">{selectedTransaction.course}</p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Payment Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Amount
                      </label>
                      <p className="text-lg font-bold text-foreground mt-1">
                        ${selectedTransaction.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Transaction Fee
                      </label>
                      <p className="text-lg font-semibold text-muted-foreground mt-1">
                        ${selectedTransaction.transactionFee.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Payment Method
                      </label>
                      <p className="text-sm mt-1 capitalize">
                        {selectedTransaction.paymentMethod.replace("_", " ")}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Date & Time
                      </label>
                      <p className="text-sm mt-1">{selectedTransaction.date}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                    <span className="font-semibold">Net Amount</span>
                    <span className="text-xl font-bold text-foreground">
                      $
                      {(
                        selectedTransaction.amount -
                        selectedTransaction.transactionFee
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
