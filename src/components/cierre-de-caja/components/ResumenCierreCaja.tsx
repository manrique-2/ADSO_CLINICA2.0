"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

type Props = {
  total_ingresos: number;
  total_egresos: number;
  balance: number;
};

export function ResumenCierreCaja({
  total_ingresos,
  total_egresos,
  balance,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      {/* Card Ingresos */}
      <Card className="shadow-md border-l-8 bg-[#337ab7] border-l-blue-500 hover:shadow-lg transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-">
          <CardTitle className="text-lg font-semibold text-blu-700 text-white flex items-center gap-2">
            <ArrowDownCircle className="h-5 w-5 text-blu-600 text-white" />
            Ingresos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-blu-700 text-white">
            S/ {total_ingresos?.toFixed(2) ?? 0}
          </p>
          <p className="text-sm text-gra-500 text-gray-200 mt-1">
            Total de ingresos registrados
          </p>
        </CardContent>
      </Card>

      {/* Card Egresos */}
      <Card className="shadow-md border-l-8 bg-red-500 border-l-red-500 hover:shadow-lg transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-">
          <CardTitle className="text-lg font-semibold text-re-700 text-white flex items-center gap-2">
            <ArrowUpCircle className="h-5 w-5 text-re-600 text-white" />
            Egresos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-re-700 text-white">
            S/ {total_egresos?.toFixed(2) ?? 0}
          </p>
          <p className="text-sm text-gra-500 text-gray-200 mt-1">
            Total de egresos registrados
          </p>
        </CardContent>
      </Card>

      {/* Card Balance */}
      <Card className="shadow-md border-l-8 bg-green-500 border-l-green-500 hover:shadow-lg transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-">
          <CardTitle className="text-lg font-semibold text-gree-700 text-white flex items-center gap-2">
            <Wallet className="h-5 w-5 text-gree-600 text-white" />
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={`text-4xl font-bold ${
              balance >= 0 ? "text-gree-700 text-white" : "text-gray-700"
            }`}
          >
            S/ {balance?.toFixed(2) ?? 0}
          </p>
          <p className="text-sm text-gra-500 text-gray-100 mt-1">
            Resultado neto del cierre de caja
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
