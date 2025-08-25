import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Minus } from 'lucide-react';

const StripeFeeCalculator = () => {
  const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState('1.7');
  const [staticFee, setStaticFee] = useState('0.30');
  const [calculationType, setCalculationType] = useState('receive'); // 'receive' or 'charge'

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const calculateReceived = (chargedAmount, feePercent, staticAmount) => {
    const percentageFee = (chargedAmount * feePercent) / 100;
    const totalFees = percentageFee + staticAmount;
    return chargedAmount - totalFees;
  };

  const calculateChargeAmount = (desiredAmount, feePercent, staticAmount) => {
    // Formula: chargeAmount = (desiredAmount + staticFee) / (1 - feePercent/100)
    return (desiredAmount + staticAmount) / (1 - feePercent / 100);
  };

  const getResults = () => {
    const numAmount = parseFloat(amount) || 0;
    const numPercentage = parseFloat(percentage) || 0;
    const numStaticFee = parseFloat(staticFee) || 0;

    if (numAmount <= 0) return null;

    if (calculationType === 'receive') {
      const received = calculateReceived(numAmount, numPercentage, numStaticFee);
      const totalFees = numAmount - received;
      const percentageFee = (numAmount * numPercentage) / 100;

      return {
        originalAmount: numAmount,
        received,
        totalFees,
        percentageFee,
        staticFee: numStaticFee,
        effectiveRate: (totalFees / numAmount) * 100
      };
    } else {
      const chargeAmount = calculateChargeAmount(numAmount, numPercentage, numStaticFee);
      const percentageFee = (chargeAmount * numPercentage) / 100;
      const totalFees = percentageFee + numStaticFee;

      return {
        desiredAmount: numAmount,
        chargeAmount,
        totalFees,
        percentageFee,
        staticFee: numStaticFee,
        effectiveRate: (totalFees / chargeAmount) * 100
      };
    }
  };

  const results = getResults();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="text-blue-600 w-8 h-8" />
        <h1 className="text-3xl font-bold text-gray-900">Stripe Fee Calculator</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Calculation Type</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="calculationType"
                  value="receive"
                  checked={calculationType === 'receive'}
                  onChange={(e) => setCalculationType(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-gray-700">What will I receive?</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="calculationType"
                  value="charge"
                  checked={calculationType === 'charge'}
                  onChange={(e) => setCalculationType(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-gray-700">What should I charge?</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {calculationType === 'receive' ? 'Amount to Charge' : 'Amount to Receive'}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage Fee (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="2.9"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Static Fee ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={staticFee}
                  onChange={(e) => setStaticFee(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="0.30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Results</h2>

          {results ? (
            <div className="space-y-4">
              {calculationType === 'receive' ? (
                <>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Amount Charged</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(results.originalAmount)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Minus className="w-4 h-4" />
                    <span className="text-sm">Stripe Fees</span>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-green-600 mb-1">You Will Receive</div>
                    <div className="text-2xl font-bold text-green-700">
                      {formatCurrency(results.received)}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Desired Amount</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(results.desiredAmount)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-sm">You Should Charge</span>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-blue-600 mb-1">Amount to Charge</div>
                    <div className="text-2xl font-bold text-blue-700">
                      {formatCurrency(results.chargeAmount)}
                    </div>
                  </div>
                </>
              )}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Fee Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Percentage fee ({percentage}%)</span>
                    <span className="text-gray-900">{formatCurrency(results.percentageFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Static fee</span>
                    <span className="text-gray-900">{formatCurrency(results.staticFee)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-medium">
                    <span className="text-gray-700">Total fees</span>
                    <span className="text-red-600">{formatCurrency(results.totalFees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective rate</span>
                    <span className="text-gray-900">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Enter an amount to see the calculation</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500 text-center">
        Default values are set to Stripe's standard rates for Australian domestic cards (1.7% + $0.30).
        Actual rates may vary based on your account and region.
      </div>
      <div className="mt-6 text-xs text-gray-500 text-center">
        Clone/Star/Fork repo: https://github.com/defmans7/fee-calculator
      </div>

    </div>
  );
};

export default StripeFeeCalculator;