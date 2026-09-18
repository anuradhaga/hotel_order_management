/**
 * Statutory Hospitality Tax & Surcharge Calculation Engine
 * Compliant with Sri Lanka Hospitality Standard (SRS Section 8.1)
 *
 * Formula:
 * 1. Item Subtotal = Sum of (Quantity * Unit Price)
 * 2. Net Food/Beverage = Item Subtotal - Applicable Discounts
 * 3. Service Charge (10%) = Net Food/Beverage * 0.10
 * 4. VAT Base = Net Food/Beverage + Service Charge
 * 5. Value Added Tax (15%) = VAT Base * 0.15
 * 6. Final Gross Amount Payable = Net Food/Beverage + Service Charge + VAT
 */

export interface TaxCalculationInput {
  subtotal: number;
  discountAmount?: number;
  serviceChargeRate?: number; // default 10.00
  vatRate?: number; // default 15.00
}

export interface TaxCalculationResult {
  subtotal: number;
  discountAmount: number;
  netFoodBeverage: number;
  serviceChargeRate: number;
  serviceChargeAmount: number;
  vatBase: number;
  vatRate: number;
  vatAmount: number;
  netPayable: number;
}

export function calculateHospitalityTaxes({
  subtotal,
  discountAmount = 0,
  serviceChargeRate = 10.0,
  vatRate = 15.0,
}: TaxCalculationInput): TaxCalculationResult {
  const safeSubtotal = Math.max(0, Number(subtotal) || 0);
  const safeDiscount = Math.min(safeSubtotal, Math.max(0, Number(discountAmount) || 0));

  // Step 2: Net Food/Beverage
  const netFoodBeverage = safeSubtotal - safeDiscount;

  // Step 3: Service Charge (10%)
  const scMultiplier = serviceChargeRate / 100;
  const serviceChargeAmount = roundCurrency(netFoodBeverage * scMultiplier);

  // Step 4: VAT Base = Net Food/Beverage + Service Charge
  const vatBase = netFoodBeverage + serviceChargeAmount;

  // Step 5: Value Added Tax (15%)
  const vatMultiplier = vatRate / 100;
  const vatAmount = roundCurrency(vatBase * vatMultiplier);

  // Step 6: Final Gross Amount Payable
  const netPayable = roundCurrency(netFoodBeverage + serviceChargeAmount + vatAmount);

  return {
    subtotal: roundCurrency(safeSubtotal),
    discountAmount: roundCurrency(safeDiscount),
    netFoodBeverage: roundCurrency(netFoodBeverage),
    serviceChargeRate,
    serviceChargeAmount,
    vatBase: roundCurrency(vatBase),
    vatRate,
    vatAmount,
    netPayable,
  };
}

export function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}
