"use client";

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
import { displayRazorpayAmount } from "@/lib/utils";

export function SectionCards() {
  const all_transactions = useSelector(
    (state: RootState) => state.payments.payments
  );
  const all_students = useSelector(
    (state: RootState) => state.students.students
  );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card className="@container/card w-full gap-2">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @md/card:text-2xl @lg/card:text-3xl">
            $
            {displayRazorpayAmount(
              all_transactions.filter((payment) => payment.status === "SUCCESS").reduce((total, item) => total + item.amount, 0)
            )}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-4" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card w-full gap-2">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @md/card:text-2xl @lg/card:text-3xl">
            {all_students.filter((student) => student.role === "STUDENT").length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown className="size-4" />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card w-full gap-2">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @md/card:text-2xl @lg/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-4" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card w-full gap-2">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @md/card:text-2xl @lg/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-4" />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
