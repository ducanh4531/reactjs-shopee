const purchasesListStatus = {
  bag: -1,
  all: 0,
  processing: 1,
  preparingToShip: 2,
  shipped: 3,
  delivered: 4,
  cancelled: 5
} as const

export default purchasesListStatus
