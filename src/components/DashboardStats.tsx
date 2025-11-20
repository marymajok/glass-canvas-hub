import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard = ({ title, value, description, trend }: StatCardProps) => (
  <Card className="glass-card">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      {trend && (
        <div className={`flex items-center gap-1 text-xs mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span>{Math.abs(trend.value)}% from last month</span>
        </div>
      )}
    </CardContent>
  </Card>
);

interface BookingChartProps {
  data: Array<{ name: string; bookings: number; revenue?: number }>;
}

export const BookingTrendChart = ({ data }: BookingChartProps) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>Booking Trends</CardTitle>
      <CardDescription>Monthly booking statistics</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

interface RevenueChartProps {
  data: Array<{ name: string; revenue: number }>;
}

export const RevenueChart = ({ data }: RevenueChartProps) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>Revenue Overview</CardTitle>
      <CardDescription>Monthly revenue in KES</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

interface StatusDistributionProps {
  data: Array<{ name: string; value: number; color: string }>;
}

export const StatusDistributionChart = ({ data }: StatusDistributionProps) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>Booking Status Distribution</CardTitle>
      <CardDescription>Current booking statuses</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${entry.name}: ${entry.value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
