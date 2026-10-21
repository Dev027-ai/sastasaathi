(function (root) {
  'use strict';
  function calculateSavings(brandPrice, janPrice, medicine) {
    const brand = Number(brandPrice);
    const jan = Number(janPrice);
    if (brandPrice === '' || brandPrice === null || brandPrice === undefined) return {status:'empty'};
    if (!Number.isFinite(brand) || brand <= 0) return {status:'invalid'};
    if (!medicine || !medicine.strength || !medicine.pack) return {status:'incomplete'};
    if (!Number.isFinite(jan) || jan <= 0) return {status:'no-price'};
    const difference = Math.round((brand - jan) * 100) / 100;
    if (Math.abs(difference) < 0.005) return {status:'equal', difference:0, percent:0};
    return difference > 0
      ? {status:'saving', difference, percent:Math.round((difference / brand) * 10000) / 100}
      : {status:'higher', difference:Math.abs(difference), percent:Math.round((Math.abs(difference) / brand) * 10000) / 100};
  }
  const api = {calculateSavings};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.SastaPricing = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
