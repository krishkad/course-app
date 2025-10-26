"use client";

import { useState, useMemo } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { displayRazorpayAmount, getUserGrowthRate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SectionCards() {
  const all_transactions = useSelector(
    (state: RootState) => state.payments.payments
  );
  const all_students = useSelector(
    (state: RootState) => state.students.students
  );

  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // 📅 Helper: Get start date for a given period
  const getPeriodRange = (period: string) => {
    const now = new Date();
    let start = new Date();
    switch (period) {
      case "week":
        start.setDate(now.getDate() - 7);
        break;
      case "month":
        start.setMonth(now.getMonth() - 1);
        break;
      case "6month":
        start.setMonth(now.getMonth() - 6);
        break;
      case "year":
        start.setFullYear(now.getFullYear() - 1);
        break;
      default:
        start.setMonth(now.getMonth() - 1);
    }
    return { start, end: now };
  };

  // 🧠 Filter data by date range
  const filterByDateRange = (data: any[], dateKey: string, start: Date, end: Date) =>
    data.filter((item) => {
      const d = new Date(item[dateKey]);
      return d >= start && d <= end;
    });

  // 🧮 Compute filtered and previous-period data
  const { currentData: currentTransactions, prevData: prevTransactions } = useMemo(() => {
    const { start, end } = getPeriodRange(selectedPeriod);

    // previous period range
    const duration = end.getTime() - start.getTime();
    const prevEnd = new Date(start);
    const prevStart = new Date(start.getTime() - duration);

    return {
      currentData: filterByDateRange(all_transactions, "createdAt", start, end),
      prevData: filterByDateRange(all_transactions, "createdAt", prevStart, prevEnd),
    };
  }, [all_transactions, selectedPeriod]);

  const { currentData: currentStudents, prevData: prevStudents } = useMemo(() => {
    const { start, end } = getPeriodRange(selectedPeriod);
    const duration = end.getTime() - start.getTime();
    const prevEnd = new Date(start);
    const prevStart = new Date(start.getTime() - duration);

    return {
      currentData: filterByDateRange(all_students, "createdAt", start, end),
      prevData: filterByDateRange(all_students, "createdAt", prevStart, prevEnd),
    };
  }, [all_students, selectedPeriod]);

  // 💰 Metrics
  const currentRevenue = currentTransactions
    .filter((p) => p.status === "SUCCESS")
    .reduce((sum, t) => sum + t.amount, 0);

  const prevRevenue = prevTransactions
    .filter((p) => p.status === "SUCCESS")
    .reduce((sum, t) => sum + t.amount, 0);

  const revenueChange =
    prevRevenue === 0 ? 0 : ((currentRevenue - prevRevenue) / prevRevenue) * 100;

  const currentStudentsCount = currentStudents.filter(
    (s) => s.role === "STUDENT"
  ).length;

  const prevStudentsCount = prevStudents.filter(
    (s) => s.role === "STUDENT"
  ).length;

  const studentChange =
    prevStudentsCount === 0
      ? 0
      : ((currentStudentsCount - prevStudentsCount) / prevStudentsCount) * 100;

  const growthRate = getUserGrowthRate(currentStudents);

  // Helper to display up/down icon and percentage
  const TrendBadge = ({ value }: { value: number }) => {
    const positive = value >= 0;
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        {positive ? (
          <IconTrendingUp className="size-4 text-green-600" />
        ) : (
          <IconTrendingDown className="size-4 text-red-600" />
        )}
        {value === 0 ? "0%" : `${positive ? "+" : ""}${value.toFixed(1)}%`}
      </Badge>
    );
  };

  return (
    <>
      <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 justify-between items-center pt-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>

        <Select defaultValue="month" onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-full sm:w-44 bg-white">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="6month">Last 6 Months</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {/* 💰 Total Revenue */}
        <Card className="@container/card w-full gap-2">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              ${displayRazorpayAmount(currentRevenue)}
            </CardTitle>
            <CardAction>
              <TrendBadge value={revenueChange} />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm gap-1.5">
            <div className="flex gap-2 font-medium">
              {revenueChange >= 0 ? "Up" : "Down"}{" "}
              {Math.abs(revenueChange).toFixed(1)}% vs last period
              {revenueChange >= 0 ? (
                <IconTrendingUp className="size-4 text-green-600" />
              ) : (
                <IconTrendingDown className="size-4 text-red-600" />
              )}
            </div>
            <div className="text-muted-foreground">Compared to previous period</div>
          </CardFooter>
        </Card>

        {/* 👥 New Customers */}
        <Card className="@container/card w-full gap-2">
          <CardHeader>
            <CardDescription>New Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {currentStudentsCount}
            </CardTitle>
            <CardAction>
              <TrendBadge value={studentChange} />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm gap-1.5">
            <div className="flex gap-2 font-medium">
              {studentChange >= 0 ? "Up" : "Down"}{" "}
              {Math.abs(studentChange).toFixed(1)}% vs last period
              {studentChange >= 0 ? (
                <IconTrendingUp className="size-4 text-green-600" />
              ) : (
                <IconTrendingDown className="size-4 text-red-600" />
              )}
            </div>
            <div className="text-muted-foreground">
              Acquisition trend for selected period
            </div>
          </CardFooter>
        </Card>

        {/* 🧍 Active Accounts (Static Example) */}
        {/* <Card className="@container/card w-full gap-2">
          <CardHeader>
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className="text-2xl font-semibold">45,678</CardTitle>
            <CardAction>
              <TrendBadge value={12.5} />
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm flex-col items-start gap-1.5">
            <div className="flex gap-2 font-medium">
              Strong user retention <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Engagement exceeds targets</div>
          </CardFooter>
        </Card> */}

        {/* 📈 Growth Rate */}
        <Card className="@container/card w-full gap-2">
          <CardHeader>
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {growthRate}%
            </CardTitle>
            <CardAction>
              <TrendBadge value={growthRate / 2} />
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm flex-col items-start gap-1.5">
            <div className="flex gap-2 font-medium">
              Steady performance increase <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Meets growth projections</div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
